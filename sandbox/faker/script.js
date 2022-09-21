const btnGen = document.querySelector('button');
const divSetEl = document.querySelector('#set');


btnGen.addEventListener('click', () => {
  const info = faker.helpers.createCard();

  console.log(info);
  console.log(faker.name.firstName());
  console.log(faker.name.lastName());

  const { name, email, address: { city, country, zipcode } } = info;

  document.querySelector('#name').value = name;
  document.querySelector('#email').value = email;
  document.querySelector('#city').value = city;
  document.querySelector('#zipcode').value = zipcode;
  document.querySelector('#country').value = country;


});