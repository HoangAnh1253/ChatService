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
        <Card variant="outlined" sx={cardStyle}>
            {/* <Box sx={{ height: '7px', backgroundColor: 'primary.se' }}></Box> */}
            <ButtonBase sx={{ color: 'primary.main' }}>
                <CardContent>
                    <Typography gutterBottom color="primary.main" align="left" fontSize={12} sx={{ mb: 1 }}>
                        {exam.topic.name}
                    </Typography>

                    <Typography
                        gutterBottom
                        variant="h5"
                        align="left"
                        sx={{ fontSize: 18, color: 'black', opacity: 0.9 }}
                    >
                        {exam.name}
                    </Typography>
                    <CardActions>
                        <Typography color="text.secondary" sx={smallTextStyle}>
                            {exam.question.length} quiz
                        </Typography>
                        <Typography color="text.secondary" sx={smallTextStyle}>
                             . 
                        </Typography>
                        <Typography color="text.secondary" sx={smallTextStyle}>
                            {exam.time} min
                        </Typography>
                    </CardActions>
                </CardContent>
            </ButtonBase>
        </Card>
    );
};

const cardStyle = {
    minWidth: 100,
    borderRadius: 5,
    boxShadow: 'rgba(33, 35, 38, 0.1) 10px 10px 10px -5px;',
    // background: 'linear-gradient(45deg, #3c3c8a, #2c6cd1)'
};

const smallTextStyle = {
    fontSize: 12,
    color: '#6d6d6d',
    fontWeight: 500,
};

export default ExamCard;
