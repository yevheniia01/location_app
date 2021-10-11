import { setStatusBarHidden, StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {  Text, View, StyleSheet,  TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default function MainButton({locationLat, setLastLocation, lastLocation, locationLong, address, setAddress, setClicked, clicked }) {

    const firebaseConfig = {
        apiKey: "AIzaSyBw0JiynMCdwmvU4R9HuB6mCOXCmwR8H0E",
        authDomain: "locationapp-3efcb.firebaseapp.com",
        projectId: "locationapp-3efcb",
        storageBucket: "locationapp-3efcb.appspot.com",
        messagingSenderId: "1020753340007",
        appId: "1:1020753340007:web:31d1eeac64004d46bdd6c2"
      };
      
      // Initialize Firebase
      if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      }
    //Listen to firebase and display Last location instantly (not recommended)
    //this piece of code will be requesting data from firebase every second
      useEffect(()=>{
    //     db.collection("test")
    //     .get()
    //     .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data().location);
    //         setLastLocation(doc.data().location)
    //         console.log(lastLocation)
    //     });
    // })
      })

    var db = firebase.firestore();
      
    let fireAddress = db.collection("test").doc("locWaWWxNtucZmAIU5py")
    
    //adding random word to the address to change location
    var randoms = ['Yes', 'No', 'Maybe', 'random'];

    function showLocation(){
      //Converting Lattitude and Longtittude to an actual address
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + locationLat + ',' + locationLong + '&key=' + 'AIzaSyANgMRwJSiVKGPdjshbjuavIYRuOg7dKvQ ')
      .then((response) => response.json())
      .then((responseJson) => {
          var random = randoms[Math.floor(Math.random() * randoms.length)];
        setAddress(responseJson.results[0].formatted_address + random)
        setClicked(true)
        console.log(address)  
    })
    //Creating array in firebase
      fireAddress.set({
      location: address 
    })
      .then(() => {
      console.log("Document successfully written!");
    })
      .catch((error) => {
      console.error("Error writing document: ", error);
    });
  //Updating firebase Array
    fireAddress.update({
    location: firebase.firestore.FieldValue.arrayUnion(address)
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
    console.error("Error writing document: ", error);
    });
    //Getting data from firebase Array
    let coll = db.collection("test")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().location);
            setLastLocation(doc.data().location)
            console.log(lastLocation)
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
console.log(coll)

   }
    return (
        <View>
            <TouchableOpacity style={styles.mainbutton} 
                              onPress={showLocation}> 
                 <Text>Show my location</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainbutton: {
        margin: '1rem',
        border: '1px solid lightblue',
        padding: '1rem',
        borderRadius: '10px'
        
    }
})