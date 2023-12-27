import React, { useState } from 'react';
import axios from 'axios';
import {./Home.css}

function Home() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [target, setTarget] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageURL(URL.createObjectURL(file));
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(
          'https://barely-ruling-whale.ngrok-free.app/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          console.log('Image uploaded successfully!');
          const result = response.data;
          setPrediction(result.prediction);
          setTarget(result.target);
        } else {
          console.error('Image upload failed.');
        }
      } else {
        console.log('No file selected.');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='image'>Upload image</label>
        <input type='file' id='image' onChange={handleImageChange} />
        <button type='submit'>Submit</button>
      </form>

      {imageURL && (
        <div>
          <h2>Selected Image Preview</h2>
          <img
            src={imageURL}
            alt='Selected'
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        </div>
      )}

      {prediction ? (
        <div className='output'>
          <h2>Prediction</h2>
          {prediction}
          <h2>Target</h2>
          {target}
        </div>
      ) : null}
    </div>
  );
}

export default Home;
