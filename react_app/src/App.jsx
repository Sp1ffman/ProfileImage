import { useState, useEffect } from "react";
import avatar from "./assets/profile.png";
import "./App.css";

import axios from "axios";

const url = "http://localhost:8000/uploads";

function App() {
  const [postImage, setPostImage] = useState({ myFile: "" });

  useEffect(() => {
    const storedImage = localStorage.getItem("postImage");
    if (storedImage) {
      setPostImage(JSON.parse(storedImage));
    }
  }, []);

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    console.log("Uploaded");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    const updatedImage = { ...postImage, myFile: base64 };
    setPostImage(updatedImage);

    localStorage.setItem("postImage", JSON.stringify(updatedImage));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={postImage.myFile || avatar} alt="" />
        </label>

        <input
          type="file"
          label="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <h3>Adithya</h3>
        <span>Image upload</span>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
