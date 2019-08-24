const button = document.getElementById('menu-button')
const menu = document.getElementById('menu-overlay')

button.addEventListener('click', () => {
  button.classList.toggle('open')
  menu.classList.toggle('open')
})
