import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { CategoryContract } from "../contracts/CategoryContract";
import type { VideoContract } from "../contracts/VideoContract";
import { Backend_url } from "../util";


export function DeleteVideo(){

    const [, setCategories] = useState<CategoryContract[]>();

     const[videos,setVideos] = useState<VideoContract[]>([{video_id:0, title:'', description:'', url:'', comments:'', views:0, likes:0, category_id:0}]);

     let navigate = useNavigate();

     let params = useParams();

 
 function LoadCategories(){
  axios.get(`${Backend_url}/get-categories`)
   .then(response=> {
    response.data.unshift({category_id:-1, category_name:'Select Category'});
    setCategories(response.data);
    })
 }
  
  function LoadVideos(){
    axios.get(`${Backend_url}/get-video/${params.id}`)
    .then(response => {
      setVideos(response.data);
    })
  }


 useEffect(()=>{
   LoadCategories();
  LoadVideos();
 },[])

 function handleDeleteClick(){
  axios.delete(`${Backend_url}/delete-video/${params.id}`)
  .then(()=>{
    console.log('deleted');
  })
  alert('Video Deleted');
  navigate('/admin-deshboard');
 }

    return(
        <div>
          <h2>Delete Video</h2>
          <h4>Are you sure?</h4>
          <dl>
            <dt>Title</dt>
            <dd>{videos[0].title}</dd>
            <dt>Preview</dt>
            <dd>
              <iframe src={videos[0].url} width={300} height={200}></iframe>
            </dd>
          </dl>
          <button onClick={handleDeleteClick} className="btn btn-danger">Yes</button>
          <Link to="/admin-deshboard" className="btn btn-warning mx-2">NO</Link>
        </div>
    )
}