export async function setupMobileImageSlider() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const images = sliderWrapper?.querySelectorAll('img') || [];
    const indexText = document.querySelector('.slider-index');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
  
    if (!sliderWrapper || images.length === 0) return;
  
    let currentIndex = 0;
  
    function updateSlider() {
      sliderWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;
      indexText.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });
  
    updateSlider();
  }
  