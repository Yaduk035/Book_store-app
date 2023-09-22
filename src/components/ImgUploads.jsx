import React, { useState } from "react";
import axios from "../api/axios";

const ImgUploads = () => {
  const [image, setImage] = useState();

  function conBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error :", error);
    };
  }

  const uploadImg = async () => {
    try {
      const response = axios.put(
        `books/6507280e0877fc6a6ac21c4e`,
        { image: image },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <input type="file" accept="image/*" onChange={conBase64} />
        <br />
        <button onClick={uploadImg}>Upload</button>
      </div>
      <div>
        <img width={300} src={image} />
      </div>
    </>
  );
};

export default ImgUploads;
