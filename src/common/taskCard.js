import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function TaskCard(props) {
    console.log("fun note: ", props)
    return (
        <React.Fragment>
            <View style={{marginBottom:-9, alignSelf:'flex-end', marginRight:30, backgroundColor: props.note.isActive ? 'purple' : 'green', zIndex:1, borderRadius:8}}>
                <Text style={{fontSize:12, marginLeft:4, marginRight:4, color:'white', marginBottom:1}}>{props.note.isActive ? 'active' : 'completed'}</Text>
            </View>   
            <TouchableOpacity
                key={props.index + 100}
                style={{
                    // flexDirection: 'row',
                    marginLeft: 16,
                    marginBottom: 12,
                    // alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 6,
                    marginRight: 16,
                    borderColor: props.note.isActive ? 'purple' : 'green' //'black' 
                }}
                onPress={() => props.toggleEditModal(props.note)}
            >
                
                <View style={{ marginLeft: 6, marginTop: 12, marginBottom: 12}}>
                    <Text style={{ marginLeft: 8, lineHeight: 20 }}>{props.note.note}</Text>
                </View>
                <Text style={{color: 'silver', fontSize:10, alignSelf: 'flex-end',  marginRight:4}}> {props.note.createdOn } </Text>

            </TouchableOpacity>
        </React.Fragment>
    )
}