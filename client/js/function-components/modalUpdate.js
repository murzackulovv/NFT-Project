import { EditHouse, PostHouse } from "../api/nftApi.js";
import { Modal } from "../components/modal.js";

export const modalUpdate = (house) => {
  const { modalTitle, modalBtn, modalContainer, modalForm } = Modal();

  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const product = {}
    product.userName = modalForm.labelNameUser.value
    product.UserIcon = modalForm.labelUserIcon.value
    product.NFTName = modalForm.labelNFTName.value
    product.NftUrl = modalForm.labelNftUrl.value
    product.Price = modalForm.labelPrice.value
    
    await PostHouse(product)
    EditHouse(product, house.id)
  })

  modalForm.labelNameUser.value = house.userName;
  modalForm.labelUserIcon.value = house.UserIcon;
  modalForm.labelNFTName.value = house.NFTName;
  modalForm.labelNftUrl.value = house.NftUrl;
  modalForm.labelPrice.value = house.Price;

  document.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      modalContainer.remove();
    }
  });
    
  document.body.append(modalContainer);
};
