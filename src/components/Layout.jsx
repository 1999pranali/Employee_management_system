import React, {Fragment, useState} from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from './Main/Sidebar';
import Header from './Main/Header';
 
const Layout = () =>{
    const [sidebarshow, setSideBarShow] = useState(false);
    const toggleNav = () => {
      setSideBarShow(current => !current);
    };
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
