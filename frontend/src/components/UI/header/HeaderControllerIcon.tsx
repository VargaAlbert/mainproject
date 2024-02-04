"use client"

import { useState } from 'react';
import { useShopContext } from '@/services/providers/ShopContext';

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

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const {
        handleChangeUIObj,
        auth,
    } = useShopContext();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenuu = () => {
        handleChangeUIObj('loginModal', true)
    }

    return (
        <Box sx={{ display: 'flex', gap: '1rem', flexGrow: 0 }}>
            {auth.isLogin ? (
                <Box >
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} color="inherit" sx={{ p: 0 }}>
                            <AccountCircle
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
                    fontSize="large"
                    onClick={handleCloseUserMenuu} />
            )}
            <Favorite
                fontSize="large"
            />
            <ShoppingCart
                fontSize="large" sx={{ marginRight: 2 }} />
        </Box>
    )
}
