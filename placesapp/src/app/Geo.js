import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import MapView, { Marker } from 'react-native-maps';

const API_KEY = 'AIzaSyDXKRrV0kB6zmmI8JhpudGgZK9arN5B9xo'; // Replace with your Google API key

const Geo = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchPlaces = useCallback(async (text) => {
    if (text.trim().length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      text
    )}&language=tr&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        setSearchResults(data.results);
      } else if (data.status === 'ZERO_RESULTS') {
        Alert.alert('No Results', 'No places found for the given query.');
        setSearchResults([]);
      } else {
        throw new Error(data.error_message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      Alert.alert('Error', 'Unable to fetch places. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectFromList = (item) => {
    const location = {
      latitude: item.geometry.location.lat,
      longitude: item.geometry.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      name: item.name,
      address: item.formatted_address,
    };
    setSelectedLocation(location);
    setQuery(item.name);
    setSearchResults([]);
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const topResult = data.results[0];

        const plusCode = data.plus_code?.global_code || null;
        const uniqueIdentifier = plusCode || topResult.place_id || 'Unknown Identifier';

        return {
          address: topResult.formatted_address || 'Unknown Address',
          uniqueIdentifier,
        };
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
          console.error('Error fetching address:', error);

  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setLoading(true);
    const result = await fetchAddressFromCoordinates(latitude, longitude);
    const uniqueIdentifier = typeof result === 'string' ? 'Unknown uniqueIdentifier' : result.uniqueIdentifier;
    const address = typeof result === 'string' ? result : result.address;

    const location = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      name: uniqueIdentifier,
      address: address,
    };
    
    setSelectedLocation(location);
    setQuery('');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Places</Text>

      <Autocomplete
        data={searchResults}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          searchPlaces(text);
        }}
        flatListProps={{
          keyExtractor: (item) => item.place_id,
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => handleSelectFromList(item)}>
              <Text style={styles.resultItem}>{item.name}</Text>
            </TouchableOpacity>
          ),
          style: styles.dropdown,
        }}
        inputContainerStyle={styles.inputContainer}
        listContainerStyle={styles.dropdownList}
        placeholder="Search places...(min: 3)"
      />

      {loading && <ActivityIndicator size="large" color="#333" style={styles.loader} />}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedLocation?.latitude || 37.78825,
          longitude: selectedLocation?.longitude || -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        region={
          selectedLocation
            ? {
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: selectedLocation.latitudeDelta,
                longitudeDelta: selectedLocation.longitudeDelta,
              }
            : undefined
        }
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title={selectedLocation.name}
            description={selectedLocation.address}
          />
        )}
      </MapView>

      

      <TouchableOpacity
        style={styles.logButton}
        onPress={() => {
          if (selectedLocation) {
            Alert.alert(
              'Selected Location',
              `Name: ${selectedLocation.name}\nAddress: ${selectedLocation.address}`
            );
          } else {
            Alert.alert('No location selected');
          }
        }}
      >
        <Text style={styles.logButtonText}>Log Selected Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Geo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropdown: {
    maxHeight: 200,
    borderRadius: 8,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 10,
  },
  map: {
    flex: 1,
    borderRadius: 8,
    marginTop: 10,
  },
  logButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});
