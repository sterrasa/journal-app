import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { SaveOutlined, UploadOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, IconButton } from '@mui/material';

import { ImageGallery } from '../components';
import { getFormatDate } from '../../helpers';
import { useForm } from '../../hooks/useForms';
import { startSaveNote, setActiveNote, startUploadingFiles, startDeletingNote} from '../../store/journal';
import { useRef } from 'react';


export const NoteView = () => {

    const dispatch = useDispatch();

    const fileInputRef = useRef();

    const { active: note, isSaving, messageSaved } = useSelector(state => state.journal);

    const { title, body, date, id, onInputChange, formState } = useForm(note);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Note Updated', messageSaved, 'success');
        }
    }, [messageSaved])

    const updateNote = () => {
        dispatch(startSaveNote());
    }

    const onInputFileChange =  ( { target }) =>{
        console.log(target.files);
        if(target.files == 0) return;

        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{getFormatDate(date)}</Typography>
            </Grid>
            <Grid item>

            <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onInputFileChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

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

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls} />

        </Grid>
    )
}
