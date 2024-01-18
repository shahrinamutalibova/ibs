import React, {lazy,Suspense} from "react";
import {Routes, Route} from 'react-router-dom';

const Home = lazy(() => import('../Layout/layout'));
const Dashboard = lazy(() => import('../components/dashboard'));
const Courses = lazy(() => import('../components/courses'));
const Blogs = lazy(() => import('../components/blogs'));
const Posts = lazy(() => import('../components/posts'));
const Videos = lazy(() => import('../components/videos'));
const Users = lazy(() => import('../components/users'));
const NotFound = lazy(() => import('../components/404'));


const Ui_Router = () =>{
    return (
        <Suspense fallback="Loading...">
            <Routes>
                <Route path={'/'} element={<Home/>}>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/courses'} element={<Courses/>}/> 
                    <Route path={'/blogs'} element={<Blogs/>}/> 
                    <Route path={'/posts'} element={<Posts/>}/> 
                    <Route path={'/videos'} element={<Videos/>}/> 
                    <Route path={'/users'} element={<Users/>}/> 
                    </Route>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Suspense>
    )
}

export default Ui_Router;