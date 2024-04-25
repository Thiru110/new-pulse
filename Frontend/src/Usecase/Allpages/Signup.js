import React, { useState } from 'react';
import axios from 'axios';
function Signup(){
    function callalert(){
        alert ("Task added successfully")
    }
    // for date getting
    const [taskDetails, setTaskDetails] = useState('');
    //for storing a change values in taskdetails
    
    const handleInputChange = (e) => {
        setTaskDetails(e.target.value);
      }; 
    //   //passing  task details to backend
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/taskdetails', {
            taskDetails
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    //   console.log(taskDetails);
    return <>
    <div id="task-container">
        <div id="tot-form">
       
       <div id="quotes">
       <span id="h4">TASK DETAILS</span>
       <br></br>
         <span id="tag-line1">Every task detail is a step closer to project perfection.</span><span id="tag-line2"> Let's craft a masterpiece together.</span>

        </div>
        
         <form onSubmit={handleSubmit}>
         <div id="task-form">
           
            <div id="fields">
           
            {/* <h6 id="note">Please enter the task details</h6> */}
            {/* <button className="date1" onClick={TodayDate}>Date</button> */}
          <br></br>
          <br></br>
          <input className="field" type="text" placeholder="Enter task details" onChange={handleInputChange} required/>
          <br></br>
          <br></br>
          <input className="btn-sub" type="submit" onClick={callalert}/>
          </div>
          </div>
         </form>
         {/* {error && <p style={{ color: 'red' }}>{error}</p>} Display error message if error state is set */}
         </div>
        
    </div>
    
   
    
     
 
 
     </>
 
 }
 export default Signup;