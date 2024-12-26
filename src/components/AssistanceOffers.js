import Layout from "./Layout";
import * as React from 'react';
import { Stack } from '@mui/material';
import BackCard from "./BackCard";

function AssistanceOffers() {
    const content = (
        <>
            <Stack spacing={3} marginTop={3} alignItems="center">
                <BackCard/>
            </Stack>
        </>   
    );

    return (
        <Layout content={content}/>
    );
}

export default AssistanceOffers;