"use client"

import { useState } from 'react';
import { useShopContext } from '@/services/providers/ShopContext';
import useUserInterfaceDisplay, { INTER_FACE_KEY } from '@/hooks/useUserInterfaceDisplay';

import {
    Tooltip,
    Box,
    IconButton,
    Menu,
} from '@mui/material/';
import {
    AccountCircle,
    Person,
    ShoppingCart,
    Favorite
} from '@mui/icons-material/';

import ControllerMenuItem from './ControllerMenuItem';

export default function HeaderControllerIcon() {

    const { auth } = useShopContext();

    const { setUserInterface } = useUserInterfaceDisplay();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLoginMenu = () => {
        setUserInterface(INTER_FACE_KEY.LOGIN_MODAL, true)
    }

    return (
        <Box sx={{ display: 'flex', gap: '1rem', flexGrow: 0 }}>
            {auth?.accessToken ? (
                <Box >
                    <Tooltip title="Profilom">
                        <IconButton onClick={handleOpenUserMenu} color="inherit" sx={{ p: 0 }}>
                            <AccountCircle
                                className='hover:text-primary-500'
                                fontSize="large"
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '55px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <ControllerMenuItem
                            handleCloseUserMenu={handleCloseUserMenu}
                        />
                    </Menu>
                </Box>
            ) : (
                <Person
                    className='hover:text-primary-500'
                    fontSize="large"
                    onClick={handleOpenLoginMenu} />
            )}
            <Tooltip className='cursor-pointer' title="Kedvenceim">
                <Favorite className='hover:text-primary-500' fontSize="large" />
            </Tooltip>
            <Tooltip className='cursor-pointer' title="Kosaram">
                <ShoppingCart className='hover:text-primary-500' fontSize="large" sx={{ marginRight: 2 }} />
            </Tooltip>
        </Box>
    )
}
