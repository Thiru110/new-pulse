import logo3 from "./time-tracking.png"
import logo4 from "./proj-planning1.png"
import React, { useState, useEffect } from 'react';
import logo6 from "./tasks-management.png"
import logo7 from "./about-banner.png"
function Rightdiv(){
    //for blur
    // const [isBlurred, setIsBlurred] = useState(false);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //       setIsBlurred(prevState => !prevState);
    //     }, 1500);
    
    //     return () => clearInterval(intervalId);
    //   }, []); // Empty dependency array ensures that effect runs only once
    
//transition of image
const [imagePosition, setImagePosition] = useState('hidden');
useEffect(() => {
    // After the component mounts, set a timeout to display the image after a delay
    const timeoutId = setTimeout(() => {
      setImagePosition('visible');
    }, 1000); // Delay in milliseconds (adjust as needed)

    // Cleanup function to clear the timeout if the component unmounts before it fires
    return () => clearTimeout(timeoutId);
  }, []);

    return <>
    <div id="full">

    
    <div id="img-conatainer">
    {/* <div id="logo-cont1">
    <img src={logo3} id="logo4"></img>
     </div> */}
     {/*  */}
     {/* <div id="logo-cont1">
        <img src={logo3} id="logo3"></img>
        </div>
        <div id="task">
            <span id="h3">Task Management</span>
            <p id="para1">With PMS, task management becomes efficient and streamlined, with complete visibility into what’s going on at any point in time. PMS offers many ways to stay on top of tasks, including notifications and customization</p>
        </div>
        <div id="time">
        <span id="h3">Time Tracking</span>
            <p id="para2">PMS comes with advanced, user-friendly time tracking options that are integrated with the task management tools for easy and convenient time reporting and analytics.</p>

        </div> */}
       
     </div>
     
     {/* <div id="logo-cont3">
     <img src={logo6} id="logo4"></img>
    
     </div> */}
     {/* <div id="logo-cont4">
     <img src={logo5} id="logo4"></img>
   
     </div> */}
  
     <div id="logo-cont5">
    <img src={logo7} id="logo4"  className={imagePosition === 'visible' ? 'slide-in' : 'hidden'}></img>
     </div>
     </div>
   
     </>
 
 }
 export default Rightdiv;