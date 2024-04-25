 // App.jsx
 import axios from 'axios';
import React, { useState,useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  Zoom }  from 'react-toastify';    
import { IoCloudDownloadOutline } from "react-icons/io5";
import { BsCloudDownload } from "react-icons/bs";

const Admin = () => {
	//for project details 
	const[data,setData]=useState([])
	useEffect(()=>{

		fetchData1();

	}, [])
		//   const nonDeletedProjects = response.data.filter(project => !project.is_deleted);
	const fetchData1 = async () => {
		try {
		  const response = await fetch('http://localhost:8000/project_info');
		  const jsonData = await response.json();
		//   const nonDeletedProjects = jsonData.filter(project => !project.is_deleted);
		  setData(jsonData);
		  setActivationStates(Array(jsonData.length).fill(true));
		} catch (error) {
		  console.error('Error fetching data: ', error);
		}
	  };
	  //for dailytask details
	  const[taskData,setTaskData]=useState([])
	  useEffect(()=>{
  
		  fetchData2();
  
	  }, [])
		  //   const nonDeletedProjects = response.data.filter(project => !project.is_deleted);
	  const fetchData2 = async () => {
		  try {
			const response = await fetch('http://localhost:8000/project_info1');
			const jsonData = await response.json();
		  //   const nonDeletedProjects = jsonData.filter(project => !project.is_deleted);
			setTaskData(jsonData);
			// setActivationStates(Array(jsonData.length).fill(true));
		  } catch (error) {
			console.error('Error fetching data: ', error);
		  }
		};
	//   for clicking to change button color 
	const [activationStates, setActivationStates] = useState([]);
	//for soft delete
	const handleSoftDelete = async (Projectid,index) => {
		try {
		  await axios.put(`http://localhost:8000/api/project_info/delete/${Projectid}`);
		const newActivationStates = [...activationStates];
		newActivationStates[index] = false; // Deactivate button clicked, hide it for this row
		setActivationStates(newActivationStates);
		//   alert("Deactivated successfully")
		  // Handle success, e.g., show a message or update UI
		  const tr = document.getElementsByTagName('tr')[index];
		  if (!tr) return; // Check if the row exists
		   const tds = document.getElementsByTagName('td');
		   if (!activationStates) {
		  //   document. document.getElementsByTagName('td').style.backgroundColor = 'green'; // Set background color to gray for deactivated data
			 for (let i = 0; i < tds.length; i++) {
			  tds[i].style.filter = 'blur(2px)';
			 }
		  }
		} catch (error) {
		  console.error('Error soft deleting project:', error);
		  // Handle error
		}
	  }
	//cancel soft delete
	const cancelSoftDelete = async (Projectid,index) => {
		try {
		  await axios.put(`http://localhost:8000/api/project_info/canceldelete/${Projectid}`);
	     // Activate button clicked, hide it
		  // Handle success, e.g., show a message or update UI
		  const newActivationStates = [...activationStates];
         newActivationStates[index] = true; // Activate button clicked, hide it for this row
         setActivationStates(newActivationStates);
		//   alert("Activated successfully")
		} catch (error) {
		  console.error('Error soft deleting project:', error);
		  // Handle error
		}
	  }
	  
	function downloadCSV(data) {
		const csvContent = "data:text/csv;charset=utf-8," 
		  + data.map(row => Object.values(row).join(',')).join('\n');
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "data.csv");
		document.body.appendChild(link);
		link.click();
	  }
	  //for download all data
	 const downloadAllCSV = () => {
        downloadCSV(data);
    };
	// const showToastMessage = () => {
	// 	toast.success("Deactivated !", {
	// 	  position: toast.POSITION.TOP_LEFT,
	// 	});
	//   }
	//for alert msg
	const notify1 = () => toast.error("Deactivated successfully",{ transition: Zoom});

	const notify2= () => toast.success("Activated successfully");
	

	// for  table blurring
	const [showTab1, setShowTab1] = useState(true);
	const toggleTabs = () => {
		setShowTab1(!showTab1);
	  };
	 
	return (
		 <>
		
		 <button id='taskbtn' onClick={toggleTabs}>Dailytask</button>
		 {/* <span id= 'p'>Project Details</span> */}
		<button onClick={downloadAllCSV} id='down-all' style={{ filter: showTab1 ? 'blur(0px)' : 'blur(20px)' }}><BsCloudDownload  size={35}style={{
      color: "#54ec7a"
    }}/></button>
		<div id="tab1"style={{ filter: showTab1 ? 'blur(0px)' : 'blur(20px)' }}>
		
			
			<table>
				<thead>
					<tr>
					<th id='thh'>Project ID</th>
					<th id='thh'>Project Title</th>
					<th id='thh'>Description</th>
					<th id='thh'>Team members</th>
					<th id='thh'>startdate</th>
					<th id='thh'>deadline</th>
					<th id='thh'>Teck Stack</th>
					{/* <th id='thh'>Files</th> */}
					<th id='thh'>Deactivate/Activate</th>
					
					<th id='thh'><IoCloudDownloadOutline size={35}/></th>
					</tr>
				</thead>
				<tbody>
				{
					data.map((obj,Index)=>(
						<tr id='trr' key={obj.Projectid}>
							<td id='tdd'>{obj.Projectid}</td>
							<td id='tdd'>{obj.Title}</td>
							<td className='des'id='tdd'>{obj.Description}</td>
							<td id='tdd'>{obj.Team}</td>
							<td id='tdd'>{obj.Startdate}</td>
							<td id='tdd'>{obj.Deadline}</td>
							<td id='tdd'>{obj.Tools}</td>
							{/* <td id='tdd'>{obj.Files}</td> */}
							
							 {activationStates[Index] ? (
                              <td id='tdd'>
                             {/* <button id="deac-btn1" onClick={() => handleSoftDelete(obj.Projectid, Index)}>Deactivate</button> */}
							 <button id="deac-btn1" onClick={() => { handleSoftDelete(obj.Projectid, Index); notify1(); }}>Deactivate</button>
							 
							  </td>
                             ) : (
                             <td id='tdd'>
                            <button id="deac-btn2" onClick={() => {cancelSoftDelete(obj.Projectid, Index); notify2(); }}>Activate</button>
                            
							 </td>
							 
                             )}
							<td><button onClick={() => downloadCSV([obj])} id='down-btn1'><BsDownload size={25} style={{
      color: "#2f9b2f"
    }}/></button></td>

							
						
						</tr>
					
						
					))
					
			}
                 
					
					
				</tbody>
			</table>
			
			
		
		</div>
		{/* taskDetails table */}
		<div id="tab"  style={{ display: showTab1 ? 'none' : 'block' }}>
		
			
			<table>
				<thead>
					<tr>
					<th id='thhh'>Date and Time</th>
					<th id='thhh'>Dailytask</th>
				
					{/* <th id='thh'>Deactivate/Activate</th> */}
					
					<th id='thhh'><IoCloudDownloadOutline size={26}/></th>
					</tr>
				</thead>
				<tbody>
				{
					taskData.map((obj)=>(
						<tr id='trrr' key={obj.ID}>
							<td id='tddd'>{obj.Date}</td>
							<td id='tddd'>{obj.Dailytask}</td>
							{/* <td id='tdd'>{obj.Files}</td> */}
							
							 {/* {activationStates[Index] ? (
                              <td id='tdd'>
							 <button id="deac-btn1" onClick={() => { handleSoftDelete(obj.Projectid, Index); notify1(); }}>Deactivate</button>
							 
							  </td>
                             ) : (
                             <td id='tdd'>
                            <button id="deac-btn2" onClick={() => {cancelSoftDelete(obj.Projectid, Index); notify2(); }}>Activate</button>
                            
							 </td>
							 
                             )} */}
							<td><span onClick={() => downloadCSV([obj])} id='down-btn2'><BsDownload size={25} style={{
      color: "#2f9b2f"
    }}/></span></td>

							
						
						</tr>
					
						
					))
					
			}
                 
					
					
				</tbody>
			</table>
			
			
		
		</div>
		</>
	);
};

export default Admin;
