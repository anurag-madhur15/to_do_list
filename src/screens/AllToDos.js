import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { addNote, deleteNote, editNote, handleAsyncStore } from '../store/actions';
import  ModalView  from './../common/modal';
import  AsyncStorage  from '@react-native-community/async-storage';
import  TaskCard from './../common/taskCard';

class AllToDos extends React.Component{

    state = {
        addModal: false,
        editModal: false,
        note: '',
        allNotes: this.props.note,
        editNote: '',
        searchInput: ''
    }

    componentDidMount = async () => {
        try{
            let savedNotes = await AsyncStorage.getItem('allNotes')
            savedNotes = JSON.parse(savedNotes) 
            this.props.onAddingFromAsync(savedNotes)    

            this.setState({
                allNotes: savedNotes
            })
        }
        catch (error){
            console.log("error: ", error)
        }
        
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if(prevProps.note !== this.props.note){
            try {
                await AsyncStorage.setItem('allNotes', JSON.stringify(this.props.note))
              } catch (error) {
                console.log("error saveing data: ", error)                
              }
            this.setState({
                allNotes: this.props.note
            })
        }

        if(prevState.searchInput !== this.state.searchInput){
            if(this.state.searchInput.length){
                let searchNote = this.props.note
                let searchNotes = searchNote.filter(note => note.note.toLowerCase().includes(this.state.searchInput.toLowerCase()))

                console.log("search: ", searchNotes)
                this.setState({
                    allNotes: searchNotes
                })
            }else{
                this.setState({
                    allNotes: this.props.note
                })
            }
        }
    }
   
    toggleAddModal = () =>{
        this.setState({
            addModal: !this.state.addModal,
            note: ''
        })
    }

    toggleEditModal = (note = '') =>{
        this.setState({
            editModal: !this.state.editModal,
            editNote: note
        })
    }
    
    handleSubmit = async (note) => { 
      
        this.props.onAddNote(note)
        this.setState({
            addModal: !this.state.addModal
        })
    }

    handleEdit = (note, isActive) =>{
        let editData = this.state.editNote
        editData.note = note
        editData.isActive = isActive
        this.props.onEditNote(editData)
        this.setState({
            editModal: !this.state.editModal,

        })
    }

    handleDelete = () => {
        this.props.onDeleteNote(this.state.editNote.noteId)
        this.setState({editModal: !this.state.editModal})
    }

    handleSearch = (note) => {
        this.setState({
            searchInput: note
        })
    }

    render(){

        console.log("state: ", this.state.allNotes)
        let activeNotes = 0
        if(this.state.allNotes){
        this.state.allNotes.forEach(note => {
            if(note.isActive){
                activeNotes += 1
            }
        });
    }
        let activeNoteText = 
        this.state.allNotes.length ?
            activeNotes ? 
                <Text style={{fontSize: 14,  color: 'red', marginTop: 5}}>{activeNotes}  {activeNotes > 1 ? 'items' : 'item'} not completed</Text> 
                :
                <Text style={{fontSize: 14,  color: 'green', marginTop: 5}}>All notes completed</Text>
            :
            null
        
        return(
            <View style={{flex:1}}>
                    <View style={{flex:2, justifyContent: 'center', marginLeft: 16}}>
                            <Text style={{fontSize: 22, fontWeight:'bold', color: 'black'}}>Welcome!</Text>
                            
                        {activeNoteText}

                    </View>
                    {this.props.note.length ?
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, borderRadius: 22, borderWidth: 1, borderColor: 'silver', marginBottom: 6, marginLeft: 12, marginRight: 12 }}>
                                <TextInput
                                    placeholder="search note..."
                                    value={this.state.searchInput}
                                    onChangeText={note => this.handleSearch(note)}
                                    style={{ marginLeft: 14 }}
                                />
                            </View>
                        </View>
                        :
                        null
                    }
                    
                    <View style={{flex:11}}>
                    {this.props.note.length ?
                        <ScrollView>
                            {this.state.allNotes.map((note, index) => {
                                return (
                                    <TaskCard 
                                        index={index}
                                        note={note}
                                        toggleEditModal={this.toggleEditModal}
                                        key={note.note + 100}
                                    />
                                )
                            })}
                        </ScrollView>
                        :
                        <View style={{flex:8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight:'bold', color: 'purple', fontSize: 24}}>Let's start adding notes...</Text>
                    </View>
                    }

                        <TouchableOpacity onPress={this.toggleAddModal} style={{ position: 'absolute', bottom: 10, height: 50, width: 50, borderRadius: 25, backgroundColor: 'blue', marginLeft: 290, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, color: 'white', marginBottom: 6 }}>+</Text>
                        </TouchableOpacity>

                    </View>
                    {this.state.addModal ?
                        <ModalView
                            showModal={true}
                            handleCancel={this.toggleAddModal}
                            note={this.state.note}
                            onSubmit={note => this.handleSubmit(note)}
                            header="Write a Note"
                        /> :
                        null
                    }
                    {this.state.editModal ?
                        <ModalView
                            showModal={true}
                            handleCancel={this.toggleEditModal}
                            note={this.state.editNote.note}
                            onSubmit={(note, isActive)=> this.handleEdit(note, isActive)}
                            header="edit note"
                            canDelete={true}
                            handleDelete={this.handleDelete}
                            statusText={this.state.editNote.isActive ? 'complete' : 'active'}
                        /> :
                        null
                    }
            </View>
        )
    
    }
}

const mapStateToProps = state => {
    return{
        note: state.dataReducer.notes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddNote: (data) => dispatch(addNote(data)),
        onEditNote: (newNote) => dispatch(editNote(newNote)),
        onDeleteNote: (noteId) => dispatch(deleteNote(noteId)),
        onAddingFromAsync: (notes) => dispatch(handleAsyncStore(notes))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AllToDos);
