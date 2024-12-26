import Layout from "./Layout";
import React, { useState, useEffect } from "react";
import { Box, Stack, Divider, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { Directions as DirectionsIcon, Search as SearchIcon, CorporateFare as CorporateFareIcon, Emergency as EmergencyIcon} from "@mui/icons-material";

function Home() {
  const [homePageTranslations, setHomePageTranslations] = useState({"home_heading":"", "nav_directions":"", "nav_assistance":"", "nav_search":"", "nav_emergency":""});

  useEffect(() => {
    // Fetch data from API
    fetch("https://hikiju.de/translation/de/home")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data
        setHomePageTranslations(data);
      })
      .catch((error) => console.error("Error when loading data:", error));
  }, []);

  const content = (
    <>
      <Box mt={10}>
        <Typography gutterBottom variant="h4" component="div">
          {homePageTranslations["home_heading"]}
        </Typography>
      </Box>
      <Box mt={5}>
        <Stack spacing={5} alignItems={"center"}>
            <Card sx={{ backgroundColor: " #4caf50", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="/directions">
                <CardContent>
                  <Typography variant="h5"><DirectionsIcon />{homePageTranslations["nav_directions"]}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ backgroundColor: " #1976d2", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="/assistance">
                <CardContent>
                  <Typography variant="h5"><CorporateFareIcon />{homePageTranslations["nav_assistance"]}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ backgroundColor: " #ffb300", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="/search">
                <CardContent>
                  <Typography variant="h5"><SearchIcon />{homePageTranslations["nav_search"]}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Divider/>
            <Card sx={{ backgroundColor: " #d32f2f", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="tel:110">
                <CardContent>
                  <Typography variant="h5"><EmergencyIcon />{homePageTranslations["nav_emergency"]}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </Stack>
      </Box>
    </>
  );

  return (
    <Layout content={content}/>
  );
}

export default Home;