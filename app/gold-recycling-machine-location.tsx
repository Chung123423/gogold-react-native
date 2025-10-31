import Container from '@/components/Container';
import StyledTextInput from '@/components/StyledTextInput';
import ThemedButton from '@/components/ThemedButton';
import * as Location from 'expo-location';
import { PermissionStatus } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

export default function GoldRecyclingMachineLocationScreen() {
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  const recyclingMachines = [
    { latitude: 22.4636, longitude: 114.0062 }, // Example: Eiffel Tower area
    { latitude: 48.8600, longitude: 2.3500 }, // Nearby location in Paris
  ];

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === PermissionStatus.GRANTED);

      if (status === PermissionStatus.GRANTED) {
        const location = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <Container isPadding={false}>
      <MapView
        style={styles.map}
        showsUserLocation={locationPermission === true}
        initialRegion={initialRegion ?? undefined}
        region={initialRegion ?? undefined}
        mapType={'satellite'}
      >
        {/* Render markers for each recycling machine location */}
        {recyclingMachines.map((machine, index) => (
          <Marker
            key={index}
            coordinate={machine}
            title={`Recycling Machine ${index + 1}`}
          />
        ))}
      </MapView>


      
      <View style={styles.container}>
        <ThemedButton title="附近回收機" variant="secondary" iconName="location-outline" />
        <StyledTextInput icon="search" placeholder="Search" />
        <ThemedButton title="返回" />
      </View>
    </Container>
  );
}
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  map: {
    width: '100%',
    height: windowHeight / 2,
  }
});