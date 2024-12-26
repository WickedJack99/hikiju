import Layout from "./Layout";
import * as React from 'react';
import MainCategories from "./MainCategories";

function Directions() {
    const content = (
        <>
            <MainCategories/>
        </>   
    );

    return (
        <Layout content={content}/>
    );
}

export default Directions;