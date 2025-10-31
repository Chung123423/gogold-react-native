import Container from "@/components/Container";
import StyledTextInput from "@/components/StyledTextInput";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { RegistrationRootStackParamList } from "@/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Dimensions, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";




export default function GetUserEmailScreen(){
    
    const [phone, setPhone] = useState<string>("");

    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const safeHeight = height - insets.top - insets.bottom;

    const handleNext = () => {
        

    }

    return(
        <Container>
            <View style={{height: safeHeight, width: "100%"}}>
                <ThemedText type="h1">
                    Step 3
                </ThemedText>
                <View style={{flex: 1, paddingTop: 48}}>
                    <ThemedText type="h1">
                        Enter Your Email Address
                    </ThemedText>
                    <ThemedText style={{marginTop: 6}}>
                        We'll send a verification code to your mobile number
                    </ThemedText>

                    <StyledTextInput
                        style={{
                            marginTop: 48,
                            flex: 1
                        }}
                        placeholder="Enter Your Email Address"
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