import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

function BackCard() {
    const [backPageTranslations, setBackPageTranslations] = useState({"back_button_text":""});
    
      useEffect(() => {
        // Fetch data from API
        fetch("https://hikiju.de/translation/de/back_pages")
          .then((response) => response.json())
          .then((data) => {
            // Set the fetched data
            setBackPageTranslations(data);
          })
          .catch((error) => console.error("Error when loading data:", error));
      }, []);

    const navigate = useNavigate();
    const content = (
        <>
          <Card
                sx={{
                    width: '80%',
                    borderRadius: '8px',
                    boxShadow: 3,
                    cursor: 'pointer',
                }}
                onClick={() => navigate(-1)} // Gehe zur vorherigen Seite
            >
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5" color="textSecondary">
                            {backPageTranslations["back_button_text"]}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>  
        </>   
    );

    return (
        content
    );
}

export default BackCard;

