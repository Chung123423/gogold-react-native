import Container from "@/components/Container";
import Header from "@/components/Header";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SERVER_URL } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

export default function BindMachine(){
    const router = useRouter();
    const { gold_machine_name, session_id } = useLocalSearchParams<{
        gold_machine_name?: string;
        session_id?: string;
    }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pinCode, setPinCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // Updated: Destructure the logout function from useAuth
    const { authState, logout } = useAuth();
    
    const navigateToRecyclingRecords = () => {
        router.navigate('/account')
    }

    const fetchPinCode = async () => {
        if (!session_id) {
            setError('Session ID is missing. Please go back and scan the QR code again.');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            
            const response = await axios.get(`${SERVER_URL}/api/app/pin_code?session_id=${session_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authState.token
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to fetch PIN code');
            }

            setPinCode(response.data.pin_code);
        } catch (err) {
            setError('Error fetching PIN code. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // New: Function to handle logout
    const handleLogout = () => {
        logout(); // Clear auth state
        router.navigate('/'); // Navigate to the home page
    }

    return (
        <Container>
            <Header />
            <View style={styles.content}>
                <ThemedText color={Colors.light_gold} type="defaultSemiBold">你已成功綁定</ThemedText>
            </View>

            <View style={styles.card}>
                <ThemedText type="h2">黃金回收機</ThemedText>
                <ThemedText>{gold_machine_name}</ThemedText>
            </View>
            <ThemedText type='defaultSemiBold'>請跟據回收機指示去完成回收步驟</ThemedText>

            <View style={{marginTop: 18, width: '100%'}}>
                <ThemedButton title="回收記錄" onPress={navigateToRecyclingRecords}/>
                <ThemedButton 
                    title={isLoading ? "載入中..." : "顯示我的PIN"} 
                    variant="secondary"
                    onPress={fetchPinCode}
                    disabled={isLoading || !session_id}
                />
            </View>
            {pinCode && (
                <View style={styles.pinContainer}>
                    <ThemedText type="defaultSemiBold">你的PIN碼: {pinCode}</ThemedText>
                </View>
            )}

            {error && (
                <View style={styles.errorContainer}>
                    <ThemedText color="red" type="default">{error}</ThemedText>
                </View>
            )}

            <View style={styles.footer}>
                <ThemedButton title="登出" onPress={handleLogout} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 50
    },
    card: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#666666',
        padding: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        width: '100%'
    },
    footer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end'
    },
    pinContainer: {
        marginTop: 18,
        padding: 12,
        backgroundColor: 'black',
        borderRadius: 8,
        alignItems: 'center',
    },
    errorContainer: {
        marginTop: 18,
        padding: 12,
        alignItems: 'center',
    }
})