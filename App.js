import { setStatusBarHidden, StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import MainButton from './components/MainButton';
import List from './components/List';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';



export default function App() {

  const [locationLat, setLocationLat] = useState(null);
  const [locationLong, setLocationLong] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('');
  const [clicked, setClicked] = useState(false);
  const [lastLocation, setLastLocation] = useState([])
  
  useEffect(() => {
    //getting data from expo location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocationLat(location.coords.latitude);
      setLocationLong(location.coords.longitude);
      
    
      //Hopefully hitting API endpoint
      let result = await fetch('https://httpbin.org/post', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(location)     
      })
      console.log(result)
      console.log(location.coords)
    })();
  }, []);
 

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Welcome to 'Show my location App' </Text>
      <Text style={styles.instructions}>Click button below to see your location</Text>
      <MainButton setAddress={setAddress} 
                  address={address}
                  setLastLocation= {setLastLocation}
                  locationLat={locationLat}
                  locationLong={locationLong}
                  location ={location}
                  setClicked = {setClicked}
                  clicked = {clicked} />
      <List clicked = {clicked} 
            lastLocation = {lastLocation}
            address = { address }/>
            
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '25px',
    margin: '1rem',
  },
  instructions: {
    fontSize: '17px',
  }
});
