import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function postImage({ images }) {
  const [imageZoom, setImageZoom] = useState(false);
  const onClickZoom = () => {
    setImageZoom(true);
  };

  const onClickclose = () => {
    setImageZoom(false);
  };
  if (images.length === 1) {
    return (
      <>
        <img
          className="h-96 w-full cursor-pointer"
          src={`http://localhost:4000/${images[0].src}`}
          onClick={onClickZoom}
        />
      </>
    );
  } else if (images.length === 2) {
    return (
      <div className="flex">
        <img
          className="h-96 w-1/2  cursor-pointer  "
          src={`http://localhost:4000/${images[0].src}`}
          onClick={onClickZoom}
        />
        <img
          className="h-96 w-1/2  cursor-pointer "
          src={`http://localhost:4000/${images[1].src}`}
          onClick={onClickZoom}
        />
      </div>
    );
  } else {
    return (
      <div className="flex">
        <img
          className="h-96 w-1/2  cursor-pointer"
          src={`http://localhost:4000/${images[0].src}`}
          onClick={onClickZoom}
        />
        <div className="h-96 w-1/2 flex justify-center items-center ">
          <div
            onClick={onClickZoom}
            className="text-sm text-center text-gray-500 hover:font-bold hover:text-indigo-600 cursor-pointer"
          >
            <PlusOutlined className="text-2xl mb-1" />
            <div className="text-sm ">
              {images.length - 1}
              개의 사진 <br /> 더보기
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default postImage;
