import { ModalCreate } from "../function-components/modalCreat.js"

export const Discover = () => {
  const discoverNFTContainer = document.createElement('div')
  const discoverNFTSection = document.createElement('section')
  const discoverNFTTitle = document.createElement('h1')
  const discoverNFTForm = document.createElement('form')
  const discoverNFTLabel = document.createElement('label')
  const discoverNFTInput = document.createElement('input')
  const postNFTcard = document.createElement('div')

  postNFTcard.addEventListener('click' , ModalCreate)

  discoverNFTInput.addEventListener('focus', () => {
    discoverNFTForm.style.boxShadow = '0 0 50px var(--color-green-shadow)'
  })
  discoverNFTInput.addEventListener('blur', () => {
    discoverNFTForm.style.boxShadow = ''
  })

  discoverNFTTitle.textContent = 'Discover Amazing NFTs'
  discoverNFTLabel.innerHTML = '<i class="bi bi-search"></i>'
  discoverNFTInput.type = 'text'
  discoverNFTInput.placeholder = 'Search...'
  postNFTcard.innerHTML = '<i class="bi bi-file-plus"></i>'

  discoverNFTLabel.addEventListener('click', () => {
    discoverNFTInput.value = ''
  })

  discoverNFTContainer.classList.add('discoverNFT-container')
  discoverNFTSection.classList.add('discoverNFT-section')
  discoverNFTTitle.classList.add('discoverNFT__title')
  discoverNFTForm.classList.add('discoverNFT-form')
  discoverNFTLabel.classList.add('discoverNFT__label')
  discoverNFTInput.classList.add('discoverNFT__input')
  postNFTcard.classList.add('postNFT__card')

  discoverNFTSection.appendChild(discoverNFTTitle)
  discoverNFTForm.appendChild(discoverNFTLabel)
  discoverNFTForm.appendChild(discoverNFTInput)
  discoverNFTSection.appendChild(discoverNFTForm)
  discoverNFTSection.appendChild(postNFTcard)
  discoverNFTContainer.appendChild(discoverNFTSection)

  return discoverNFTContainer
}