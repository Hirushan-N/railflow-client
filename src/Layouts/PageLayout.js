// layout/Page.js
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
// import ScrollCircle from '../Components/CommonComponents/ScrollCircle';

const WebLayout = ({ children, title, removemargin }) => {
    return (
        <div className=''>
            {/* <ScrollCircle /> */}
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Navbar />
            {children}
            <Footer removemargin={removemargin} />
        </div>
    );
};


export default WebLayout;