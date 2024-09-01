import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: '5px',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const InfoDialog = ({info, handleClose, open}) => {
    
  return (
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
    >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {info.name}
        </DialogTitle>
        <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
        })}
        >
        <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Item>Height: {info.height}</Item>
                    <Item>Weight: {info.weight}</Item>
                    <Item>Type: {info.types[0].type.name}</Item>
                </Grid>
                <Grid xs={6}>
                    <Item>
                        <img src={info.sprites.front_default} alt=''/> 
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </DialogContent>
    </BootstrapDialog>
  )
}

export default InfoDialog