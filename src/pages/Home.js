// import React, { useState } from 'react'
// import { toast } from 'react-hot-toast'
// import axios from 'axios'
// import './home.css'

// function Home() {
//     const [image, setImage] = useState(null);
//     const [prediction, setPrediction] = useState(null);
//     const [target, setTarget] = useState(null);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];

//         setImage(file);
//     };

//     const handlesubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const base64data = reader.result.split(',')[1];

//                 const requestData = {
//                     image: base64data,
//                     name: image.name || 'default_filename.jpg',
//                 };


//                 axios.post(process.env.FLASK_URL,requestData, {
//                     withCredentials: true,
//                 })
//                     .then((response) => {
//                         const result = response;
                        
//                         console.log(Object.keys(result))
                        
//                         setPrediction(result["data"]["prediction"])
//                         setTarget(result["data"]["target"])
//                         console.log('Response from server:', result);
//                     })
//                     .catch((error) => {
//                         console.error('Error:', error);
//                     });
//             };

//             reader.readAsDataURL(image);
//         } catch (error) {
//             console.log(error);
//         }



        
        




//     }
//     return (
//         <div>
//             <form onSubmit={handlesubmit}>
//                 <label htmlFor='image'>Upload image</label>
//                 <input type='file' id="image" onChange={handleImageChange}></input>
//                 <button type="submit">Submit</button>
//             </form>

//             {prediction ? (
//                 <div className='output'>
                    
//                     <h2>prediction</h2>
//                     {prediction}
//                     {/* <h2>target</h2>
//                     {target} */}
//                 </div>
//             ) : null}
//         </div>
//     )
// }

// export default Home


import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'


function Home() {
    const [imgFile, setImgFile] = useState(null);
    const [responseMessage,setResponseMessage] = useState("-----");
    const [imageUrl, setImageUrl] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [target, setTarget] = useState(null);
    const [b1,setb1]=useState(0);
    const [b2,setb2]=useState(0);
    const [b3,setb3]=useState(0);
    const [b4,setb4]=useState(0);
    const [cos,setcos]=useState(0);

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
            const targetValue=data["Caption"];
            const tb1=data["b1"];
            const tb2=data["b2"];
            const tb3=data["b3"];
            const tb4=data["b4"];
            const tcos=data["cos"];
            setPrediction(predictedValue);
            setTarget(targetValue);
            setb1(tb1);
            setb2(tb2);
            setb3(tb3);
            setb4(tb4);
            setcos(tcos);
              

            // const data = await response.text();
            // setResponseMessage(data)
            } else {
            console.error("Image upload failed.");
            }
        } catch (error) {
            console.error("Error during image upload:", error);
        }
        }
        else {
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
        <div style={{display:'flex',justifyContent:'center'}}>
// {target &&(
            <div className='output' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px',width:'40%',height:'auto' }}>
                <p>target</p>
                {target}
                {/* <h2>target</h2>
                    {target} */}
            </div>
            <div className='output' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px',width:'40%',marginLeft:'5%',height:'auto'}}>
                <p>{prediction}</p>
                
                {/* <h2>target</h2>
                    {target} */}
            </div>
        </div>
  
       
        </div>
    );
    // const [image, setImage] = useState(null);
    // const [prediction, setPrediction] = useState(null);
    // const [target, setTarget] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];

    //     setImage(file);
    // };

    // const handlesubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const base64data = reader.result.split(',')[1];

    //             const requestData = {
    //                 image: base64data,
    //                 name: image.name || 'default_filename.jpg',
    //             };


    //             axios.post("https://test-report-3qti.onrender.com/predict",requestData, {
    //                 withCredentials: true,
    //             })
    //                 .then((response) => {
    //                     const result = response;
                        
    //                     console.log(Object.keys(result))
                        
    //                     setPrediction(result["data"]["prediction"])
    //                     setTarget(result["data"]["target"])
    //                     console.log('Response from server:', result);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error:', error);
    //                 });
    //         };

    //         reader.readAsDataURL(image);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // return (
    //     <div>
    //         <form onSubmit={handlesubmit}>
    //             <label htmlFor='image'>Upload image</label>
    //             <input type='file' id="image" onChange={handleImageChange}></input>
    //             <button type="submit">Submit</button>
    //         </form>

    //         {prediction ? (
    //             <div className='output'>
                    
    //                 <h2>prediction</h2>
    //                 {prediction}
    //                 <h2>target</h2>
    //                 {target}
    //             </div>
    //         ) : null}

    //     </div>



    // )
}

export default Home


// import "../CSS/dashboard.css";
// import React, { useState } from "react";

// export default function DashBoard() {
//   const [imgFile, setImgFile] = useState(null);
//   const [responseMessage,setResponseMessage] = useState("-----")

//   const fileSelectHandler = (event) => {
//     setImgFile(event.target.files[0]);
//   };
//   const fileUploadHandler = async () => {
//     if (imgFile) {
//       const formData = new FormData();
//       formData.append("image", imgFile);

//       try {
//         const response = await fetch("https://2bdb-13-232-181-159.ngrok-free.app/upload", {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           console.log("Image uploaded successfully!");
//           const data = await response.text();
//           setResponseMessage(data)
//         } else {
//           console.error("Image upload failed.");
//         }
//       } catch (error) {
//         console.error("Error during image upload:", error);
//       }
//     }
//     else {
//       console.log('No file selected.');
//   }
//   };

//   return (
//     <div>
//       <h1>Upload Image</h1>
//       <input type="file" onChange={fileSelectHandler}></input>
//       <button onClick={fileUploadHandler}>Generate</button>
//       <h2>Output: {responseMessage}</h2>
//     </div>
//   );
// }
