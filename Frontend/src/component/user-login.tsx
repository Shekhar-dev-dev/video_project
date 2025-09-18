import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate,Link } from "react-router-dom";

import { Backend_url } from "../util";
 
 export function UserLogin(){

    const [, setCookie, ] = useCookies(['userid']);

    let navigate = useNavigate();

       const formik = useFormik({
        initialValues: {
            user_id : '',
            password: ''
        },
        onSubmit : (user)=>{
            axios.get(`${Backend_url}/get-users`)
            .then (response => {
             let result = response.data.find( (item:any) => item.user_id===user.user_id);
            console.log(result);
             if (result)  {
                if(result.password===user.password){
                    setCookie('userid', user.user_id);
                    navigate('/user-deshboard');

                } else{
                    alert(`invalid Password`);
                }
             } else{
               navigate('/user-login-error');
             }
            })
        }
      })

      return(
        <div>
           <h2>User Login</h2>
           <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" name="user_id" onChange={formik.handleChange} /></dd>
                <dt>Password</dt>
                <dd><input type="password" name="password" onChange={formik.handleChange} /></dd>
            </dl>
            <button type="submit" className="btn btn-warning">Login</button>
           </form>
         <div className="mt-3">
               <Link to="/user-register"> Create New Account </Link>
        </div>
        </div>
      )
 }