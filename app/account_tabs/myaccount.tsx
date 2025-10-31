import LinkButton from "@/components/LinkButton"
import ThemedButton from "@/components/ThemedButton"
import { ThemedText } from "@/components/ThemedText"
import { useAuth } from "@/hooks/useAuth";
import { router, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native"

export default function MyAccount(){
    const { login, authState } = useAuth();
    
    return (
        <>
            <View style={{width: '100%', flex: 1}}>
                <View style={styles.section}>
                    <ThemedText type='defaultSemiBold'>Username</ThemedText>
                    <ThemedText darkColor='#B2B2B2'>{authState.user}</ThemedText>
                </View>


                <View style={styles.section}>
                    <ThemedText type='defaultSemiBold'>Password</ThemedText>
                    <View style={styles.password}>
                        <ThemedText darkColor='#B2B2B2'>*************</ThemedText>
                        <LinkButton title='更改密碼' underline/>
                    </View>
                    
                </View>


                <View style={styles.section}>
                    <ThemedText type='defaultSemiBold'>我的錢包</ThemedText>
                    <ThemedButton title='立即綁定' style={{marginTop: 10}}/>
                </View>
            </View>

            <View style={styles.bottom_section}>
                <LinkButton
                    title="隱私權政策"
                    onPress={() => router.navigate('/legal_pages/privacy_policy')}
                />
                <LinkButton
                    title="軟件特許條款"
                    onPress={() => router.navigate('/legal_pages/software_license')}
                />
                <LinkButton
                    title="服務條款"
                    onPress={() => router.navigate('/legal_pages/terms_and_condition')}
                />
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        justifyContent: 'flex-start',
        width: "100%",
        marginTop: 30,
    },
    password: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottom_section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})
