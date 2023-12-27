import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [imgFile, setImgFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState("-----");
    const [imageUrl, setImageUrl] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [target, setTarget] = useState(null);
    const [b1, setB1] = useState(0);
    const [b2, setB2] = useState(0);
    const [b3, setB3] = useState(0);
    const [b4, setB4] = useState(0);
    const [cos, setCos] = useState(0);

    const fileSelectHandler = (event) => {
        setImgFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setPrediction("Generated Report");
        setTarget("");
    };

    const fileUploadHandler = async () => {
        if (imgFile) {
            const formData = new FormData();
            formData.append("image", imgFile);

            try {
                const response = await fetch("https://barely-ruling-whale.ngrok-free.app/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    console.log("Image uploaded successfully!");
                    const data = await response.json();
                    const predictedValue = data["Predicted"];
                    const targetValue = data["Caption"];
                    const tb1 = data["b1"];
                    const tb2 = data["b2"];
                    const tb3 = data["b3"];
                    const tb4 = data["b4"];
                    const tcos = data["cos"];
                    setPrediction(predictedValue);
                    setTarget(targetValue);
                    setB1(tb1);
                    setB2(tb2);
                    setB3(tb3);
                    setB4(tb4);
                    setCos(tcos);
                } else {
                    console.error("Image upload failed.");
                }
            } catch (error) {
                console.error("Error during image upload:", error);
            }
        } else {
            console.log('No file selected.');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '20px' }}>
                {imageUrl && <img src={imageUrl} alt='Selected Image' style={{ width: '300px', height: '300px', border: '1px solid black', borderRadius: '5px' }} />}
            </div>

            <h1>Upload Image</h1>
            <form onSubmit={fileUploadHandler} style={{ display: 'inline-block', textAlign: 'left' }}>
                <label htmlFor='image'>Upload image</label>
                <input type='file' id="image" onChange={fileSelectHandler}></input>
                <button type="submit">Submit</button>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='output' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '40%', height: 'auto' }}>
                    <p>target</p>
                    {target}
                </div>
                <div className='output' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '40%', marginLeft: '5%', height: 'auto' }}>
                    <p>{prediction}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
