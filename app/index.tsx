
import React from 'react';
import { View, Text } from 'react-native';
// import SignIn from './pages/SignIn'; 
import Home from './pages/Home';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
      {/* <SignIn />  Use the SignUp component here */}
    <Home/>
    </View>
  );
}
