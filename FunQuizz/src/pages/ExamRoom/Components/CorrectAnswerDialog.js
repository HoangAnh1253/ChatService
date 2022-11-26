import React from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";


const CorrectAnswerDialog = (props) => {
    const { open, handleClose } = props;
    
    return (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{py: 5}}>
            <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={process.env.PUBLIC_URL + '/correct_answer.png'} width="60%"/>
            <Typography color="green" fontWeight="bold" fontSize={25}>
                Congratulation!!!
            </Typography>
            </Stack>
          </DialogContent>
        </Dialog>
      );
}

export default CorrectAnswerDialog;