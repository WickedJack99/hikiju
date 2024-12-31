import BackCard from "./BackCard";
import Layout from "./Layout";
import * as React from 'react';

function Contact() {
    const content = (
        <>
            <BackCard/>
        </>   
    );

    return (
        <Layout content={content}/>
    );
}

export default Contact;