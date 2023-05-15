/* eslint-disable no-console */
// импорт стандартных библиотек Node.js
const { existsSync, readFileSync, writeFileSync } = require('fs');
const { createServer } = require('http');

// файл для базы данных
const DB_FILE = process.env.DB_FILE || './db.json';
// номер порта, на котором будет запущен сервер
const PORT = process.env.PORT || 3000;
// префикс URI для всех методов приложения
const URI_PREFIX = '/nft/house';

/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
class nftError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Асинхронно считывает тело запроса и разбирает его как JSON
 * @param {Object} req - Объект HTTP запроса
 * @throws {nftError} Некорректные данные в аргументе
 * @returns {Object} Объект, созданный из тела запроса
 */
function drainJson(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(JSON.parse(data));
    });
  });
}

/**
 * Проверяет входные данные и создаёт из них корректный объект дома
 * @param {Object} data - Объект с входными данными
 * @throws {nftError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ userName: string, UserIcon: string, NFTName: string, NftUrl: string, Price: string }} Объект дома
 */
function makehouseFromData(data) {
  const errors = [];

  function asString(v) {
    return v && String(v).trim() || '';
  }

  // составляем объект, где есть только необходимые поля
  const house = {
    userName: asString(data.userName),
    UserIcon: asString(data.UserIcon),
    NFTName: asString(data.NFTName),
    NftUrl: asString(data.NftUrl),
    Price: asString(data.Price),
  };

  // проверяем, все ли данные корректные и заполняем объект ошибок, которые нужно отдать дому
  if (!house.userName) errors.push({ field: 'userName', message: 'Не указано имя' });
  if (!house.UserIcon) errors.push({ field: 'UserIcon', message: 'Не указан airbnb url' });
  if (!house.NFTName) errors.push({ field: 'NFTName', message: 'Не указан img url' });
  if (!house.NftUrl) errors.push({ field: 'NftUrl', message: 'Не указан NftUrl' });
  if (!house.Price) errors.push({ field: 'Price', message: 'Не указан Price' });

  // если есть ошибки, то бросаем объект ошибки с их списком и 422 статусом
  if (errors.length) throw new nftError(422, { errors });

  return house;
}

/**
 * Возвращает список домов из базы данных
 * @param {{ search: string }} [params] - Поисковая строка
 * @returns {{ userName: string, UserIcon: string, NFTName: string, NftUrl: string, Price: string }}
 */
function gethouseList(params = {}) {
  const house = JSON.parse(readFileSync(DB_FILE) || '[]');
  if (params.search) {
    const search = params.search.trim().toLowerCase();
    return house.filter(house => [
        house.userName,
      ]
      .some(str => str.toLowerCase().includes(search))
    );
  }
  return house;
}

/**
 * Создаёт и сохраняет дома в базу данных
 * @throws {nftError} Некорректные данные в аргументе, дом не создан (statusCode 422)
 * @param {Object} data - Данные из тела запроса
 * @returns {{ id: string, userName: string, UserIcon: string, NFTName: string, NftUrl: string, Price: string, createdAt: string, updatedAt: string }} Объект дома
 */
function createhouse(data) {
  const newItem = makehouseFromData(data);
  newItem.id = Date.now().toString();
  newItem.createdAt = newItem.updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify([...gethouseList(), newItem]), { encoding: 'utf8' });
  return newItem;
}

/**
 * Возвращает объект дома по его ID
 * @param {string} itemId - ID дома
 * @throws {nftError} дом с таким ID не найден (statusCode 404)
 * @returns {{ id: string, userName: string, UserIcon: string, NFTName: string, NftUrl: string, Price: string, createdAt: string, updatedAt: string }} Объект дома
 */
function gethouse(itemId) {
  const house = gethouseList().find(({ id }) => id === itemId);
  if (!house) throw new nftError(404, { message: 'house Not Found' });
  return house;
}

/**
 * Изменяет дома с указанным ID и сохраняет изменения в базу данных
 * @param {string} itemId - ID изменяемого дома
 * @param {{ userName?: string, suruserName?: string, lastuserName?: string, contacts?: object[] }} data - Объект с изменяемыми данными
 * @throws {nftError} дом с таким ID не найден (statusCode 404)
 * @throws {nftError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ id: string, userName: string, UserIcon: string, NFTName: string, NftUrl: string, Price: string, createdAt: string, updatedAt: string }} Объект дома
 */
function updatehouse(itemId, data) {
  const house = gethouseList();
  const itemIndex = house.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new nftError(404, { message: 'house Not Found' });
  Object.assign(house[itemIndex], makehouseFromData({ ...house[itemIndex], ...data }));
  house[itemIndex].updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify(house), { encoding: 'utf8' });
  return house[itemIndex];
}

/**
 * Удаляет дома из базы данных
 * @param {string} itemId - ID дома
 * @returns {{}}
 */
function deletehouse(itemId) {
  const house = gethouseList();
  const itemIndex = house.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new nftError(404, { message: 'house Not Found' });
  house.splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(house), { encoding: 'utf8' });
  return {};
}

// создаём новый файл с базой данных, если он не существует
if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, '[]', { encoding: 'utf8' });

// создаём HTTP сервер, переданная функция будет реагировать на все запросы к нему
module.exports = createServer(async (req, res) => {
  // req - объект с информацией о запросе, res - объект для управления отправляемым ответом

  // этот заголовок ответа указывает, что тело ответа будет в JSON формате
  res.setHeader('Content-Type', 'application/json');

  // CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // запрос с методом OPTIONS может отправлять браузер автоматически для проверки CORS заголовков
  // в этом случае достаточно ответить с пустым телом и этими заголовками
  if (req.method === 'OPTIONS') {
    // end = закончить формировать ответ и отправить его дому
    res.end();
    return;
  }

  // если URI не начинается с нужного префикса - можем сразу отдать 404
  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  // убираем из запроса префикс URI, разбиваем его на путь и параметры
  const [uri, query] = req.url.substr(URI_PREFIX.length).split('?');
  const queryParams = {};

  // параметры могут отсутствовать вообще или иметь вид a=b&b=c
  // во втором случае наполняем объект queryParams { a: 'b', b: 'c' }
  if (query) {
    for (const piece of query.split('&')) {
      const [key, value] = piece.split('=');
      queryParams[key] = value ? decodeURIComponent(value) : '';
    }
  }

  try {
    // обрабатываем запрос и формируем тело ответа
    const body = await (async () => {
      if (uri === '' || uri === '/') {
        // /nft/house
        if (req.method === 'GET') return gethouseList(queryParams);
        if (req.method === 'POST') {
          const createdItem = createhouse(await drainJson(req));
          res.statusCode = 201;
          res.setHeader('Access-Control-Expose-Headers', 'Location');
          res.setHeader('Location', `${URI_PREFIX}/${createdItem.id}`);
          return createdItem;
        }
      } else {
        // /nft/house/{id}
        // параметр {id} из URI запроса
        const itemId = uri.substr(1);
        if (req.method === 'GET') return gethouse(itemId);
        if (req.method === 'PATCH') return updatehouse(itemId, await drainJson(req));
        if (req.method === 'DELETE') return deletehouse(itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    // обрабатываем сгенерированную нами же ошибку
    if (err instanceof nftError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      // если что-то пошло не так - пишем об этом в консоль и возвращаем 500 ошибку сервера
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Server Error' }));
      console.error(err);
    }
  }
})
  // инструкция, дока как юзать nft...
  .on('listening', () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
      console.log('Нажмите CTRL+C, чтобы остановить сервер');
      console.log('Доступные методы:');
      console.log(`GET ${URI_PREFIX} - получить список домов, в query параметр search можно передать поисковый запрос`);
      console.log(`POST ${URI_PREFIX} - создать дом, в теле запроса нужно передать объект { userName: string, UserIcon: string, NFTName: string, NftUrl: string, Price: string }`);
      console.log(`GET ${URI_PREFIX}/{id} - получить дом по его ID`);
      console.log(`PATCH ${URI_PREFIX}/{id} - изменить дом с ID, в теле запроса нужно передать объект { userName: string, UserIcon: string, NFTName: string, NftUrl: string, Price: string }`);
      console.log(`\tcontacts - массив объектов домов вида { type: string, value: string }`);
      console.log(`DELETE ${URI_PREFIX}/{id} - удалить дом по ID`);
    }
  })
  // ...и вызываем запуск сервера на указанном порту
  .listen(PORT);

