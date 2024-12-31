import { Box, Typography, Link, Container } from '@mui/material'; // MUI-Komponenten importieren
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const language = localStorage.getItem('i18nLanguage');

  function getTranslation(key) {
    return t(language + '.' + key + '.translation');
  }

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed', // Fixiert den Footer am unteren Bildschirmrand
        bottom: 0, // Setzt den Footer am unteren Rand
        left: 0, // Stellt sicher, dass der Footer die gesamte Breite einnimmt
        width: '100%', // Footer soll die gesamte Breite einnehmen
        backgroundColor: (theme) => theme.palette.background.default, // Hintergrundfarbe passt sich Darkmode an
        color: (theme) => theme.palette.text.primary, // Textfarbe passt sich an
        py: 3, // Padding
        mt: 5, // Margin-top, damit der Footer nicht direkt am Inhalt ist
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          &copy; {getTranslation('footer_meldung')}
        </Typography>
        <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
          <Link href="/imprint" color="inherit" sx={{ mx: 2 }}>
            {getTranslation('footer_impressum')}
          </Link>
          <Link href="/data_protection" color="inherit" sx={{ mx: 2 }}>
            {getTranslation('footer_datenschutz')}
          </Link>
          <Link href="/contact" color="inherit" sx={{ mx: 2 }}>
            {getTranslation('footer_kontakt')}
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
