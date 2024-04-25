import { useState,useEffect,useCallback} from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
function User(){
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState('');
  
    
   
      //transfer data to  backend
  const searchId = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/project_info/${userId}`);//http://localhost:3000/projectdetails/:ID
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    
    } catch (error) {
      console.error(error);
    }
},[userId]);
  useEffect(() => {
    if (userId !== '') {
      searchId();
    }
  }, [userId,searchId]);
//UPADTE INPUT value using usestate
  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  //  
  //for project-title to get user data  
  
    const [projectData, setProjectData] = useState(null);
    const [projectTitle, setprojectTitle] = useState('');
    ///use effect
    const searchProjectTitle = useCallback(async () => {
      try {
        const response = await fetch(`http://localhost:8000/projectdetails/${projectTitle}`);//http://localhost:3000/projectdetails/:ID
        if (!response.ok) {
          throw new Error("failed  to fetch");
       
        }
        const ans = await response.json();
        setProjectData(ans);
      } catch (error) {
        console.log(error);
      }
  },[projectTitle]);
    useEffect(() => {
      if (projectTitle !== '') {
        searchProjectTitle();
      }
    }, [projectTitle,searchProjectTitle]);
    
    //handlechange for title
    const handleChange1 = (event) => {
      setprojectTitle(event.target.value);
    };
    console.log(projectData)
    //edit
    const [editMode, setEditMode] = useState(false);
    //for after edit
    const [editedData, setEditedData] = useState({});
    //for handle edit
    const handleEdit = (userData) => {
      setEditedData(userData);
      setEditMode(true);
    };
   
    const handleChanges = (e) => {
      const { name, value } = e.target;
      setEditedData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    //for submit success
    const [success, setSuccess] = useState(false);
    //save changes
    const saveChanges = async () => {
      try {
        await axios.put(`http://localhost:8000/api/update/${editedData.Projectid}`,editedData);
        setEditMode(false);
        setSuccess(true)
        alert ("changed succesfully")
        console.log("success")
        // Optionally, update the UI to reflect the changes
      } catch (error) {
        console.log('Error updating data:', error);
        console.log(editedData)
      }
      
    };
    //call
  //   function downloadCSV(data) {
  //     const csvContent = "data:text/csv;charset=utf-8," 
  //       + data.map(row => Object.values(row).join(',')).join('\n');
  //     const encodedUri = encodeURI(csvContent);
  //     const link = document.createElement("a");
  //     link.setAttribute("href", encodedUri);
  //     link.setAttribute("download", "data.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     }
  //   //download csv  data in format
  //   const downloadDataCSV = () => {
  //     downloadCSV(userData);//this calling upper class
  // };
  const downloadCSV = (data) => {
    if (!Array.isArray(data)) {
        console.error("Data is not in the expected format.");
        return;
    }

    if (data.length === 0) {
        console.warn("No data available to download.");
        return;
    }

    const csvContent = "data:text/csv;charset=utf-8," 
        + data.map(row => Object.values(row).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup
};

// Function to handle downloading CSV data for userData
const downloadDataCSV = () => {
    if (userData) {
        downloadCSV(userData);
    } else {
        console.error("No data available to download.");
    }
};


    return <>
    <div  className={`cont ${editMode ? 'blur-background' : ''}`}>
        <div>
          {/* <span id="emp-det">Your Details</span> */}
        </div>
      
        
      
        <input type="text" id="user-ID" placeholder="Project-ID" value={userId} name='ID' onChange={handleChange}/>
        <CiSearch id="search-icon"/>
        <br></br>
        <br></br>

     </div>
     


     <div id="tab-user">
     {editMode ? (
        <div id="box">
          {/* Display input fields for editing */}
          {/* <span id="edit-logo">Edit</span> */}
          <form id="f">
          <label id="titlee">Title</label>
          <input id="edit-title" type="text" name="Title" value={editedData.Title} onChange={handleChanges} />
          <br></br>
          <label id="des">Description</label>
          <input id="edit-des" type="text" name="Description" value={editedData.Description} onChange={handleChanges} />
          <br></br>
          <label id="team">Team</label>
          <input id="edit-team" type="text" name="Team" value={editedData.Team} onChange={handleChanges} />
          <br></br>
          {/* <input type="text" name="Startdate" value={editedData.Startdate} onChange={handleChanges} />
          <input type="text" name="Deadline" value={editedData.Deadline} onChange={handleChanges} /> */}
           <label id="tools">Tools</label>
          <input  id="edit-tools" type="text" name="Tools" value={editedData.Tools} onChange={handleChanges} />
          <br></br>
          <button  id="sub2" onClick={saveChanges}>Save</button>{success && <span>submitted</span>}
          <span id="back-btn" onClick={() => setEditMode(false)}><IoArrowBack size={20} style={{color:" #4f4f52"}}/></span>
          <br></br>
          
          </form>
        </div>
      ) : (
        <table id="table">
        <thead>
					<tr>

					<th id="th">Project Title</th>
					<th id="th">Team members</th>
					<th id="th">Description</th>
					<th id="th">Project_startdate</th>
					<th id="th">Project_deadline</th>
					<th id="th">Tools used</th>
				
          <th id="th">Edit</th>
					</tr>
				</thead>
                <tbody>

            {/* {userData.map((rowData) => (
              <tr key={rowData.Projectid}>
                <td>{rowData.Title}</td>
                <td>{rowData.Description}</td>
                <td>{rowData.Team}</td>
                <td>{rowData.Startdate}</td>
                <td>{rowData.Deadline}</td>
                <td>{rowData.Tools}</td>
                <td><button onClick={() => handleEdit(rowData)}>Edit</button></td>
              </tr>
            ))} */}
                {
                    userData && (
                        <tr>
                          <td id="td">{userData.Title}</td>
                          <td id="td"> {userData.Description}</td>
                          <td id="td"> {userData.Team}</td>
                          <td id="td">{userData.Startdate}</td>
                          <td id="td">{userData.Deadline}</td>
                          <td id="td"> {userData.Tools}</td>
                        <span id="edit" onClick={() => handleEdit(userData)}><MdEdit  size={20} style={{color:" rgb(97, 94, 94)"}}/></span>
                         
                          </tr>
                      )}
                      
                       </tbody>
                       
        </table>
      )}
      {/* <button onClick={downloadDataCSV} id='down-all'>Download All</button> */}
       
      
                
     </div>
    
 
 
     </>
 
 }

 export default User;