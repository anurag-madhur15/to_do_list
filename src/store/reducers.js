import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE, HANDLE_ASYNC_STORE } from "./actionTypes";

  const initialState = {
    notes: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_NOTE:
        let noteData = {
          note: action.notes,
          isActive: true,
          noteId: state.notes.length + 1000,
          createdOn: new Date().toLocaleString()

        }
        return {
            ...state,
            notes: state.notes.concat(noteData)
        };

      case EDIT_NOTE:
        let editedNote = state.notes.map(editNote =>{
          if(editNote.noteId === action.editNote.noteId){
            editNote.note = action.editNote.note
          }
          return editNote
        })
        return {
            ...state,
            notes: editedNote
        };

      case DELETE_NOTE:
        let newData = state.notes.filter((note) => note.noteId !== action.noteId )
        return {
            ...state,
            notes: newData
        };

      case HANDLE_ASYNC_STORE:
        console.log("handle: ", action)
        return {
            ...state,
            notes: action.notes
        };

      default:
        return state;
    }
  };
  
  export default reducer;
  