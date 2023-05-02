// Parallax effect lags on mobile, so we disable it based on the window resolution.
const parallaxImage = document.querySelector('#parallax-img');
const parallaxMinWidth = 768;
const parallaxSpeed = 0.8;

const parallaxTick = () => {
    if (window.innerWidth > parallaxMinWidth) {
        // parallaxImage.style.transform = `translateY(${window.pageYOffset * parallaxSpeed}px)`;
        const distance = window.pageYOffset * parallaxSpeed;
        parallaxImage.style.transform = `translate3d(0, ${distance}px, 0)`;

    } else {
        parallaxImage.style.transform = 'none';
    }
};

window.addEventListener('scroll', () => {
    window.requestAnimationFrame(parallaxTick);
});

window.addEventListener('resize', () => {
    window.requestAnimationFrame(parallaxTick);
});

window.addEventListener('DOMContentLoaded', () => {
    window.requestAnimationFrame(parallaxTick);
});
