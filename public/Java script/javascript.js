// const homeButton = document.querySelector('.for-slidebar');
// const slideBar = document.querySelector('.slidebar');
// const crossButton = document.querySelector('.cross');

// homeButton.addEventListener('click', openSlideBar);
// crossButton.addEventListener('click', closeSlideBar);

// let isSlide = false;
// function openSlideBar(e) {
//   slideBar.style.transform = 'translateX(0%)';
//   slideBar.style.opacity = '1';
//   crossButton.style.left = `${slideBar.offsetWidth + 20}px`;
//   crossButton.style.opacity = '1';
//   isSlide = true;
// }
// function closeSlideBar(e) {
//   slideBar.style.transform = 'translateX(-150%)';
//   slideBar.style.opacity = '0';
//   crossButton.style.left = '-10%';
//   crossButton.style.opacity = '0';
//   isSlide = false;
// }

// ***** form *****

const crossLogin = document.querySelector('.login-cross');
const crossCreate = document.querySelector('.create-cross');

// const login = document.querySelector('.login-account');
// const create = document.querySelector('.create-account');
const loginCreate = document.querySelector('.login_create');

// login.addEventListener('click', openLoginForm);
// create.addEventListener('click', openCreateForm);
loginCreate.addEventListener('click', openLoginForm);

crossLogin.addEventListener('click', closeLoginForm);
crossCreate.addEventListener('click', closeCreateForm);

function closeLoginForm() {
  const form = document.querySelector('.login-background');
  form.style.opacity = '0';
  setTimeout(() => {
    form.style.display = 'none';
  }, 500);
}

function closeCreateForm() {
  const form = document.querySelector('.create-background');
  form.style.opacity = '0';
  setTimeout(() => {
    form.style.display = 'none';
  }, 500);
}

function openLoginForm () {
  const openform = document.querySelector('.login-background');
  openform.style.display = 'flex';
  openform.style.opacity = '1';
  // closeSlideBar();
}

function openCreateForm (e) {
  const openform = document.querySelector('.create-background');
  openform.style.display = 'flex';
  openform.style.opacity = '1';
  // closeSlideBar();
}

// ***** form from nav bar *****
  const signInLink = document.querySelector('.sign-in-link');

  signInLink.addEventListener('click', () => {
    closeLoginForm();
    openCreateForm();
  })