import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, View } from 'react-native';

const ScanAnimation = () => {
  const scanLinePosition = useRef(new Animated.Value(0)).current;
  const scanAreaHeight = 220; // Adjust this based on your scan area height

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLinePosition, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLinePosition, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
        <Image source={require("../assets/images/gold.png")} style={styles.image}/>
      <View style={[styles.scanArea]}>
        
        {/* The animated scan line */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [{
                translateY: scanLinePosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, scanAreaHeight - 2] // -2 to account for line height
                })
              }]
            }
          ]}
        />

        <Animated.View 
            style={[
                {
                    transform: [{
                      translateY: scanLinePosition.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, scanAreaHeight - 2] // -2 to account for line height
                      })
                    }]
                  }
            ]}
        >
            <LinearGradient
                colors={['white', 'rgba(255,255,255,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.rectangle}
            />
        </Animated.View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  scanArea: {
    width: Dimensions.get('window').width,
    height: 220,
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute'
  },
  image: {
    position: 'absolute',
    width: 220,
    height: 220,
    resizeMode: 'contain',  
    backgroundColor: '#86ACB3',
    marginBottom: 40,
    marginLeft: (Dimensions.get('window').width - 220) / 2,
  },
  rectangle: {
    width: 220,
    height: 40,
    marginLeft: (Dimensions.get('window').width - 220) / 2
  }
});

export default ScanAnimation;
