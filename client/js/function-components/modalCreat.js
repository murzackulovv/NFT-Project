import { PostHouse } from "../api/nftApi.js";
import { Modal } from "../components/modal.js";

export const ModalCreate = () => {
const { modalTitle, modalBtn, modalContainer, modalForm } = Modal();

const product = {};
modalForm.addEventListener('submit',(e) => {
e.preventDefault();
  
product.userName = modalForm.labelNameUser.value;
product.UserIcon = modalForm.labelUserIcon.value;
product.NFTName = modalForm.labelNFTName.value;
product.NftUrl = modalForm.labelNftUrl.value;
product.Price = modalForm.labelPrice.value;

PostHouse(product); 

});

modalTitle.textContent = 'Add Card';
modalBtn.textContent = 'Add';

document.addEventListener('click', (e) => {
if (e.target === modalContainer) {
modalContainer.remove();
}
});

document.body.append(modalContainer);
};
