import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea, Stack, Box } from '@mui/material';
import Layout from "./Layout";
import BackCard from "./BackCard";
import MUIIconFactory from "./MUIIconFactory";
import { useTranslation } from 'react-i18next';

function SubCategories() {
    const { t } = useTranslation();
    const language = localStorage.getItem('i18nLanguage');

    function getTranslation(key) {
        return t(language + '.' + key + '.translation');
    }

    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state; // Props von der vorherigen Seite
    const [subCategories, setSubCategories] = useState([]);

    // Card-Klickhandler
    const handleCardClick = (subcategory) => {
        if (subcategory.is_last === 1) {
            navigate(`/solution/${subcategory.name}`);
        } else {
            navigate(`/category/${subcategory.name}`, { state: subcategory });
        }
    };

    function isValidJSON(string) {
        try {
            JSON.parse(string);
            return true;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        if (!category?.linked_questions) return;
        
        let linkedQuestions = null;
        // Parse linked_questions (if it's a JSON string)
        if (isValidJSON(category.linked_questions)) {
            linkedQuestions = JSON.parse(category.linked_questions);
        } else {
            linkedQuestions = category.linked_questions;
        }
        
        // Fetch all questions and update state in a single batch
        Promise.all(
            linkedQuestions.map((element) =>
                fetch(`https://hikiju.de/question/${element}`)
                    .then((response) => response.json())
            )
        )
            .then((data) => {
                // Update state with fetched data in one go
                setSubCategories(data);
            })
            .catch((error) => console.error("Error when loading data:", error));
    }, [category]);
    

    // Kategorie nicht gefunden
    if (!category) {
        return <Typography>Category not found</Typography>;
    }

    const content = (
        <Stack spacing={3} marginTop={3} alignItems="center">
            {subCategories.map((subCategory) => (
                <Card
                    key={subCategory.name}
                    sx={{
                        backgroundColor: category.color,
                        width: '80%',
                        borderRadius: '8px',
                        boxShadow: 3,
                        cursor: 'pointer'
                    }}
                    onClick={() => handleCardClick(subCategory)}
                >
                    <CardActionArea>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MUIIconFactory name={subCategory.name} />
                            </Box>
                            <Typography variant="h5" sx={{ marginLeft: 1 }}>{getTranslation(subCategory.name)}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
            <BackCard/>
        </Stack>
    );

    return <Layout content={content} />;
}

export default SubCategories;
