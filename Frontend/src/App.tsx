import './App.css'
import { BrowserRouter, Link, Route, Routes }  from "react-router-dom";
import { VideoLiblaryHome } from './component/video-library-home';
import { UserRegister } from './component/user-register';
import { UserLogin } from './component/user-login';
import { UserDeshBoard } from './component/user-deshboard';
import { UserLoginError } from './component/user-login-error';
import { AdminLogin } from './component/admin-login';
import { AdminDeshboard } from './component/admin-deshboard';
import { AddVideo } from './component/add-video';
import { EditVideo } from './component/edit-video';
import { DeleteVideo } from './component/delete-video';
function App() {
  

  return (
    <div className='container-fluid'>   
   
        <BrowserRouter>
         <header className='bg-dark text-white p-2'>
          <h1 className='text-center'> <Link to="/" className='btn btn-dark btn-lg'>Video Library</Link> </h1>
         </header>

         <section>
          <Routes> 
            <Route path='/' element={<VideoLiblaryHome/>}/>
            <Route path='user-register' element={<UserRegister/>}/>
             <Route path='user-login' element={<UserLogin/>}/>
              <Route path='user-deshboard' element={<UserDeshBoard/>}/>
               <Route path='user-login-error' element={<UserLoginError/>}/>
               <Route path='admin-login' element={<AdminLogin/>}/>
               <Route path='admin-deshboard' element={<AdminDeshboard/>}/>
               <Route path='add-video' element={<AddVideo/>}/>
               <Route path='edit-video/:id' element={<EditVideo/>}/>
               <Route path='delete-video/:id' element={<DeleteVideo/>}/>
          </Routes>
         </section>
        </BrowserRouter>

    </div>
  )
}

export default App
