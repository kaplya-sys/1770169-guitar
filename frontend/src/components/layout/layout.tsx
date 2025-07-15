import {Outlet} from 'react-router-dom';

import {Header} from '../header';
import {Footer} from '../footer';


export const Layout = () => (
  <div className="wrapper">
    <Header/>
    <main className="page-content">
      <Outlet />
    </main>
    <Footer/>
  </div>
);
