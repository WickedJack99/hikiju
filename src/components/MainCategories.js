import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Stack, Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
import BackCard from "./BackCard";
import MUIIconFactory from "./MUIIconFactory";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function MainCategories() {
  const { t } = useTranslation();
  const language = i18n.language;
  function getTranslation(key) {
      return t(language + '.' + key + '.translation');
  }
  
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const handleCardClick = (category) => {
    navigate(`/category/${category.name}`, {state: category})
  };

  useEffect(() => {
    // Fetch questions data from API
    fetch("https://hikiju.de/questions")
      .then((response) => response.json())
      .then((data) => {
        // Filter questions where "is_first": true
        const mainCategories = data.filter((item) => item.is_first === true);
        setCategories(mainCategories);
        console.log(mainCategories);
      })
      .catch((error) => console.error("Error when loading data:", error));
  }, []);

  return (
    <Stack spacing={3} marginTop={3} alignItems="center">
      <Typography variant="h4" gutterBottom>
        {getTranslation('main_categories_heading')}
      </Typography>
      
      {categories.map((category) => (
        <Card key={category.id} sx={{ backgroundColor: category.color, width: '80%', borderRadius: '8px', boxShadow: 3, cursor: 'pointer'}} onClick={() => handleCardClick(category)}>
          <CardActionArea>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Ensure the icon is centered vertically with the text */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MUIIconFactory name={category.name} />
              </Box>
              <Typography variant="h5" sx={{ marginLeft: 1 }}>
                {getTranslation(category.name)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <BackCard/>
    </Stack>
  );
}

export default MainCategories;
