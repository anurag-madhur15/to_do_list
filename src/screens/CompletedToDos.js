import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { editNote, deleteNote } from '../store/actions';
import  TaskCard from './../common/taskCard';
import  ModalView  from './../common/modal';

class CompletedToDos extends React.Component {

    state = {
        editModal: false,
        editNote: ''
    }

    toggleEditModal = (note = '') =>{
        this.setState({
            editModal: !this.state.editModal,
            editNote: note
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


    render() {
        let completedNotes = 0;
        this.props.note.forEach(element => {
            if (!element.isActive){
                completedNotes += 1
            }
        });
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Completed Notes</Text>
                </View>
                <View style={{ flex: 9 }}>
                    <View style={{ backgroundColor: 'silver', height: 1, marginBottom: 12 }} />
                    {completedNotes ?

                        <ScrollView>
                            {this.props.note.map((note, index) => {
                                return (
                                    !note.isActive
                                        ?
                                        <TaskCard
                                            index={index}
                                            note={note}
                                            toggleEditModal={this.toggleEditModal}
                                            key={note.note + 1000}
                                        />
                                        :
                                       null
                                )
                            })}
                        </ScrollView>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'silver' }}>Oh ooo....Add some notes.</Text>
                        </View>
                    }

                </View>
                {this.state.editModal ?
                        <ModalView
                            showModal={true}
                            handleCancel={this.toggleEditModal}
                            note={this.state.editNote.note}
                            onSubmit={(note, isActive)=> this.handleEdit(note, isActive)}
                            header="edit note"
                            canDelete={true}
                            handleDelete={this.handleDelete}
                            statusText={this.state.editNote.isActive ? 'active' : 'active'}
                        /> :
                        null
                    }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        note: state.dataReducer.notes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditNote: (newNote) => dispatch(editNote(newNote)),
        onDeleteNote: (noteId) => dispatch(deleteNote(noteId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompletedToDos);


// export default CompletedToDos;