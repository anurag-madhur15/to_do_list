import React, { useState } from 'react';
import { View, Text, Share, Modal, TextInput, ScrollView } from 'react-native';

export default class ModalView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.note
        }

    }
    componentDidMount = () => {
        setTimeout(() => { this.textInputRef.focus() }, 100)
    }

    handleNote = (note) => {
        this.setState({
            value: note
        })
    }
    handleSubmit = (isActive = true) => {
        this.props.onSubmit(this.state.value, isActive)
    }
    onShare = async () => {
        try {
          const result = await Share.share({
            message:
              this.state.value,
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          console.log("error: ", error)
        }
      };

    render() {
        let isActive = this.props.statusText === 'complete' ? false : true
        return (
            <Modal
                visible={this.props.showModal}
                animationType="slide"
                onRequestClose={this.props.handleCancel}

            >
                <View style={{ flex: 1}}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{ fontSize: 22, marginTop:12, fontWeight: 'bold', color: 'black' }}>
                                {this.props.header}
                            </Text>
                        </View>
                        <View style={{ flex: 1,flexDirection: 'row',  justifyContent: 'space-around', marginTop:8 }}>
                        <Text onPress={this.onShare} style={{ marginRight: 12, color: 'purple', fontSize: 16, fontWeight: 'bold' }}>
                                share
                            </Text>
                            <Text onPress={this.state.value ? this.handleSubmit:null} style={{ marginRight: 12, color: this.state.value ? 'green' : 'grey', fontSize: 16, fontWeight: 'bold' }}>
                                save
                            </Text>
                            {this.props.canDelete ?
                                <React.Fragment>
                                    <Text onPress={() => this.handleSubmit(isActive)} style={{ marginRight: 12, color: this.props.statusText === 'complete' ? 'blue' : 'purple', fontSize: 16, fontWeight: 'bold' }}>
                                        {this.props.statusText}
                                    </Text>
                                    <Text onPress={this.props.handleDelete} style={{ marginRight: 12, color: 'red', fontSize: 14, fontWeight: 'bold' }}>
                                        delete
                                    </Text>
                                    {/* <Text onPress={this.state.value ? this.handleSubmit:null} style={{ marginRight: 12, color: this.state.value ? 'green' : 'grey', fontSize: 16, fontWeight: 'bold' }}>
                                        save
                                    </Text> */}
                                </React.Fragment>
                                :
                                null
                            }
                        </View>
                    </View>
                    <View style={{flex: 7, backgroundColor: '', marginTop: 12,marginLeft: 16, marginRight: 16, borderColor:'silver', borderWidth:1 }}>
                        <TextInput
                            placeholder="enter somethng"
                            multiline={true}
                            textAlignVertical="bottom"
                            value={this.state.value}
                            returnKeyType={"send"}
                            onChangeText={note => this.handleNote(note)}
                            onSubmitEditing={this.handleSubmit}
                            autoFocus={true}
                            ref={ref => this.textInputRef = ref}
                            // underlineColorAndroid="silver"
                            autoCorrect={true}
                            style={{ marginRight: 8, lineHeight: 20 }}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}