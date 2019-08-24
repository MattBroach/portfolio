import ActiveMenuUpdater from './scroll'

// Autoscroll
const headerUpdater = new ActiveMenuUpdater('page-content', '.page-sidebar .project-works-list-item')

// Close menu when using anchor links
const anchorLinks = document.getElementsByClassName('project-works-list-item')
const button = document.getElementById('menu-button')
const menu = document.getElementById('menu-overlay')

const forceClose = ()  => {
  button.classList.remove('open')
  menu.classList.remove('open')
}

[...anchorLinks].forEach(link => {
  link.addEventListener('click', forceClose)
})
