{
    document.addEventListener('DOMContentLoaded', function () {
        let inst = new mdui.Drawer('#left-drawer', {
            overlay: true,
            swipe: true,
        });
        document.querySelector('#openLeftDrawer').addEventListener('click', function () {
            inst.open();
        });
    });
}

// {
//     let passageChips = document.querySelectorAll('.passageChip');

//     passageChips.forEach(element => {
//         element.addEventListener('mouseover',(element) => {

//         });
//     });
// }

{
    // Parallax effect lags on mobile, so we disable it based on the window resolution.
    let previousPageYOffset = 0;
    const parallaxImage = document.querySelector('#parallax-img');
    const category = document.querySelector('#category');
    const hiddenNavbar = document.querySelector('.fixed-top');
    const parallaxMinWidth = 768;
    const parallaxSpeed = 0.8;

    const parallaxTick = () => {
        if (window.innerWidth > parallaxMinWidth) {
            const distance = window.pageYOffset * parallaxSpeed;
            parallaxImage.style.transform = `translate3d(0, ${distance}px, 0)`;
        } else {
            parallaxImage.style.transform = 'none';
        }
    };

    function showCategory() {
        if (category) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollTop > 180) {
                category.style.opacity = 1.0;
            } else {
                category.style.opacity = 0;
            }
            // if (scrollTop - previousPageYOffset > 0) {
            //     hiddenNavbar.style.top = `-70px`;
            // } else {
            //     hiddenNavbar.style.top = `0px`;
            // }
            previousPageYOffset = scrollTop;
        }
    }

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(parallaxTick);
        showCategory();
    });

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(parallaxTick);
    });

    window.addEventListener('DOMContentLoaded', () => {
        window.requestAnimationFrame(parallaxTick);
    });
}
