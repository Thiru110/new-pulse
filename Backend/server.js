require("dotenv").config();
const express = require("express");
const db = require("./app/node-mysql-server/db-con");
const server= express();
const cors = require("cors");

server.use(cors());
// server.use(cors({
//   origin: 'http://localhost:3000'
// }));
server.use(express.json());
// const { GenericResponse, ResponseStatus } = require("./GenericResponse");
// const ErrorMessage = require("./ErrorMessage");
const swaggerui = require("swagger-ui-express");
const swaggerDocument = require("./app/SwaggerSpecs/swagger.json");
// const  swaggerJsDoc= require("swagger-jsdoc");

// const authRouter = require("./app/routes/auth");
// app.use("/",authRouter)

const routePath = require("./app/controllers/routes/auth");

// !  FOR CREATE
server.use("/user/create", routePath);
// !  FOR LOGIN
server.use("/user/login", routePath);
// !  FOR AUTH
server.use("/", routePath);
// !  FOR RESET PASS
server.use("/user/reset", routePath);

// !  FOR FORGOTPASS
server.use("/user/forgot", routePath);

// !  FOR CLEAR ALL THE ENTRIES(FOR CHECKING)
server.use("/user/clear", require("./app/routes/path"));

// /auth--
// const options = {
//   definition:{
//     openapi:"3.0.0",
//     info:{b
//       title:"Attendance API",
//       Version: "1.0.0",
//       description:"To Manage the Employee attendance."
//     },
//     servers:[
//       {
//         url: "http://localhost:8000"
//       }
//     ],
//   },
//   apis:["./routes/*.js"]
// }
// const specs = swaggerJsDoc(options)

server.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));
// *  IN THIS LINE CORS IS USED TO PASS THE DATA TO REACT

// *  THIS IS IMPORTANT ONE FOR API CATCH

// !  FETCH ALL
server.get("/user/fetch", (req, res) => {
  const sql = "SELECT * FROM appuser";
  db.query(sql, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data);
  });
});

// !    FOR RESEST PASSWORD THROUGH THE LINK
const port = 8000;
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
///use case backend code///
// Soft delete project details by ID
server.put("/api/project_info/delete/:Projectid", (req, res) => {
    const projectId = req.params.Projectid;
    
    const sql = "UPDATE project_info SET is_deleted = 1 WHERE Projectid = ?";
    db.query(sql, [projectId], (error, result) => {
      if (error) {
        console.error('Error soft deleting project details:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Project details soft deleted successfully' });
    });
  });
// Cancel Soft delete project details by ID
server.put("/api/project_info/canceldelete/:Projectid", (req, res) => {
    const projectId = req.params.Projectid;
    
    const sql = "UPDATE project_info SET is_deleted = 0 WHERE Projectid = ?";
    db.query(sql, [projectId], (error, result) => {
      if (error) {
        console.error('Error soft deleting project details:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Project details soft deleted successfully' });
    });
  });
//creating record

//post(updated)
server.post("/project_infos",(req,res)=>{
    const sql="INSERT INTO project_info (`Title`,`Email`,`Description`,`Team`,`Startdate`,`Deadline`,`Tools`,`Files`) Values (?)";
    let details = [
        req.body.Title,
        req.body.Email,
        req.body.Description,
        req.body.Team,
        req.body.Startdate,
        req.body.Deadline,
        req.body.Tools,
        req.body.Files,
        

]
    //execute query
   
   db.query(sql,[details],(error,data)=>{
        if(error){
            console.log(error);
           
        }
        else{
            console.log("hi");
            return res.json(data);
        }

    });
});
//below code for posting a date and taskdetails
server.post("/taskdetails", (req, res) => {
    const { taskDetails } = req.body;
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const query = 'INSERT INTO taskdetails (Date, Dailytask) VALUES (?, ?)';
    db.query(query, [currentDate, taskDetails], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Failed to add task' });
        return;
      }
      console.log('Task added successfully');
      res.status(200).json({ message: 'Task added successfully' });
    });
  });
//(updated)for view the records and get the data in database
server.get("/project_info",(req,res) => {
    const sql="SELECT * FROM project_info"
    db.query(sql,function(error,result){
        if(error){
            return res.json(error);

        }
        else{
            return res.json(result);

        }
    })
});
//for getting all details from from task details
server.get("/project_info1",(req,res) => {
  const sql="SELECT * FROM taskdetails"
  db.query(sql,function(error,result){
      if(error){
          return res.json(error);

      }
      else{
          return res.json(result);

      }
  })
});
//for getting single value based on id
server.get("/project_info/:Projectid", (req, res) => {
    let personID = req.params.Projectid;
    let query=`SELECT * FROM project_info WHERE Projectid in (?) AND  is_deleted=0`;//`SELECT * FROM project_info WHERE Projectid =${personID}`
   
    db.query(query,personID, (err, results) => {
        if (err) {
          console.error('Error querying MySQL database:', err);
          res.json({ error: 'Internal server error' });
          return;
        }
        // Check if person exists
if (results.length === 0) {
    res.json({ error: 'Person not found' });
    return; 
  }

  // Person found, send person data in response
  res.json(results[0]);
});

});
////for getting single value based on project-title ( /projectdetails/:Project_Title)
server.get("/projectdetails/:Project_Title", (req, res) => {
    let title = req.params.Project_Title;
    let query=`SELECT * FROM projectdetails WHERE Project_Title=${title}`;
   
    db.query(query,(err, results) => {
        if (err) {
          console.error('Error querying MySQL database:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        // Check if person exists
if (results.length === 0) {
    res.status(404).json({ error: 'Person not found' });
    return; 
  }

  // Person found, send person data in response
  res.json(results[0]);
});

});
// app.get('/projectdetails/:Project_Title', (req, res) => {
//     const { Project_Title } = req.params;
//     const project = projectdetails.find(pro => pro.Project_Title === Project_Title);
  
//     if (project) {
//       res.json(project);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   });
// Update data in the database
// Update data route
server.put('/api/update/:id', (req, res) => {
  const projectId = req.params.id;
  const editedData = req.body;
  // Changing date format correct
  if(editedData.Startdate){
    const startdate=new Date(editedData.Startdate);
    editedData.Startdate=startdate.toISOString().split('T')[0];//format yyyy-mm-dd
  }
  if(editedData.Deadline){
    const deadline=new Date(editedData.Deadline);
    editedData.Deadline=deadline.toISOString().split('T')[0];//format yyyy-mm-dd
  }
  // Update the corresponding row in the database
  db.query('UPDATE project_info SET ? WHERE Projectid = ?', [editedData, projectId], (error, results) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Error updating data in the database');
      return;
    }
    res.status(200).send('Data updated successfully');
  });
});