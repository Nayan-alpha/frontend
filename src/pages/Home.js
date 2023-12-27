// Import necessary dependencies and styles
import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

// Define the Home component
function Home() {
  // State variables
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [target, setTarget] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // Event handler for changing the selected image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageURL(URL.createObjectURL(file));
    setImage(file);
  };

  // Event handler for form submission
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

  // Render the component
  return React.createElement('div', { className: 'container' },
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('label', { htmlFor: 'image' }, 'Upload image'),
      React.createElement('input', { type: 'file', id: 'image', onChange: handleImageChange }),
      React.createElement('button', { type: 'submit' }, 'Submit')
    ),
    imageURL && React.createElement('div', null,
      React.createElement('h2', null, 'Selected Image Preview'),
      React.createElement('img', {
        src: imageURL,
        alt: 'Selected',
        style: { maxWidth: '100%', maxHeight: '300px' }
      })
    ),
    prediction && React.createElement('div', { className: 'output' },
      React.createElement('h2', null, 'Prediction'),
      prediction,
      React.createElement('h2', null, 'Target'),
      target
    )
  );
}

// Export the Home component
export default Home;
