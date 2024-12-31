import Layout from "./Layout";
import * as React from 'react';
import { Stack } from "@mui/material";
import { useTranslation } from 'react-i18next';
import BackCard from "./BackCard";

function Imprint() {
    const { t } = useTranslation();
    const language = localStorage.getItem('i18nLanguage');
    function getTranslation(key) {
        return t(language + '.' + key + '.translation');
    }

    const content = (
        <>
            <Stack spacing={3} marginTop={3} alignItems="center">
                {getTranslation('imprint')}
                <BackCard/>
            </Stack>
        </>   
    );

    return (
        <Layout content={content}/>
    );
}

export default Imprint;