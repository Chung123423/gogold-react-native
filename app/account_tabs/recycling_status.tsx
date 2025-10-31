import { ThemedText } from '@/components/ThemedText';
import { SERVER_URL } from '@/config';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';


interface GoldRecyclingRecord {
    id: string,
    status: string,
    machine_name: string
}

export default function RecyclingStatusScreen(){
    const [records, setRecords] = useState<GoldRecyclingRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const { login, authState } = useAuth();
    
    const sample_data = [
        {
            id: '123456',
            status: 'success',
            machine_name: 'Causeway Bay GoGold Kiosk A',
        },
        {
            id: '123456',
            status: 'pending',
            machine_name: 'Causeway Bay GoGold Kiosk A',
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
          case 'completed':
            return Colors.light_gold
          case 'cancelled':
            return Colors.purple1;
          default:
            return Colors.purple1;
        }
    };

    const getStatus = (status: string, remaining_time: number) => {
        switch (status) {
            case 'completed':
                return "成功回收"
            case 'cancelled_agreement':
            case 'cancelled_after_detected':
                return "回收取消"
            case 'detected':
                return "檢測完成"
            case 'smelted':
                return '熔煉完成'
            case 'pending':
                return remaining_time+' 分鐘'
        }
    }
    
    useEffect(() => {
        const fetchRecords = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/app/recycling-status`, {
                // Add secure configuration
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authState.token
                },
            });
            const fetchedRecords: GoldRecyclingRecord[] = response.data
            //sort record
            fetchedRecords.sort((a, b) => parseInt(b.id) - parseInt(a.id));

            setRecords(fetchedRecords);
        } catch (err) {
            console.error('Error fetching records:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchRecords();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
            <ThemedText>Loading...</ThemedText>
            </View>
        );
    }

    if(records.length === 0){
        return (
            <View>
            <ThemedText 
                color="gray" 
                type="h2"
                style={{textAlignVertical: 'center', height: '100%'}}
            >
                沒有記錄
            </ThemedText>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {records.map((data, index) => (
                <View key={index} style={[styles.card, data.status === 'pending' ? styles.processing : '']}>
                    <ThemedText color={Colors.light_gold} type='defaultSemiBold'>#{data.id}</ThemedText>
                    

                    <View style={styles.row}>
                        <ThemedText type='h2'>黃金回收機</ThemedText>
                        <ThemedText type='h2' color={getStatusColor(data.status)}>
                            {getStatus(data.status, 0)}
                        </ThemedText>
                    </View>

                    <ThemedText>{data.machine_name}</ThemedText>
                    {index < records.length - 1 && <View style={styles.divider} />}
                </View>
                
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    },
    card: {
        marginTop: 12,
    },
    processing: {
        borderColor: '#727272',
        borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginTop: 12,
    },
})