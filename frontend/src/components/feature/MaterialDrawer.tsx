"use client"

import React, { Children } from 'react';
import { useShopContext } from '@/services/providers/ShopContext';

import {
    Box,
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


export default function TemporaryDrawer({ children }: {
    children: React.ReactNode;
}) {
    const { userInterfaceDisplay, toggleDrawer } = useShopContext();

    return (
        <div>
            {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={userInterfaceDisplay.DRAWER[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {children}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
