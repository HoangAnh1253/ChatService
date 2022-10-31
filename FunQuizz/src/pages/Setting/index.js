import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Setting = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '40%', boxShadow: 1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ManageAccountsIcon color="warning" sx={{ fontSize: 16 }} />
                            Profile
                        </Box>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 16 }}>
                        Avatar
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default Setting;
