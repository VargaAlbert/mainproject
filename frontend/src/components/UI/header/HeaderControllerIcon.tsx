"use client"

import { useState } from 'react';
import { useShopContext } from '@/services/providers/ShopContext';
import Link from 'next/link';
import {
    Tooltip,
    Box,
    IconButton,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material/';

import {
    AccountCircle,
    Person,
    ShoppingCart,
    Favorite
} from '@mui/icons-material/';


const settings = ['Profile', 'Rendeléseim', 'Kijelentkezés'];
const login = false

export default function HeaderControllerIcon() {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { handleChangeUIObj, auth } = useShopContext();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseUserMenuu = () => {
        handleChangeUIObj('loginModal', true)
    }


    /*    if (auth.roles === 2130 || auth.roles === 8505) {
           settings.push("Editor page");
       } */

    console.log(auth.roles)
    return (
        <Box sx={{ display: 'flex', gap: '1rem', flexGrow: 0 }}>
            {auth?.roles.length > 0 ? (
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
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Link href={`/adminpage`}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </Link>
                            </MenuItem>
                        ))}
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
