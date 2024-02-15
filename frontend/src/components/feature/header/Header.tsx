"use client"

import { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Button,
    MenuItem,
    Container,
} from '@mui/material/';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import logo from '@/assets/logo.png'

import HeaderControllerIcon from '@/components/UI/header/HeaderControllerIcon';
import { ALL_PRODUCTS, PRODUCT_CATEGORY, processString } from '@/utils/category';


export default function ResponsiveAppBar() {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="static">
            <Container className="container mx-auto max-w-screen-2xl">
                <Toolbar sx={{ display: { xs: 'flex' }, justifyContent: 'space-between' }} disableGutters>
                    <Box sx={{
                        maxWidth: '150px',
                        display: { xs: 'none', md: 'flex' }, mr: 1
                    }} >
                        <Link href={'/'}>
                            <Image
                                src={logo}
                                alt="Description of the image"
                                className="w-full h-auto"
                                priority
                            />
                        </Link>
                    </Box>
                    <Box sx={
                        {
                            maxWidth: '48px',
                            flexGrow: 1, display: { xs: 'flex', md: 'none' }
                        }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                justifyContent: 'center',
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link href='/products'>
                                        {ALL_PRODUCTS}
                                    </Link>
                                </Typography>
                            </MenuItem>

                            {PRODUCT_CATEGORY.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link href={processString(`/products/${page}`)}>
                                            {page}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{
                        maxWidth: '100px',
                        display: {
                            xs: 'flex', justifyContent: 'center',
                            alignItems: 'center',
                            flexGrow: 1, md: 'none'
                        }, mr: 1
                    }}>
                        <Link href={'/'}>
                            <Image
                                src={logo}
                                alt="logo"
                                className="w-full h-auto"
                                priority
                            />
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <Link
                            href='/products'
                            className="my-2 text-white block"
                            onClick={handleCloseNavMenu}
                        >
                            <Button>
                                {ALL_PRODUCTS}
                            </Button>
                        </Link>
                        {PRODUCT_CATEGORY.map((page) => (
                            <Link
                                href={processString(`/products/${page}`)}
                                className="my-2 text-white block"
                                key={page}
                                onClick={handleCloseNavMenu}
                            >
                                <Button>
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <HeaderControllerIcon />
                </Toolbar>
            </Container>
        </AppBar >
    );
}