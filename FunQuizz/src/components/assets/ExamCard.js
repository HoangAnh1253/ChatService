import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import Container from '@mui/material/Container';
import { ButtonBase, CardMedia, Chip } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Stack from '@mui/system/Stack';

const ExamCard = (props) => {
    const { exam } = props;
    return (
        <Card sx={cardStyle}>
        {/* <Box sx={{ height: '7px', backgroundColor: 'primary.se' }}></Box> */}
            <ButtonBase sx={{ color: 'primary.main' }}>
                <CardContent>
                    <Typography gutterBottom align="left" fontSize={12} color="text.secondary" sx={{ mb: 1 }}>
                        {exam.topic.name}
                    </Typography>

                    <Typography
                        gutterBottom
                        variant="h5"
                        align="left"
                        component="div"
                        sx={{ fontSize: 18, color: 'black', opacity: 0.8 }}
                    >
                        {exam.name}
                    </Typography>
                    <CardActions>
                        <Stack direction="row" marginTop={3}>
                            <QuestionMarkIcon fontSize="small" sx={{ color: 'red' }} />
                            <Typography component="div" color="text.secondary" sx={{ fontSize: 15, opacity: 0.8 }}>
                                {exam.question.length}
                            </Typography>
                            <AccessTimeFilledIcon fontSize="small" sx={{ color: 'orange', ml: 3 }} />
                            <Typography component="div" color="text.secondary" sx={{ fontSize: 15, opacity: 0.8 }}>
                                {exam.time} min
                            </Typography>
                        </Stack>
                    </CardActions>
                </CardContent>
            </ButtonBase>
        </Card>
    );
};

const cardStyle = {
    minWidth: 100, 
    boxShadow: 'rgba(33, 35, 38, 0.1) 10px 10px 10px -5px;'
}

export default ExamCard;
