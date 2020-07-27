import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE, HANDLE_ASYNC_STORE } from './actionTypes';

export const addNote = (note) => {

    return {
        type: ADD_NOTE,
        notes: note
    };
};

export const editNote = (newNote) => {

    return {
        type: EDIT_NOTE,
        editNote: newNote
    };
};

export const deleteNote = (noteId) => {

    return {
        type: DELETE_NOTE,
        noteId: noteId
    };
};

export const handleAsyncStore = (allNotes) => {

    return {
        type: HANDLE_ASYNC_STORE,
        notes: allNotes
    };
};