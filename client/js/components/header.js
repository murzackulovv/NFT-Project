export const Header = () => {
  const header = document.createElement('header');
  const container = document.createElement('div');

  const logoBox = document.createElement('div');
  const logoBoxList1Img = document.createElement('img')

  const navbar = document.createElement('div');
  const navbarLink1 = document.createElement('a');
  const navbarLink2 = document.createElement('a');
  const navbarLink3 = document.createElement('a');


  header.classList.add('header');
  container.classList.add('container');

  logoBox.classList.add('header-logoBox');
  logoBoxList1Img.classList.add('header-logoBox__listImg');

  navbar.classList.add('header-navbar');
  navbarLink1.classList.add('header-navbar-links', 'active');
  navbarLink2.classList.add('header-navbar-links');
  navbarLink3.classList.add('header-navbar-links');


  container.append(header);
  header.append(logoBox, navbar);
  logoBox.append(logoBoxList1Img);
  navbar.append(navbarLink1, navbarLink2, navbarLink3);
  

  logoBoxList1Img.src = '/client/images/logoImg.png'

  navbarLink1.textContent = 'Explore';
  navbarLink2.textContent = 'Trending🔥';
  navbarLink3.textContent = 'FAQ';
  
  return container;
}