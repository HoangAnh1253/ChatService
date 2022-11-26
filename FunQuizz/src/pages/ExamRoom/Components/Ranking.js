import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import LocalStorageService from '~/Services/LocalStorageService';

const Ranking = (props) => {
    const { examResult } = props;
    const { email } = LocalStorageService.get();

    const [yourRankingInfo, setYourRankingInfo] = React.useState(null);

    React.useEffect(() => {
        const getCurrentUserRanking = () => {
            const userRanking = examResult.find((user) => user.username === email);
            const rankingIndex = examResult.indexOf(userRanking);
            let result = {
                ...userRanking,
                ranking: rankingIndex + 1
            }
            setYourRankingInfo(result);
        };

        getCurrentUserRanking();

    }, []); 

    const getColor = (rankingIndex) => {
        switch (rankingIndex) {
            case 0:
                return '#C9B037';
            case 1:
                return '#D7D7D7';
            case 2:
                return '#AD8A56';
            default:
                return 'transparent';
        }
    };

    const getScoreSize = (rankingIndex) => {
        switch (rankingIndex) {
            case 0:
                return 30;
            case 1:
                return 24;
            case 2:
                return 20;
            default:
                return 18;
        }
    };

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ width: '40%' }}>
            <Box sx={{ ...container, height: '500px' }}>
                <Typography variant="h5" fontWeight="bold" color="#F49D1A" mt={2}>
                    Rank
                </Typography>
                <Box sx={{ height: '100%', overflow: 'hidden', overflowY: 'scroll', mt: 2, px: 1 }}>
                    {examResult.map((e, index) => (
                        <Box width={1} p={1} bgcolor={e.username === email ? "#F1F1F1" : "transparent"} borderRadius={2}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item xs={2}>
                                    <Paper sx={{ ...paperStyle, bgcolor: getColor(index) }} elevation={0}>
                                        {index + 1}
                                    </Paper>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography fontWeight={index <= 2 ? 'bold' : ''} align="left">
                                        {e.username}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography fontWeight={index <= 2 ? 'bold' : ''} fontSize={getScoreSize(index)}>
                                        {e.totalScore}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ ...container, mt: 2, py: 0.5 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={2}>
                        <Paper sx={paperStyle} elevation={0}>
                            {yourRankingInfo?.ranking}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography fontWeight="bold" align="left">
                            {yourRankingInfo?.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography fontWeight="bold" fontSize={18}>
                            {yourRankingInfo?.totalScore}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    );
};

const container = {
    width: '100%',
    m: 'auto',
    overflow: 'hidden',
    borderRadius: 4,
    bgcolor: 'white',
    textAlign: 'center',
};

const paperStyle = {
    backgroundColor: 'transparent',
    borderRadius: 2,
    display: 'flex',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
};

export default Ranking;
