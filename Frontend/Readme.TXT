we use node for creating the api for our application and i will explain the flow of our application is 
	first admin will enter with mannually entered credentials
	and then admin will create a credential for all the users
	after that user will logined with the credentials was given by the admin
	and there is a condition for rendering our main page if user is first time login we redirect to reset the password because user can't remember their password was give by the admin so they can reset their own password

after reset their password our main page will be redered

INNER WORK

FIRST REGISTER

Admin can create an account and if press the Register button it will send the req to the backend with the help of axios(url endpoint)-->data also passed in this url
after response handler i just add a toaster in react (sweetalert) and error handler 
and api will saved the email and password with hashed

LOGIN PAGE

Then user can enter their admin given credential when click (login button) it will handle by the form handler in the react-router-dom package
	*form handler has the function onSubmit this function is a async function that send req the url end point(that is server side) 
	
	WHY WE USE AXIOS: handling the http req. 
		-----PROMISE-BASED(Axios is a promise-based HTTP client, which makes it easy to handle asynchronous requests and responses with async/await syntax)This leads to cleaner and more readable code
	
		-----INTERCEPTORS(Axios allows you to intercept requests and responses before they are handled by then or catch. This is useful for implementing global request handling, automatic error responses, and even adding default headers like authentication tokens to every request without manually including them each time.)
		-----AUTOMATIC JSON DATA TRANSFORMATION----
 after click the login button select the user enter email from the db and ((it will compare the password enter))---TRUE-->
 												((// if the password comparison succeeds
            									// JWT token is generated it contains (user data and secret key))) 
												// returned to the client it contains the token

------>				if the loginuser function is a async function that handle the res promises with then and catch if status==success destruct the data , response, token from the returned data (set the token in localStorage)
												navigate to the main page.

MAIN PAGE

authentication the token in CheckToken is a function that send the req to the endpoint 
	that api will check the token headers jwt.verify the token if success return that object--useState setUser and user.RoleId==2 show the user info and another condition that is IsFirstLogin===1 modal open reset password  api req send 




///////////			summary
login click panathum email check and password hashed compare if success jwt token generate and return to the client and response of axios is success set the token in local storage and navigate to main page