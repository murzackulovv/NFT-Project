const URL = 'http://localhost:3000/nft/house';

export const GetAllHouse = async () => {
  const response = await fetch(URL, {
    method: 'GET'
  });
  const result = await response.json();
  return result;
};

export const PostHouse = async (data) => {
  const response = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result);
  return result;
};

export const EditHouse = async (house, id) => {
  await fetch(`${URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(house)
  });
};

export const DeleteHouse = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log('Deletion successful');
    } else {
      console.log('Deletion failed');
    }
  } catch (error) {
    console.log(error);
  }
};
