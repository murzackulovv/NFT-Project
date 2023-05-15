import { DeleteHouse } from '../api/nftApi.js';
import { FormatDate } from '../function-components/formatDate.js';
import { modalUpdate } from '../function-components/modalUpdate.js';
import { NftCoin, penSvg } from './svg.js';

export const NftItem = (house) => {
  const nftItemContainer = document.createElement('div');
  const nftItemBox = document.createElement('div')
  const nftItemBoxWrapper = document.createElement('div');
  const settingsWrapper = document.createElement('div')
  const btnDelete = document.createElement('button')
  const nftHeader = document.createElement('div');
  const nftTitle = document.createElement('p');
  const nftNavbar = document.createElement('div');
  const NavbarBtnNft = document.createElement('button');
  const NavbarBtnCollections = document.createElement('button');
  const NavbarBtnSeries = document.createElement('button');
  const productEdit = document.createElement('div');
  const productEditImg = document.createElement('img');
  const nftItemImg = document.createElement('img');
  const nftItemTitle = document.createElement('h3');
  const nftItemFooter = document.createElement('div');
  const nftItemLeftBox = document.createElement('div');
  const nftItemLeftBoxUser = document.createElement('div');
  const nftItemLeftBoxImg = document.createElement('img');
  const nftItemLeftBoxImgMark = document.createElement('div');
  const nftItemLeftBoxText = document.createElement('p');
  const nftItemRightBox = document.createElement('div');
  const nftItemRightBoxText = document.createElement('p');
  const nftItemRightBoxNum = document.createElement('p');
  const nftItemRightBoxSpan = document.createElement('span');

  const createdTime = document.createElement('span')
  createdTime.classList.add('create-time')
  createdTime.textContent = FormatDate(house.createdAt)

  productEdit.addEventListener('click', () => {
    modalUpdate(house)
  })

  btnDelete.addEventListener('click', () => {
    DeleteHouse(house.id); 
  });
  //TODO: нужно добавить этот код, чтобы подтвердить действие
  // let response = confirm('Вы уверенны ?')
  //   if (response) DeleteData(house.id)

  settingsWrapper.classList.add('settings')
  btnDelete.classList.add('btn-delete')
  nftItemContainer.classList.add('nftItem-container');
  nftItemBox.classList.add('nftItem-box__wrapper')
  nftItemBoxWrapper.classList.add('nftItem-wrapper');
  nftTitle.classList.add('nft-title');
  nftNavbar.classList.add('nft-navbar');
  nftHeader.classList.add('nft-header');
  NavbarBtnNft.classList.add('navbar-btn__nft');
  NavbarBtnCollections.classList.add('navbar-btn__collections');
  NavbarBtnSeries.classList.add('navbar-btn__series');
  nftItemImg.classList.add('nftItem__img');
  nftItemTitle.classList.add('nftItem__title');
  nftItemFooter.classList.add('nftItem-footer');
  nftItemLeftBox.classList.add('nftItem-leftbox');
  nftItemLeftBoxUser.classList.add('nftItem-leftbox-user');
  nftItemLeftBoxImg.classList.add('nftItem-leftbox-user__img');
  nftItemLeftBoxImgMark.classList.add('check_mark');
  nftItemLeftBoxText.classList.add('nftItem-leftbox__text');
  nftItemRightBox.classList.add('nftItem-rightbox');
  nftItemRightBoxText.classList.add('nftItem-rightbox__text');
  nftItemRightBoxNum.classList.add('nftItem-rightbox__num');
  nftItemRightBoxSpan.classList.add('nftItem-rightbox__span');
  productEdit.classList.add('product-edit');
  productEditImg.classList.add('edit-img');

  nftTitle.textContent = '# Explore';
  NavbarBtnNft.textContent = `NFT's`;
  NavbarBtnCollections.textContent = 'Collections';
  NavbarBtnSeries.textContent = 'Series';
  nftItemTitle.textContent = house.NFTName;
  nftItemLeftBoxImgMark.textContent = '✔';
  nftItemLeftBoxText.textContent = `#${house.userName}`;
  nftItemRightBoxText.textContent = 'Current Bid';
  nftItemRightBoxNum.innerHTML = NftCoin;
  nftItemRightBoxSpan.textContent = `${house.Price}$`;
  nftItemImg.src = house.NftUrl
  nftItemLeftBoxImg.src = house.UserIcon
  productEdit.innerHTML = penSvg
  btnDelete.textContent = 'Delete'


  nftHeader.appendChild(nftTitle);
  nftHeader.appendChild(nftNavbar);
  nftNavbar.appendChild(NavbarBtnNft)
  nftNavbar.appendChild(NavbarBtnCollections)
  nftNavbar.appendChild(NavbarBtnSeries)
  nftItemBox.appendChild(nftItemBoxWrapper)
  nftItemContainer.appendChild(nftHeader)
  nftItemContainer.appendChild(nftItemBox)
  productEdit.appendChild(productEditImg)
  nftItemBoxWrapper.appendChild(productEdit);
  nftItemBoxWrapper.appendChild(nftItemImg);
  nftItemBoxWrapper.appendChild(nftItemTitle);
  nftItemBoxWrapper.appendChild(nftItemFooter);
  settingsWrapper.appendChild(btnDelete)
  settingsWrapper.appendChild(createdTime)
  nftItemBoxWrapper.appendChild(settingsWrapper);
  nftItemFooter.appendChild(nftItemLeftBox);
  nftItemFooter.appendChild(nftItemRightBox);
  nftItemLeftBox.appendChild(nftItemLeftBoxImg);
  nftItemLeftBoxUser.appendChild(nftItemLeftBoxImg);
  nftItemLeftBoxUser.appendChild(nftItemLeftBoxImgMark);
  nftItemLeftBox.appendChild(nftItemLeftBoxUser);
  nftItemLeftBox.appendChild(nftItemLeftBoxText)
  nftItemRightBox.appendChild(nftItemRightBoxText)
  nftItemRightBox.appendChild(nftItemRightBoxNum)
  nftItemRightBoxNum.appendChild(nftItemRightBoxSpan)

  return nftItemContainer
}