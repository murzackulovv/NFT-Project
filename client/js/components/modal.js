export const Modal = () => {
  const modalContainer = document.createElement('div');
  const modalWrapper = document.createElement('div');
  const modalTitle = document.createElement('h3');
  const modalForm = document.createElement('form');

  const labelNameUser = document.createElement('label');
  const labelUserIcon = document.createElement('label');
  const labelNFTName = document.createElement('label');
  const labelNftUrl = document.createElement('label');
  const labelPrice = document.createElement('label');
  
  const inputName = document.createElement('input');
  const inputUserIcon = document.createElement('input');
  const inputNftName = document.createElement('input');
  const inputNFTUrl = document.createElement('input');
  const inputPrice = document.createElement('input');

  const modalBtn = document.createElement('button');

  modalContainer.classList.add('modal-container');
  modalWrapper.classList.add('modal-wrapper');
  modalTitle.classList.add('modal__title');
  modalForm.classList.add('modal-form');
  modalBtn.classList.add('modal__btn');

  labelNameUser.setAttribute('for', 'inputName');
  labelUserIcon.setAttribute('for', 'inputUserIcon');
  labelNFTName.setAttribute('for', 'inputNftName');
  labelNftUrl.setAttribute('for', 'inputNFTUrl');
  labelPrice.setAttribute('for', 'inputPrice');
  
  modalTitle.textContent = 'Add Card';
  labelNameUser.textContent = 'Enter user name:';
  labelUserIcon.textContent = 'Enter user Icon:';
  labelNFTName.textContent = 'Enter NFT name:';
  labelNftUrl.textContent = 'Enter NFT Img URL:';
  labelPrice.textContent = 'Enter price:';

  inputName.placeholder = 'Enter name'; 
  inputUserIcon.placeholder = 'Enter image URL';
  inputNftName.placeholder = 'Enter NFT name';
  inputNFTUrl.placeholder = 'Enter NFT Img URL';
  inputPrice.placeholder = 'Enter price';

  inputName.id = 'labelNameUser'
  inputUserIcon.id = 'labelUserIcon'
  inputNftName.id = 'labelNFTName'
  inputNFTUrl.id = 'labelNftUrl'
  inputPrice.id = 'labelPrice'

  modalBtn.textContent = 'Add Card';

  modalContainer.append(modalWrapper);
  modalWrapper.append(modalTitle, modalForm);
  
  modalForm.append(
    labelNameUser,
    inputName,
    labelUserIcon,
    inputUserIcon,
    labelNFTName,
    inputNftName,
    labelNftUrl,
    inputNFTUrl,
    labelPrice,
    inputPrice,
    modalBtn
  );

  return {
    modalContainer,
    modalTitle,
    modalBtn, 
    modalForm
  }
};