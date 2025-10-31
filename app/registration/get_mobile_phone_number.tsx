import Container from "@/components/Container";
import StyledTextInput from "@/components/StyledTextInput";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { RegistrationRootStackParamList } from "@/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Dimensions, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";

type MobilePhneNavigationProp = StackNavigationProp<RegistrationRootStackParamList, 'GetMobilePhone'>;

export default function GetUserMobilePhoneScreen(){
    const navigation = useNavigation<MobilePhneNavigationProp>();
    const [phone, setPhone] = useState<string>("");

    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const safeHeight = height - insets.top - insets.bottom;
    
    const handleNext = () => {
        navigation.navigate('GetEmail')
    }

    return(
        <Container>
            <View style={{height: safeHeight, width: "100%"}}>
                <ThemedText type="h1">
                    Step 1
                </ThemedText>
                <View style={{flex: 1, paddingTop: 48}}>
                    <ThemedText type="h1">
                        Enter Your Mobile Phone Number 
                    </ThemedText>
                    <ThemedText style={{marginTop: 6}}>
                        We'll send a verification code to your mobile number
                    </ThemedText>

                    <StyledTextInput
                        style={{
                            marginTop: 48,
                            flex: 1
                        }}
                        placeholder="Enter Your Phone Number"
                        value={phone}
                        onChangeText={(phone) => setPhone(phone)}
                    />
                </View>

                <View>
                    <ThemedButton title="Next" onPress={handleNext}/>
                </View>
                
            </View>


        </Container>
    )
}