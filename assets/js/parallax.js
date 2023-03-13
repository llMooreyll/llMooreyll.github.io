// Parallax effect lags on mobile, so we disable it based on the window resolution.
const parallaxImage = document.querySelector('#parallax-img');
const parallaxMinWidth = 768;
const parallaxSpeed = 0.5;

const parallaxTick = () => {
    if (window.innerWidth > parallaxMinWidth) {
        parallaxImage.style.transform = `translateY(${window.pageYOffset * parallaxSpeed}px)`;
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
