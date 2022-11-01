import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Button, Paper, makeStyles, createStyles, collapseClasses } from '@mui/material';
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
                <Grid spacing={2} container justifyContent="space-between" alignItems="center">
                    <Grid item xs={8}>
                        <Box sx={cardStyle}>
                            <Box sx={wrapperStyle}>
                                <Stack direction="row" spacing={1}>
                                    <TextField
                                        variant="standard"
                                        placeholder="Enter a join code"
                                        fullWidth={true}
                                        sx={{
                                            borderRadius: 3,
                                            backgroundColor: 'white',
                                            px: 2,
                                            py: 1,
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                    ></TextField>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{ py: 1, px: 3, borderRadius: 3, boxShadow: '0 4px 0 #0c4689' }}
                                    >
                                        Join
                                    </Button>
                                </Stack>
                            </Box>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const wrapperStyle = {
    border: '2px solid rgba(0,0,0,.33)',
    backgroundColor: '#f4f4f5',
    borderRadius: 3,
    padding: 0.8,
    width: '60%',
};

export default Home;
