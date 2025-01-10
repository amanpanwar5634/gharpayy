const carouselContainer = document.querySelector('.carousel-container');
const images = document.querySelectorAll('.carousel-container img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 1; 
const totalImages = images.length;
const imageWidth = images[0].clientWidth;

carouselContainer.style.transform = `translateX(${-imageWidth * currentIndex}px)`;

function updateCarousel() {
    carouselContainer.style.transition = 'transform 0.5s ease-in-out';
    const offset = -imageWidth * currentIndex;
    carouselContainer.style.transform = `translateX(${offset}px)`;
}

carouselContainer.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
        currentIndex = totalImages - 2; 
        carouselContainer.style.transition = 'none'; 
        carouselContainer.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
    } else if (currentIndex === totalImages - 1) {
        currentIndex = 1; 
        carouselContainer.style.transition = 'none'; 
        carouselContainer.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalImages - 1) {
        currentIndex++;
        updateCarousel();
    }
});


prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});
