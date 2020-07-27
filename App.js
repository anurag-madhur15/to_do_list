import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllToDos from './src/screens/AllToDos';
import ActiveToDos from './src/screens/ActiveToDos';
import CompletedToDos from './src/screens/CompletedToDos';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="AllToDos"
        tabBarOptions= {{
          labelStyle: {
            fontSize: 14,
            marginBottom:12,
            
          },
         
        }}  
      >      
        <Tab.Screen name="all" component={AllToDos} />
        <Tab.Screen name="active" component={ActiveToDos} />
        <Tab.Screen name="complete" component={CompletedToDos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;

