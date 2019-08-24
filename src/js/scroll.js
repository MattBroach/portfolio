export default class ActiveMenuUpdater {
  /*
   * When scrolling though a long container with discreet sections,
   * updates a separate menu with the "active" class for the corresponding
   * section title
   *
   * This solution makes a number of assumptions that may or not be
   * true in other situations, so beware of generalizing:
   *   1. that the title elements and the scrolling elements are in 
   *      corresponding order
   *   2. that the scroll elements are all the same height
   *   3. That a scroll element is equal to the height of the window
   */
  constructor(scrollContainerID, headerQuery) {
    this.element = document.getElementById(scrollContainerID)
    this.element.onscroll = this.onScroll.bind(this)

    this.headers = document.querySelectorAll(headerQuery)
    console.log(this.headers)
    this.currentActiveIndex = 0
  }

  onScroll(e) {
    const height = this.getHeight()
    const scrollIndex = Math.round(e.target.scrollTop/height)

    if (scrollIndex !== this.currentActiveIndex) this.setActive(scrollIndex)
  }

  setActive(index) {
    this.currentActiveIndex = index
    
    this.clearActive()

    this.headers[index].classList.add('active')
  }

  clearActive() {
    [...this.headers].forEach(header => {
      header.classList.remove('active')
    })
  }

  getHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}
