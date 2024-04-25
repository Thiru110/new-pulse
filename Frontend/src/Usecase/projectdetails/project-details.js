import pro from './PMS.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import img from "./proj.png"
import React,{ useState,useEffect } from 'react';
function Projectdetails(){
  const navigate = useNavigate();
    
     //for dropdown
//for onchange value will save in this usestate
 const [inputValue,setInputValue] = useState({
 
  Title: '',
  Email:'',
  Description: '',
  Team: '',
  Startdate: '',
  Deadline: '',
  Tools: '',
  Files: '',
});
// assign value to  setvalue function
console.log(inputValue)
const handleChange = (event) => {
  setInputValue({...inputValue, [event.target.name]: event.target.value})
};
// press submit button prevent default
// const handleSubmit = (event) => {
//   event.preventDefault();
//  axios.post('http://localhost:9025/project_info', inputValue)//inside we write api to post the data in mysql
//  .then(res=> console.log(res))
//  .catch(err=> console.log(err));
// }
 // for submited
 const [submitted, setSubmitted] = useState(false);
//for alert message if  user details submited
const handleSubmit = (e) => {
  e.preventDefault();
 
  // Check if required fields are filled
  if (inputValue.Title.trim() === '' || inputValue.Description.trim() === '' || inputValue.Team.trim() === ''|| inputValue.Tools.trim() === '') {
    alert("User didn't fill the required fields");
    return;
  }
  // Proceed with form submission logic
  // For example, you can send the form data to the backend here
  console.log('Form submitted with data:', inputValue);
  axios.post('http://localhost:8000/project_infos', inputValue)//inside we write api to post the data in mysql
  .then(res=> console.log(res))
  .catch(err=> console.log(err));
  setSubmitted(true);
};
    //image transition
    const [formImagePosition, setFormImagePosition] = useState('hidden1');
useEffect(() => {
    // After the component mounts, set a timeout to display the image after a delay
    const timeoutNo = setTimeout(() => {
      setFormImagePosition('visibled');
    }, 1000); // Delay in milliseconds (adjust as needed)

    // Cleanup function to clear the timeout if the component unmounts before it fires
    return () => clearTimeout(timeoutNo);
  }, []);
 
  const handleClick = () => {
    // Navigate to the signup page
    setTimeout(() => {
      // Navigate to the task page after 3 seconds
      navigate('/task');
    }, 2000); // 3000 milliseconds = 3 seconds
   
  };
  return (
   
  
     <div id='left-container'>
      <div id='page'></div>
      {/* <div id='img-cont'>
      <img src={pro} id='projectmanage' className={formImagePosition === 'visibled' ? 'slidein' : 'hidden1'}alt='hi'/>
     </div>  */}
     <div id='title'>
     
      {/* <div id='img-cont'>
      
      <img src={img} id='img1'></img>

      </div> */}
    </div> 
    <div>
    {/* <span id='first-name'>Navigate the complexities of modern project management</span> */}
    {/* <span id='name'>Plan your first project in minutes.</span> */}
    </div>
   
    
    <div id="right-container">
      {/* form  */}

      {/*  */}
      <form onSubmit={handleSubmit} id='form1'> 
        {/* <input placeholder="Project-Id" id='id' name='ID'onChange={handleChange}/> */}
         <div id='form'>
          {/* <span id='fill'>Fill Me</span> */}
          
          <span id='span-title'>Project Title</span>
        <input type="text" id="pro-title"  name='Title' onChange={handleChange}/>
        <br></br>
        <span id='span-email'>Email</span>
        <input type="text" id="Email"  name='Email' onChange={handleChange}/>
        <br></br>
        <span id='span-des'>Description</span>
        <input  id='textarea2' name='Description' onChange={handleChange}/>
        <br></br>
        <span id='span-mem'>Team members</span>
        <input  id='textarea1'  name='Team' onChange={handleChange}/>
        <br></br>
        <label id='label1'>Startdate</label><input type='date' id='startdate' name='Startdate' onChange={handleChange}/>
        <br></br>
        <label id='label2'>Enddate</label><input type='date' id='enddate' name='Deadline' onChange={handleChange}/>
        <br></br>
        <span id='span-tools'>Tools</span>
        <input type='text'  id='toolsused' name='Tools' onChange={handleChange}/>
        <br></br>
        <span id='span-files'>Files</span>
        <input type='file' id='file1'  name='Files' onChange={handleChange}/>
        <br></br>
        <button type='submit' id='sub'  onClick={handleClick}>Submit</button>
        </div>
      </form>
      {submitted && <span id='success'>submitted successfully!</span>}
     
  
    </div>
     
    
    </div>
    
    

  );


      
    
    
    

}
export default Projectdetails;
// Navigate the complexities of modern project management
// Experience a world where consistency meets innovation and where you're always in control. Rocketlane doesn't just enable project delivery; we shape it.