import React from "react";
import Slider from "react-slick";

export default function MakeSlider({
    children,
    dots = true,
    autoplay = true,
    arrows = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    responsive = true
}) {
    var settings = {
        dots,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll,
        autoplay,
        autoplaySpeed: 2000,
        arrows,
        responsive: responsive? ([
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]) : null
    };
    return <Slider {...settings}>{children}</Slider>;
}
