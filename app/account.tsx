import Container from '@/components/Container';
import Header from '@/components/Header';
import StyledTextInput from '@/components/StyledTextInput';
import ThemedButton from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import MyAccount from './account_tabs/myaccount';
import Records from './account_tabs/records';
import RecyclingStatusScreen from './account_tabs/recycling_status';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

 export default function AccountScreen(){
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['我的帳號', '回收狀態', '交易記錄'];
    

    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const safeHeight = height - insets.top - insets.bottom;
    
    return (
        <Container>
            <View style={{height: safeHeight, width: '100%'}}>
              <Header />
              {/* <ThemedButton title={'使用黃金ATM機購買黃金'} variant='secondary' iconName='scan-outline' onPress={ () => { router.navigate('/payment_pages/buy_gold_screen') } } /> */}
              <ThemedButton title={'使用黃金回收機'} variant='secondary' iconName='scan-outline' onPress={ () => {router.navigate('/scan-qrcode')} } />
              <ThemedButton title="附近回收機" variant="secondary" iconName="location-outline" onPress={ () => {router.navigate('/coming_soon')} }/>
              <StyledTextInput icon="search" placeholder="Search" />
              <View style={account_styles.container}>
                  <View style={account_styles.tabsContainer}>
                      {tabs.map((tab, index) => (
                      <TouchableOpacity
                          key={index}
                          style={account_styles.tab}
                          onPress={() => setActiveTab(index)}
                      >
                          <Text style={[
                          account_styles.tabText,
                          activeTab === index && account_styles.activeTabText
                          ]}>
                          {tab}
                          </Text>
                          {activeTab === index && <View style={account_styles.underline} />}
                      </TouchableOpacity>
                      ))}
                  </View>
              </View>
              <View style={account_styles.content}>
                  {activeTab === 0 && <MyAccount />}
                  {activeTab === 1 && <RecyclingStatusScreen />}
                  {activeTab === 2 && <Records />}
              </View>
            </View>
        </Container>
    )
 }


 const account_styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 0,
      borderBottomColor: '#e0e0e0',
    },
    tab: {
      paddingVertical: 10,
      alignItems: 'center',
    },
    tabText: {
      fontSize: 18,
      color: 'white',
    },
    activeTabText: {
      color: Colors.light_gold,
      fontWeight: 'bold',
    },
    underline: {
      height: 3,
      backgroundColor: Colors.light_gold,
      width: '100%',
      position: 'absolute',
      bottom: -1,
    },
    content: {
      alignItems: 'center',
      width: '100%',
      flex: 1,
    },
  });
