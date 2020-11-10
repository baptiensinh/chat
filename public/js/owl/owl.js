var owl = $('.owl-carousel');
owl.owlCarousel({
    nav: true,
    items: 5,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1800,
    autoplayHoverPause: true,
    touchDrag: true,
    pullDrag: true,
    // freeDrag: true,
    // stagePadding:0.5,
    // dotsEach:true,
    // dots:true,
    // fluidSpeed:250,
    smartSpeed: 500,
    dotsData: true,
    mouseDrag: true,// kéo content bằng chuột
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        960: {
            items: 5
        },
        1200: {
            items: 6
        }
    },
    responsiveRefreshRate: 100,
});

//https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html