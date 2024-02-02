"use client"

import * as React from 'react';
import { Box, Modal } from '@mui/material/';
import { useShopContext } from '@/services/providers/ShopContext';

import LoginForm from './LoginForm';

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
        </Modal>

    );
}
