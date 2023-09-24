import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Img from "../images/icons/92507bdcf4b5edfa12d5e9cc4f01b301.png";

const YourComponent = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  return (
    <div>
      <Cropper
        image={Img} // Replace with your image source
        crop={crop}
        zoom={zoom}
        aspect={4 / 5} // Adjust the aspect ratio as needed
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
      />
      {/* Add buttons or controls to apply or cancel the crop */}
      {/* Example: */}
      <button>Apply Crop</button>
      {/* <button onClick={cancelCrop}>Cancel Crop</button> */}
    </div>
  );
};

export default YourComponent;
