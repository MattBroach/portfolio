const ROTATION_INTERVAL = 10000
const CLEAR_DELAY = 2000


export default class VideoCarousel {
  /*
   * Handles Fullscreen Video rotation for the landing page.
   * Expects an argument `videos` on initialization, which will be
   * a list of video files of the form of:
   * [
   *    {
   *      title: PROJECT_TITLE,
   *      path: PROJECT_PATH,
   *      id: PROJECT_ID,
   *      webm: WEBM_SRC,
   *      mp4: MP4_SRC,
   *      dash: DASH_SRC,
   *      poster: POSTER_SRC,
   *    },
   * ]
   */
  constructor(videos) {
    this.videos = videos
    this.currentVideoIndex = 0

    this.rotate = this.rotate.bind(this)
  }

  constructVideo(video) {
    return `
      <div class="landing-video fade-in current" id="${video.id}">
        <video autoplay muted loop poster="${video.poster}">
          <source src="${video.dash}" type="application/dash+xml">
          <source src="${video.webm}" type="video/webm">
          <source src="${video.mp4}" type="video/mp4">
        </video>
        <h1 class="landing-title">
          <a href="${video.path}">
            ${video.title}
          </a>
        </h1>
      </div>
    `
  }

  getCurrentVideo() {
    return this.videos[this.currentVideoIndex]
  }

  getNextVideo() {
    const index = this.currentVideoIndex
    const { length } = this.videos
    return this.videos[(index + 1) % length]
  }

  rotate() {
    const currentVideo = this.getCurrentVideo()
    const nextVideo = this.getNextVideo()

    const currentVideoElem = document.getElementById(currentVideo.id)
    currentVideoElem.classList.add('last')
    currentVideoElem.classList.remove('current')

    const nextVideoDOMString = this.constructVideo(nextVideo)

    currentVideoElem.insertAdjacentHTML('afterend', nextVideoDOMString)

    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length

    setTimeout(this.clearLast, CLEAR_DELAY)
  }

  clearLast() {
    const outDated = [...document.getElementsByClassName('last')]

    outDated.forEach(elem => elem.remove())
  }

  run() {
    setInterval(() => this.rotate(), ROTATION_INTERVAL)
  }
}
