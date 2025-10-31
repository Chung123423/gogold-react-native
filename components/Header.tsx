import { Colors } from '@/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Header(){
    return (
        <View style={styles.content}>
            <Text style={{color: Colors.dark_gold}}>黃金變現</Text>
            <Image source={require("@/assets/images/go_gold_logo.png")} style={styles.image} />
            <Text style={{color: Colors.dark_gold}}>一鍵回收</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: '#BE9A60',
    },
    image: {
        width: 110,
        height: 100,
        resizeMode: 'contain',
        
    }
});