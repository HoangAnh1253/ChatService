import React from "react";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const WaitRoom = () => {
    const params = useParams();
    
    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ my: 2, textTransform: 'none' }} component={Link} to="/">
                Home
            </Button>
            <Typography>{params.id}</Typography>
        </React.Fragment>
    );
}

export default WaitRoom;