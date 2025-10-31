import Container from '@/components/Container';
import { useRoute } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';

const BuyGoldScreen: React.FC = () => {
  
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://192.168.50.244/api/app/payment/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer, error } = await response.json();

    if(error){
      Alert.alert("Error: ", error);
    }
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (error) {
      console.error("initPaymentSheet error", error);
    } else {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    console.log('error ', error)
    if (error) {
      console.error(`Error code: ${error.code}`, error.message)
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>Buy Gold</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.productCard}>
          <Image
            source={require('../../assets/images/gold-ring.jpg')} // Replace with actual image path in your project
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text style={styles.productName}>Gold Ring</Text>
          <Text style={styles.productDetails}>375 Gold Hallmark</Text>
          <Text style={styles.productDetails}>Average weight 1.7g</Text>
          <Text style={styles.productDetails}>Price: 3000 HKD</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={openPaymentSheet}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  productCard: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  productDetails: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default BuyGoldScreen;