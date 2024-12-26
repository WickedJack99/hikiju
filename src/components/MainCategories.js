import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Stack, Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
import BackCard from "./BackCard";
import MUIIconFactory from "./MUIIconFactory";

function MainCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [mainCategoriesTranslations, setMainCategoriesTranslations] = useState({"main_categories_heading":""});

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

    // Fetch data from API
    fetch("https://hikiju.de/translation/de/main_categories")
      .then((response) => response.json())
      .then((data) => {
      // Set the fetched data
      setMainCategoriesTranslations(data);
      })
      .catch((error) => console.error("Error when loading data:", error));
  }, []);

  return (
    <Stack spacing={3} marginTop={3} alignItems="center">
      <Typography variant="h4" gutterBottom>
        {mainCategoriesTranslations["main_categories_heading"]}
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
                {category.translations.de}
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
