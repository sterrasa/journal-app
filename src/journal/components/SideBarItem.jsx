import React from 'react';
import { ListItemButton, ListItem, ListItemText,Grid, ListItemIcon } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({title = '', id, body, date, imageUrls = [] }) => {

    const dispach = useDispatch();

    const selectNote = () => {
        dispach(setActiveNote({title, id, body, date, imageUrls}))
    }

    return (
        <ListItem key={id} disablePadding>
        <ListItemButton onClick={selectNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={title} />
                <ListItemText secondary={body} />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
