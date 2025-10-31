import { ThemedText } from '@/components/ThemedText';
import { SERVER_URL } from '@/config';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface Record {
  id: string;
  price: number;
  weight: number;
  gold_content: number;
  service_fee: number;
  locked_gold_price: number;
  status: string;
}

export default function Records() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { login, authState } = useAuth();
  
  // Sample records as fallback
  const sample_records: Record[] = [
    {
      id: "125342",
      price: 4926,
      weight: 1.26,
      gold_content: 99.9,
      service_fee: 232,
      locked_gold_price: 1156,
      status: 'success'
    },
  ];

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_URL}/api/app/transactions`, {
          // Add secure configuration
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': authState.token
          },
        });
        const fetchedRecords: Record[] = response.data || sample_records;
        //sort record
        fetchedRecords.sort((a, b) => parseInt(b.id) - parseInt(a.id));

        setRecords(fetchedRecords);

      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Failed to fetch records');
        setRecords(sample_records);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return Colors.light_gold;
      case 'cancelled':
        return Colors.purple1;
      default:
        return '#9E9E9E';
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return "成功交易";
      case 'cancelled_agreement':
      case 'cancelled_after_detected':
        return "交易取消";
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ThemedText color="red">{error}</ThemedText>
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
      {records.map((record, index) => (
        <View key={record.id} style={styles.card}>
          <View style={styles.header}>
            <ThemedText color={Colors.light_gold} type='defaultSemiBold'>#{record.id}</ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText color={getStatusColor(record.status)} type='h2'>
              黃金價值 HK${record.price}
            </ThemedText>
            <ThemedText color={getStatusColor(record.status)} type='h2'>
              {getStatus(record.status)}
            </ThemedText>
          </View>


          <View style={styles.row}>
              <View>
                  <ThemedText type='subtitle'>${record.locked_gold_price}</ThemedText>
                  <ThemedText type='sm_text'>即時金價(克)</ThemedText>
              </View>
              <View>
                  <ThemedText type='subtitle'>{record.weight}</ThemedText>
                  <ThemedText type='sm_text'>檢測重量</ThemedText>
              </View>
              <View>
                  <ThemedText type='subtitle'>{record.gold_content}%</ThemedText>
                  <ThemedText type='sm_text'>檢測含金量</ThemedText>
              </View>
              <View>
                  <ThemedText type='subtitle'>${record.service_fee}</ThemedText>
                  <ThemedText type='sm_text'>服務收費</ThemedText>
              </View>
          </View>
          {index < records.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1
  },
  card: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  idText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginTop: 12,
  },
});