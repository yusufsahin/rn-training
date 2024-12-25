import { View, Text, StyleSheet, ActivityIndicator, PermissionsAndroid } from 'react-native';
import React, { useEffect,useState } from 'react'
import SimData from 'react-native-sim-data';

const SimInfo = () => {
  const [simInfo, setSimInfo] = useState(null);
  useEffect(() => {
    const fetchSimInfo = async () => {
      // İzinleri kontrol et
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // SIM kart bilgilerini al
        const info = SimData.getSimInfo();
        setSimInfo(info);
      } else {
        console.warn("READ_PHONE_STATE izni reddedildi.");
      }
    };

    fetchSimInfo();

  }, []); 
  if (!simInfo) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
    <Text style={styles.title}>SIM Kart Bilgileri</Text>
    <Text style={styles.info}>Carrier Name: {simInfo.carrierName0}</Text>
    <Text style={styles.info}>Country Code (MCC): {simInfo.mcc0}</Text>
    <Text style={styles.info}>Network Code (MNC): {simInfo.mnc0}</Text>
    <Text style={styles.info}>SIM Serial Number: {simInfo.simSerialNumber0}</Text>
    <Text style={styles.info}>Phone Number: {simInfo.phoneNumber0}</Text>
  </View>
  )
}

export default SimInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
});