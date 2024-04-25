import { Link } from 'react-router-dom'
function Navigate(){
    return <>
      <div id="reg">
            {/* <button><Link to="./projectdetails" classname="btn2"><button id='reg-btn'>Form</button></Link></button> */}
            <Link to="/projectdetails" id='btnn'><button class="cta">
             <span>Get Started</span>
               <svg width="15px" height="10px" viewBox="0 0 13 10">
                   <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                   </button></Link>
           
        </div>
    </>

}
export default Navigate;