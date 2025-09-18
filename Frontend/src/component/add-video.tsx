import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CategoryContract } from "../contracts/CategoryContract";
import { Backend_url } from "../util";

export function AddVideo(){

    let navigate = useNavigate();

     const [categories, setCategories] = useState<CategoryContract[]>();

 const formik = useFormik({
       initialValues: {
        video_id : 0,
        title: '',
        description:'',
        Comments:'',
        likes:0,
        views:0,
        url:'',
        category_id:0
       },
       onSubmit : (video) => {
        axios.post(`${Backend_url}/add-video`, video)
        .then(()=>{
            console.log('video added');
        })
        alert('Video Added Successfully..');
        navigate('/admin-deshboard');
       }
 })

 useEffect(()=>{
   axios.get(`${Backend_url} /get-categories`)
   .then(response=> {
    response.data.unshift({category_id:-1, category_name:'Select Category'});
    setCategories(response.data);
    })
 },[])

    return(
        <div>
          <h2>Add Video</h2>                
          <form onSubmit={formik.handleSubmit}> 
          <dl className="row">
            <dt className="col-2">Video Id</dt>
            <dd className="col-10"><input type="number" name="video_id" onChange={formik.handleChange}/></dd>
            <dt className="col-2">Title</dt>
            <dd className="col-10"><input type="text" name="title" onChange={formik.handleChange}/></dd>
            <dt className="col-2">Description</dt>
            <dd className="col-10"><input type="text" name="description" onChange={formik.handleChange}/></dd>
            <dt className="col-2">Comments</dt>
            <dd className="col-10"><input type="text" name="comments" onChange={formik.handleChange}/></dd>
            <dt className="col-2">URL</dt>
            <dd className="col-10"><input type="text" name="url" onChange={formik.handleChange}/></dd>
            <dt className="col-2">Likes</dt>
            <dd className="col-10"><input type="number" name="likes" onChange={formik.handleChange}/></dd>
            <dt className="col-2">Views</dt>
            <dd className="col-10"><input type="number" name="views" onChange={formik.handleChange}/></dd>
            <dt className="col-2">Category</dt>
            <dd className="col-10 ">
                <select className="btn btn-primary" name="category_id" onChange={formik.handleChange}> 
                  {
                  categories?.map(category=>
                    <option key={category.category_id} value={category.category_id}> {category.category_name} 
                    </option>
                  )
                  } 
                  </select>
            </dd>
          </dl>
          <button className="btn mx-2 btn-primary" type="submit">Add Video</button>
           <Link to="/admin-deshboard" className="btn btn-warning">Cancel</Link>
          </form>
           </div>
    )
}