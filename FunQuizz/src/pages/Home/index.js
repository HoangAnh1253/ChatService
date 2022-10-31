import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Button, Paper, makeStyles } from '@mui/material';
import Stack from '@mui/system/Stack';
import ExamCard from '~/components/assets/ExamCard';
import { flexbox } from '@mui/system';

const Home = () => {
    const exam = {
        name: 'Math 101: explore the topics and practice activity',
        time: 120,
        topic: {
            name: 'Physical',
        },
        question: [
            { content: 'ASdasd' },
            { content: 'ASdasd' },
            { content: 'ASdasd' },
            { content: 'ASdasd' },
            { content: 'ASdasd' },
        ],
    };

    return (
        <Container maxWidth="xl">
            <Box marginX={5}>
                <Grid spacing={2} container justifyContent="space-between">
                    <Grid item xs={8}>
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
                        <Box sx={{ ...cardStyle, height: 216, background: 'linear-gradient(45deg, #3c3c8a, #2c6cd1)' }}>
                            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                                Create quiz
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: 2 }}>
                    <Grid item md={12 / 5} sm={4}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                    <Grid item md={12 / 5} sm={3}>
                        <ExamCard exam={exam} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

const cardStyle = {
    height: '216px',
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 3,
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 10%)',
};


export default Home;
