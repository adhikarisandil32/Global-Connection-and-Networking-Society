//slide in slide out animations
const navigationOpenButton = document.getElementById("navigation-open-button")
const navigationCloseButton = document.getElementById("navigation-close-button")
const navigationMenu = document.getElementById("navigation-menu")

const leftSideSpace = getComputedStyle(navigationMenu).getPropertyValue("width")
navigationMenu.style.left = `-${leftSideSpace}`

navigationOpenButton.addEventListener("click", () => {
  navigationMenu.style.left = 0
})

navigationCloseButton.addEventListener("click", () => {
  const leftSideSpace =
    getComputedStyle(navigationMenu).getPropertyValue("width")
  navigationMenu.style.left = `-${leftSideSpace}`
})

//home-section-animation
const heroImageContainer = document.getElementById("hero-image-container")

const heroImageElements = [...heroImageContainer.children]

heroImageElements.forEach((element, index) => {
  element.style.left = `${index * 100}%`
})

setInterval(() => {
  heroImageElements.forEach((element) => {
    element.style.left = `${element.style.left.slice(0, -1) - 100}%`
  })
  heroImageElements[0].style.left = `${(heroImageElements.length - 1) * 100}%`
  heroImageElements.push(heroImageElements[0])
  heroImageElements.splice(0, 1)
}, 3500)

//intersection observer animation
const elementsToObserve = [
  document.getElementById("our-mission-image-container"),
  document.getElementById("our-mission-text-container"),
  document.getElementById("projects-texts-ul"),
  document.getElementById("projects-image-container"),
  document.getElementById("flip-card-container"),
  document.getElementById("leadership-texts"),
]

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
      }
    })
  },
  {
    threshold: 0.25,
  }
)

elementsToObserve.forEach((element) => {
  intersectionObserver.observe(element)
  element.style.opacity = 0
  element.style.transition = "opacity 0.5s linear"
})
