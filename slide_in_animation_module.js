class SliderAnimation {
  constructor(
    imagesContainer,
    eachElementSlideInDuration,
    eachElementAnimationDuration
  ) {
    this.imagesContainer = imagesContainer
    this.images = [...this.imagesContainer.children]
    this.elementSlideInDuration = eachElementSlideInDuration
    this.elementAnimationDuration = eachElementAnimationDuration
    this.currentTime = 0

    //we could create another method to get screen refresh rate
    this.screenRefreshRate = 60
    this.deltaTime = 1000 / this.screenRefreshRate
  }

  updateDom() {
    //move first positioned element to last
    //this will automatically remove from the point it was picked up

    this.imagesContainer.insertAdjacentElement("beforeend", this.images[0])

    //update this.image according to recently updated DOM
    this.images = [...this.imagesContainer.children]
    this.images.forEach((image) => {
      image.style.transform = `translateX(0)`
    })
  }

  animate() {
    if (this.elementSlideInDuration > this.elementSlideInDuration) {
      console.error(
        "element slide-in duration greater than element animation duration"
      )
      return
    }

    const slideInAnimationRequest = requestAnimationFrame((timeStamp) => {
      if (this.currentTime / this.elementSlideInDuration >= 1) {
        this.images.forEach((image) => {
          image.style.transform = `translateX(-100%)`
        })

        cancelAnimationFrame(slideInAnimationRequest)
        this.currentTime = 0

        //and the after animation duration of each element, calls the animate function again
        const timeoutFunction = setTimeout(() => {
          //re-shuffle
          this.updateDom()
          this.animate()
          clearTimeout(timeoutFunction)
        }, this.elementAnimationDuration - this.elementSlideInDuration)
      } else {
        this.images.forEach((image) => {
          image.style.transform = `translate(-${
            (this.currentTime / this.elementSlideInDuration) * 100
          }%)`
        })

        // currentTime is changed first and then animated.
        this.currentTime += this.deltaTime

        this.animate()
      }
    })
  }
}

export { SliderAnimation }
