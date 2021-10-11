import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function List({clicked, lastLocation, address}) {
    return (
        <View>
            {clicked == true ?
                <View style={{margin: '1rem'}}>    
                    <Text style={styles.header}>You are located at:</Text>
                    <Text style={styles.text}>{address}</Text> 
                </View>:null}
                {lastLocation.map((item) =>{
                    return(
                    <View>
                        {item !== '' ? 
                        <View>
                            <Text style={styles.header}> Your last location:</Text>
                            <Text style={styles.text}>{item}</Text>
                        </View>: null}
                     </View> 
                    )
                    })}
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text:{
        textAlign: 'center',
        fontSize: '17px'
    }
})