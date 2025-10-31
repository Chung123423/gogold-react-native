import Container from '@/components/Container';
import Header from '@/components/Header';
import LinkButton from '@/components/LinkButton';
import ScanAnimation from '@/components/ScanAnimation';
import StyledTextInput from '@/components/StyledTextInput';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { StyleSheet, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '../types';
import { useRouter } from 'expo-router';
import axios from 'axios';


export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, authState } = useAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        setIsLoading(true);
        try {
            const credentials: LoginCredentials = { username, password };
            const token = await login(credentials);
            if (token) {
                router.push('/account');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    Alert.alert('Login Failed', 'Username or Password is incorrect');
                }
            } else {
                Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred during login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (

            <Container>
                <Header />
                <ScanAnimation />
                {/* <Image source={require("@/assets/images/gold.png")} style={styles.image}/> */}

                <View style={styles.content}>
                    <ThemedText>只需15分鐘 讓你的黃金變現金</ThemedText>
                    <ThemedText type="title" style={{ color: Colors.light_gold }}>
                        HK$4,926
                    </ThemedText>
                    <ThemedText>估值 (4.26克)</ThemedText>
                </View>

                <View style={styles.section}>
                    <StyledTextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        editable={!isLoading}
                        autoCapitalize="none"
                    />
                    <StyledTextInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        editable={!isLoading}
                        autoCapitalize="none"
                    />
                    <ThemedButton
                        title="登入"
                        variant="secondary"
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                    <ThemedButton
                        title="新用戶注冊"
                        onPress={() => router.navigate('/registration')}
                    />
                    <View style={{ marginTop: 12 }}>
                        <LinkButton title="Forget Password" />
                    </View>
                </View>
            </Container>

    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: '100%'
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    content: {
        alignItems: 'center',
    },
    image: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
        backgroundColor: '#86ACB3',
        marginBottom: 40,
    },
    section: {
        marginTop: 20,
        width: '100%',
    },
});