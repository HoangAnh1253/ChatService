import React from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";


const WrongAnswerDialog = (props) => {
    const { open, handleClose } = props;
    
    return (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{py: 5}}>
            <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={process.env.PUBLIC_URL + '/wrong_answer.png'} width="60%"/>
            <Typography color="red" fontWeight="bold" fontSize={25}>
                Sorry, this answer is wrong.
            </Typography>
            </Stack>
          </DialogContent>
        </Dialog>
      );
}

export default WrongAnswerDialog;