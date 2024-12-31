import Layout from "./Layout";
import { Box, Stack, Divider, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { Directions as DirectionsIcon, Search as SearchIcon, CorporateFare as CorporateFareIcon, Emergency as EmergencyIcon} from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function Home() {
  const { t } = useTranslation();
  const language = i18n.language;

  function getTranslation(key) {
    return t(language + '.' + key + '.translation');
  }

  const content = (
    <>
      <Box mt={10}>
        <Typography gutterBottom variant="h4" component="div">
          {getTranslation('home_heading')}
        </Typography>
      </Box>
      <Box mt={5}>
        <Stack spacing={5} alignItems={"center"}>
            <Card sx={{ backgroundColor: " #4caf50", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="/directions">
                <CardContent>
                  <Typography variant="h5"><DirectionsIcon />{getTranslation('nav_directions')}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ backgroundColor: " #1976d2", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="/assistance">
                <CardContent>
                  <Typography variant="h5"><CorporateFareIcon />{getTranslation('nav_assistance')}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ backgroundColor: " #ffb300", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="/search">
                <CardContent>
                  <Typography variant="h5"><SearchIcon />{getTranslation('nav_search')}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Divider/>
            <Card sx={{ backgroundColor: " #d32f2f", width: '80%', borderRadius: '8px', boxShadow: 3}}>
              <CardActionArea href="tel:110">
                <CardContent>
                  <Typography variant="h5"><EmergencyIcon />{getTranslation('nav_emergency')}</Typography>
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