import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import Container from '@mui/material/Container';
import { CardMedia, Chip } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Stack from '@mui/system/Stack';

const ExamCard = (props) => {
    const { exam } = props;
    return (
        <Card sx={{ minWidth: 275 }}>
            {/* <Box sx={{ height: '7px', backgroundColor: 'primary.main' }}></Box> */}
            <CardContent>
                <Typography sx={{ mb: 1 }} gutterBottom color="text.secondary">
                    {exam.topic.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 18 }}>
                    {exam.name}
                </Typography>
                <Stack direction="row" marginTop={3} >
                    <QuestionMarkIcon fontSize="small" sx={{color: "red"}}/>
                    <Typography component="div" sx={{ fontSize: 15 }}>
                        {exam.question.length}
                    </Typography>
                    <AccessTimeFilledIcon fontSize="small" sx={{color: "orange", ml: 3}}/>
                    <Typography component="div" sx={{ fontSize: 15 }}>
                        {exam.time} min
                    </Typography>
                </Stack>
                <Typography
                    variant="body2"
                    noWrap={true}
                    color="text.secondary"
                    sx={{ opacity: 0.6, backgroundColor: 'red' }}
                ></Typography>
            </CardContent>
        </Card>
    );
};

export default ExamCard;
