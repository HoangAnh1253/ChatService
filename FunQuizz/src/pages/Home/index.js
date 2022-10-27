import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Button, Paper } from '@mui/material';
import Stack from '@mui/system/Stack';
import ExamCard from '~/components/assets/ExamCard';

const Home = () => {

    const exam = {
        name: "Math 101: explore the topics and practice activity",
        time: 120,
        topic: {
            name: "Physical"
        },
        question: [
            {content: "ASdasd"},
            {content: "ASdasd"},
            {content: "ASdasd"},
            {content: "ASdasd"},
            {content: "ASdasd"},
        ]
    }

    return (
        <React.Fragment>
            <Box marginX={5}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={8} spacing={1}>
                        <Box sx={cardStyle}>
                            <Stack direction="row" spacing={1}>
                                <TextField
                                    variant="outlined"
                                    placeholder="enter a join code"
                                    fullWidth={true}
                                ></TextField>
                                <Button variant="contained" color="primary" size="large" sx={{ paddingY: 1.8 }}>
                                    Join
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{ ...cardStyle, height: 216 }}> Text </Box>
                    </Grid>
                </Grid>

                <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                    <Grid item xs={2}> <ExamCard exam={exam}/> </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

const cardStyle = {
    height: '216px',
    padding: 2,
    backgroundColor: "white",
    borderRadius: 3,
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 10%)',
};


export default Home;
