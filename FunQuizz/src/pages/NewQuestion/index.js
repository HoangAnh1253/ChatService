import React from 'react';
import { AppBar, Box, Button, TextField, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const NewQuestion = () => {
    return (
        <React.Fragment>
            <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 2, width: '100%' }}>
                <Toolbar variant="regular">
                    <Link to="/">
                        <img
                            src={process.env.PUBLIC_URL + '/FunQuizz_logo.png'}
                            width="150px"
                            style={{ marginRight: 25 }}
                        />
                    </Link>

                    <Button>Test</Button>
                </Toolbar>
            </AppBar>
            <TextField
                variant="outlined"
                placeholder="Type your question here..."
                multiline
                rows={5}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                fullWidth
                sx={{mt: 2}}
            />
        </React.Fragment>
    );
};

export default NewQuestion;
