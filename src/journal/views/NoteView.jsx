import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { getFormatDate } from '../../helpers';
import { useForm } from '../../hooks/useForms';
import { startSaveNote, setActiveNote } from '../../store/journal';


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, isSaving, messageSaved } = useSelector(state => state.journal);

    const { title, body, date, id, onInputChange, formState } = useForm(note);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Note Updated', messageSaved, 'success');
        }
    }, [messageSaved])

    const updateNote = () => {
        dispatch(startSaveNote());
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{getFormatDate(date)}</Typography>
            </Grid>
            <Grid item>
                <Button disabled={isSaving} onClick={updateNote} color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Input a Title"
                    label="title"
                    sx={{ border: 'none', mb: 1 }}
                    value={title}
                    name='title'
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿what happend today?"
                    minRows={5}
                    value={body}
                    name='body'
                    onChange={onInputChange}
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery />

        </Grid>
    )
}
