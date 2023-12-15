import React, { useState } from 'react'
// import { toast } from 'react-hot-toast'
import axios from 'axios'


function Home() {
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [target, setTarget] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setImage(file);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1];

                const requestData = {
                    image: base64data,
                    name: image.name || 'default_filename.jpg',
                };


                axios.post("https://test-report-3qti.onrender.com/predict",requestData, {
                    withCredentials: true,
                })
                    .then((response) => {
                        const result = response;
                        
                        console.log(Object.keys(result))
                        
                        setPrediction(result["data"]["prediction"])
                        setTarget(result["data"]["target"])
                        console.log('Response from server:', result);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            };

            reader.readAsDataURL(image);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <label htmlFor='image'>Upload image</label>
                <input type='file' id="image" onChange={handleImageChange}></input>
                <button type="submit">Submit</button>
            </form>

            {prediction ? (
                <div className='output'>
                    
                    <h2>prediction</h2>
                    {prediction}
                    <h2>target</h2>
                    {target}
                </div>
            ) : null}

        </div>



    )
}

export default Home