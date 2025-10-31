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


export default function basicInformation(){

    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const safeHeight = height - insets.top - insets.bottom;

    return (
        <Container>
            <View style={{height: safeHeight, width: '100%'}}>
                {/* <ThemedText type="h1">
                    Step 5
                </ThemedText> */}
                <View style={{flex: 1, paddingTop: 24, width: '100%'}}>
                    <ThemedText type="h1">
                        Provide your information
                    </ThemedText>



                </View>

                <View>
                    <ThemedButton title="Next"/>
                </View>
                
            </View>


        </Container>
    )
}