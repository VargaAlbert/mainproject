"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginForm from './LoginForm';

import { useShopContext } from '@/services/providers/ShopContext';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    p: 4,
};

export default function LoginModal() {

    const { uiObj, handleChangeUIObj } = useShopContext();



    const handleClose = () => handleChangeUIObj('loginModal', false);

    console.log(uiObj.loginModal)
    return (

        <Modal
            open={uiObj.loginModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <LoginForm />
            </Box>
            {/* <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box> */}
        </Modal>

    );
}
