export const TryOur = () => {
  const ourContainer = document.createElement('div')
  ourContainer.className = 'our-container'

  const ourLeftBox = document.createElement('div')
  ourLeftBox.className = 'our-left-box'

  const ourLeftBoxTitle = document.createElement('p')
  ourLeftBoxTitle.className = 'our-left-box-title'

  const ourLeftBoxBtn = document.createElement('button')
  ourLeftBoxBtn.className = 'our-left-box-btn'

  const icon = document.createElement('span')
  icon.className = 'icon'

  const ourRightBox = document.createElement('div')
  ourRightBox.className = 'our-right-box'

  const ourRightBoxImg = document.createElement('img')
  ourRightBoxImg.className = 'our-right-box-img'

  ourLeftBoxTitle.textContent = 'Try our App Mobile NFT'
  ourLeftBoxBtn.innerHTML = 'Download Now '
  icon.innerHTML = ' <i class="bi bi-file-arrow-down"></i>'
  ourRightBoxImg.src = '/client/images/Group 151.png'

  ourLeftBox.appendChild(ourLeftBoxTitle)
  ourLeftBoxBtn.appendChild(icon)
  ourLeftBox.appendChild(ourLeftBoxBtn)
  ourRightBox.appendChild(ourRightBoxImg)
  ourContainer.appendChild(ourLeftBox)
  ourContainer.appendChild(ourRightBox)

  return ourContainer
}
