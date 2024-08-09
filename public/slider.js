$(document).ready(function () {
    $(".slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinbity: true,
        centerMode: true,
        centerPadding: "50px",
    });

    $(".slick-prev").text("<");
    $(".slick-next").text(">");

    function updateCounter() {
        var currentSlide = $('.slider').slick('slickCurrentSlide');
        var totalSlides = $('.slider').slick('getSlick').slideCount;
        var percentage;
        if (currentSlide >= 5) {
            percentage = (currentSlide + 1 - 10) / totalSlides * 100;
        } else {
            percentage = (currentSlide + 1) / totalSlides * 100;
        }
        
        var translateXValue;
        if (currentSlide == 0) {
            translateXValue = 0;
        } else {
            translateXValue = 1000 * (percentage / 100) - 50;
        }

        $('.count').css('transform', 'translateX(' + translateXValue + 'px)');
    }

    updateCounter();

    $('.slick-next').on('click', function() {
        updateCounter();
    });

    $('.slick-prev').on('click', function() {
        updateCounter();
    });
});