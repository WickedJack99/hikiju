import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function BackCard() {
    const { t } = useTranslation();
    const language = i18n.language;

    function getTranslation(key) {
        return t(language + '.' + key + '.translation');
    }

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
                            {getTranslation('back_button_text')}
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

