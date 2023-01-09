import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import { useRef } from "react";
import { Box } from "@mui/material";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      sx={{
        display: {
          md: "block",
          sm: "none",
          xs: "none",
        },
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      className={className}
      sx={{
        display: {
          md: "block",
          sm: "none",
          xs: "none",
        },
      }}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider({ images }) {
  const settings = {
    // style: { marginBottom: "20px", marginRight: "20px", marginLeft: "20px" },
    style: { marginBottom: "20px" },
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const ref = useRef();

  return (
    <div>
      <Slider ref={ref} {...settings}>
        {images.map((image, i) => (
          <img
            width="100%"
            key={i}
            id={image}
            src={image}
            alt="image"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        ))}
      </Slider>
    </div>
  );
}
