import React from "react";
import axios from "../api/axios";
import { useState } from "react";
import Header from "./Header";

const ImgUploads = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [resFileName, setResFileName] = useState("");
  const [resImage, setResImage] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const imageSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("File uploaded successfully");
        const name = response?.data?.fileName;
        console.log(name);
        setResFileName(name);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    const handleImageName = async () => {
      try {
        const filename = { imageName: resFileName };
        const response = await axios.put(
          `books/6507280e0877fc6a6ac21c4e`,
          filename,
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        );
        console.log("imageNameRes :", response?.data);
      } catch (error) {
        console.error("imageNameError:", error);
      }
    };
    handleImageName();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(fileName);
    const response = await axios.delete(`/deleteimg/${fileName}`);
    console.log(response.data);

    const handleDelImgname = async () => {
      try {
        const filename = { imageName: null };
        const response = await axios.put(
          `books/650734790877fc6a6ac21ce3`,
          filename,
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        );
        console.log("imageNameRes :", response?.data);
      } catch (error) {
        console.error("imageNameError:", error);
      }
    };
    handleDelImgname();
  };

  const getImage = async () => {
    try {
      const response = await axios.get(`/getimg/1695293657738-OIP.jpeg`, {
        responseType: "blob", // Specify the response type as blob
      });

      if (response.status === 200) {
        // Create a URL for the blob and set it as the image source
        const objectURL = URL.createObjectURL(response.data);
        console.log("success!");
        setResImage(objectURL);
      } else {
        console.error("Image fetch failed.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleSubmit = (e) => {
    imageSubmit(e);
  };

  return (
    <>
      <div>
        <Header />
        <h1>Image Upload</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <br />
        <form onSubmit={handleDelete}>
          <input type="text" onChange={(e) => setFileName(e.target.value)} />
          <button type="submit">Delete img</button>
        </form>
      </div>
      <br />
      <div>
        <h2>Image Display</h2>

        <img src={resImage} alt="Uploaded" style={{ maxWidth: "100%" }} />
      </div>
      <button onClick={getImage}>Get image</button>
    </>
  );
};
export default ImgUploads;
