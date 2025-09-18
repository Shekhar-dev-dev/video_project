import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Backend_url } from "../util";

 export function UserRegister(){
     
    const [userMsg,setuserMsg] = useState('');
    const [userColor,setUserColor] = useState('');

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          user_id: '',
          user_name: '',
          password:'',
          email:'',
          mobile:''
        },
        onSubmit : (user) => {
            axios.post(`${Backend_url}/register-user`, user)
            .then(()=>{
               console.log(`Registered`);
            })
            alert('Registered');    
            navigate('/user-login');
        }
    })

     function VerifyUser(e:any){
   axios.get(`${Backend_url}/get-users`)
   .then(response=> {
    for(var user of response.data){
        if(user.user_id===e.target.value){
          setuserMsg('User Id Taken - Tyr Another');
          setUserColor('text-danger');
          break;
        }
        else{
            setuserMsg('User Id Available');
            setUserColor('text-primary');
        }
    }
   })
     }

     function handleOnBlur(){
        setuserMsg('');
     }
 
    return(
        <div>
           <h2>Register User</h2>
           <form onSubmit={formik.handleSubmit}> 
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" required onBlur={handleOnBlur} onKeyUp={VerifyUser} onChange={formik.handleChange} name="user_id" /></dd>
                <dd className={userColor}>{userMsg}</dd>
                 <dt>User Name</dt>
                <dd><input type="text" required onChange={formik.handleChange} name="user_name" /></dd>

                 <dt>Password</dt>
                <dd><input type="password" required onChange={formik.handleChange} name="password" /></dd>
                 <dt>Email</dt>
                <dd><input type="email" required onChange={formik.handleChange} name="email" /></dd>
                 <dt>Mobile</dt>
                <dd><input type="text" required onChange={formik.handleChange} name="mobile" /></dd>
           </dl>
           <button type="submit" className="btn btn-primary">Register</button>
           <div className="mt-3">
           <Link to="/user-login"> Existing user? </Link>
           </div>
           </form>
        </div>
      )
 }