
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useState } from 'react';
import { LiquidGaugeProgress } from './src/LiquidGaugeProgress';
import { Thermo } from './src/ther';
import {

  useFont,
} from "@shopify/react-native-skia";

export default function App() {
  const [setNotifiy, getNotify] = useState('notify');
  const [temperature, setTemperature] = useState("");
  const [waterLevel, setWaterLevel] = useState("");

  return (
    <View style={styles.backgound}>
      <View style={styles.container1}>
        <Text style={styles.text1}>Smart Heater</Text>
        <Pressable style={styles.btn9}>
          <Text style={styles.text4}>Add a shedule</Text>
        </Pressable>
        <View style={styles.view8}>
          <View >
            <Text style={styles.text9}>Curret water Level</Text>
            <LiquidGaugeProgress size={200} value={50} />
          </View>
          <View >
            <Text style={styles.text9}>Curret Temparature Level</Text>
            <Thermo size={200} value={25} />

          </View>

        </View>

        <View style={styles.view4}>
          <Text style={styles.text6}>Select Temparture</Text>
          <View style={styles.view}>
            <Pressable style={styles.btn1} onPress={() => { setTemperature("25"); }
            }
            >
              <Text style={styles.text2}>25 °C</Text>
            </Pressable>
            <Pressable style={styles.btn2} onPress={() => { setTemperature("50"); }}>
              <Text style={styles.text2}>50 °C</Text>
            </Pressable>
            <Pressable style={styles.btn3} onPress={() => { setTemperature("75"); }}>
              <Text style={styles.text2}>75 °C</Text>
            </Pressable>
            <Pressable style={styles.btn4} onPress={() => { setTemperature("100"); }}>
              <Text style={styles.text2}>100 °C</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.view5}>
          <Text style={styles.text6}>Select Water Amount</Text>
          <View style={styles.view}>
            <Pressable style={styles.btn1} onPress={() => { setWaterLevel("25"); }}>
              <Text style={styles.text2}>25 ML</Text>
            </Pressable>
            <Pressable style={styles.btn2} onPress={() => { setWaterLevel("50"); }}>
              <Text style={styles.text2}>50 ML</Text>
            </Pressable>
            <Pressable style={styles.btn3} onPress={() => { setWaterLevel("75"); }}>
              <Text style={styles.text2}>75 ML</Text>
            </Pressable>
            <Pressable style={styles.btn4} onPress={() => { setWaterLevel("100"); }}>
              <Text style={styles.text2}>100 ML</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.view2}>
          <Text style={styles.text3}>Custerze Your Own</Text>

          <View style={styles.view7}>
            <TextInput style={styles.textinput} placeholder='Add New Temparatre' onEndEditing={(event) => setTemperature(event.nativeEvent.text)} />
            <TextInput style={styles.textinput} placeholder='Add Water Amount' onEndEditing={(event) => setWaterLevel(event.nativeEvent.text)} />

          </View>
          <View style={styles.view7}>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value="notify"
                status={setNotifiy === 'notify' ?
                  'checked' : 'unchecked'}
                onPress={() => getNotify('notify')}
                color="#007BFF"
              />
              <Text style={styles.text7}>
                Notify Me
              </Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value="notnotify"
                status={setNotifiy === 'notnotify' ?
                  'checked' : 'unchecked'}
                onPress={() => getNotify('notnotify')}
                color="#007BFF"
              />
              <Text style={styles.text7}>
                Don't Notify
              </Text>
            </View>

          </View>

          <View style={styles.view3}>
            <Pressable style={styles.btn5}>
              <Text style={styles.text5}>Set</Text>
            </Pressable>
            <Pressable style={styles.btn8} onPress={() => {
              console.log("FormData");
            }}>
              <Text style={styles.text5}>Reset</Text>
            </Pressable>
          </View>



        </View>
        <View style={styles.view6}>
          <View style={styles.view9}>
            <View style={styles.view10}>
              <Text style={styles.text10}>Selected Temp</Text>
              <TextInput style={styles.textinput1} value={temperature} />
            </View>
            <View style={styles.view10}>
              <Text style={styles.text10}>Selected Water level</Text>
              <TextInput style={styles.textinput1} value={waterLevel} />
            </View>

          </View>

          <Pressable style={styles.btn7} onPress={async () => {


            console.log(temperature);
            console.log(waterLevel);
            let response = await fetch("http://192.168.0.101:8080/aurdino/Ardino", {

              method: 'POST',
              body: JSON.stringify({
                temparature: temperature,
                waterLevel: waterLevel,
              }), headers: {
                "Content-Type": "application/json"
              }

            });
            console.log("FormData");
            if (response.ok) {
              let json = await response.json();
              if (json.Success) {
                let user = json.user;

              } else {
                console.log("Error");

              }
            }
          }}>
            <Text style={styles.text8}>Start</Text>
          </Pressable>
        </View>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  backgound: {
    backgroundColor: '#9A9A9A',
    flex: 1,
  },
  container1: {

    flex: 1,
    marginHorizontal: 7,
    marginVertical: 60,
  },
  view: {
    flexDirection: 'row',
    columnGap: 5,
  },
  view2: {
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    height: 210,
    borderRadius: 20,
  },
  view3: {
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 15,
  },
  view4: {
    marginTop: 20,
  },
  view5: {
    marginTop: 10,
  },
  view6: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    
  },
  view7: {
    marginTop: 5,
    flexDirection: 'row',
    columnGap: 5,
  },
  view8: {
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 10,
  },
  view9: {
    flexDirection: 'row',
    columnGap: 5,
    marginBottom: 5,
  },
  view10:{
    justifyContent: 'center', 
    alignItems: 'center',
    marginHorizontal:10,
    rowGap: 5,
  },
  text1: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },
  text3: {
    marginTop: 10,
    fontSize: 23,
    alignItems: 'center',

  },
  text4: {
    fontSize: 16,
    color: "white",
  },
  text8: {
    fontSize: 25,
    color: 'white',

  },
  text5: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text6: {
    fontSize: 18,
    marginBottom: 10,
  },
  text9: {
    marginBottom: 10,
    fontSize: 17,
    alignSelf: 'center',

  },
  text10:{
    fontWeight: 'bold',
  },
  btn1: {
    borderRadius: 5,
    width: 100,
    backgroundColor: 'green',
    height: 40,
    justifyContent: 'center',

  },
  btn2: {
    borderRadius: 5,
    width: 100,
    backgroundColor: 'blue',
    height: 40,
    justifyContent: 'center',

  },
  btn3: {
    borderRadius: 5,
    width: 100,
    backgroundColor: 'orange',
    height: 40,
    justifyContent: 'center',

  },
  btn4: {
    borderRadius: 5,
    width: 100,
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
  },

  btn6: {
    height: 40,
    width: 150,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn7: {
    height: 40,
    width: 150,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'maroon',
  },
  btn5: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "gray",
  },
  btn8: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "red",
  },
  btn9: {
    marginTop: 10,
    alignSelf: 'flex-end',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "black",
  },
  textinput: {
    width: 190,
    height: 40,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'white',
  },
  textinput1: {
    width: 90,
    height: 40,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 10,
    textAlign: 'center',

    backgroundColor: '#C8C5C4',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
