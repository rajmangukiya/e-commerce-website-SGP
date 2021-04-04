const addButton = document.querySelector('.add-new');
const addProductForm = document.querySelector('.add-product-form');
const cross = document.querySelector('.product-cross');

addButton.addEventListener('click', openProductForm);
cross.addEventListener('click', closeProductForm);

function openProductForm(e) {
  addProductForm.style.zIndex = '2';
  addProductForm.style.opacity = '1';
}
function closeProductForm(e) {
  addProductForm.style.zIndex = '-1';
  addProductForm.style.opacity = '0';
}

// for add image

const button = document.querySelector('.button');
let addFile = document.querySelector('.add-file-hidden');
let image = document.querySelector('.add-product-photo-box');
let name = document.querySelector('.add-product-name');
const imageCross = document.querySelector('.add-product-cross');

button.addEventListener('click', (e) => addFile.click());
imageCross.addEventListener('click', (e) => image.style.backgroundImage = '');

addFile.addEventListener('change', (e) => {
  const file = addFile.files[0];
  if(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      image.style.backgroundImage = `url(${result}) `;
      name.textContent = file.name;
      // console.log(result);
    }
    reader.readAsDataURL(file);
  }
});