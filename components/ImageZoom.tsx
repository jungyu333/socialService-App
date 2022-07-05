import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Slider from "react-slick";
import tw from "tailwind-styled-components";

const Overlay = tw.div`
  fixed
  top-0
  bottom-0
  left-0
  right-0
  z-40
  m-auto
`;

const Header = tw.div`
  flex
  items-center
  justify-center
  text-center
  h-16
  bg-white
  font-bold
  text-2xl
`;

const SliderWrapper = tw.div`
  bg-gray-700
  h-full
  m-auto
  flex
  items-center
`;

const CustomSlider = tw(Slider)`
  m-auto
  w-96
  sm:w-10/12
  sm:h-10/12
`;

const Button = tw.button`
  absolute
  top-20
  right-6
  text-white
  border
  flex
  justify-center
  items-center
  p-1
`;
function ImageZoom({ images, onClickClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <Button onClick={onClickClose}>
          <CloseOutlined />
        </Button>
      </Header>
      <SliderWrapper>
        <CustomSlider
          initialSlide={0}
          beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
          infinite
          arrows={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {images.map((image) => (
            <div className="m-auto" key={image.src}>
              <img
                className="m-auto p-10 h-72 sm:h-96"
                src={`http://localhost:4000/${image.src}`}
                alt={image.src}
              />
            </div>
          ))}
        </CustomSlider>
      </SliderWrapper>
    </Overlay>
  );
}

export default ImageZoom;
