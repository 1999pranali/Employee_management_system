import React, {Fragment, useState, useEffect} from 'react';
import axios from "axios";
import {Outlet, useParams, useSearchParams} from 'react-router-dom';
import Sidebar from '../User/Sidebar';
import Header from '../User/Header';
import ls from 'localstorage-slim';

 
const Layout = () =>{
  ls.config.encrypt = true;
  const [searchparams]=useSearchParams();
  const [userData, setUserData] = useState();
    const [sidebarshow, setSideBarShow] = useState(false);
    const toggleNav = () => {
      setSideBarShow(current => !current);
    };
    useEffect(()=>{
      axios.get(`http://localhost:8080/api/auth/user/${searchparams.get("id")}`)
      .then(res => {
          console.log("user Data"+res)
          setUserData(res.data)
          ls.set('empId',res.data._id)
      })
    },[]);

    return(
        <Fragment>
            <div style={{display:'flex'}}>
            <div>
          <Sidebar sidebarshow={sidebarshow} />
        </div>
        <main className="w-full overflow-y-auto">
          <Header toggleNav={toggleNav}/>

                    <Outlet/>
                </main>
            </div>
        </Fragment>
    )
}

export default Layout
