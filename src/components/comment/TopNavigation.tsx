import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import Typography from "../common/Typography";
import { useNavigation } from "@react-navigation/native";

export const TopNavigation = ({ title, isButton }: { title: string, isButton: boolean }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    const onPressMenu = () => {
        console.log('menu');
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 56 }}>
            <Pressable onPress={goBack}>
                <Image source={require('../../../assets/images/comment/chevron-right.png')} style={{ width: 28, height: 28 }} />
            </Pressable>
            <Typography size="body_xl" weight="medium" color={theme.COLOR.BLACK} styles={{ textAlign: "center" }}>
                {title}
            </Typography>
            {isButton ? 
                <Pressable onPress={onPressMenu}>
                    <Image source={require('../../../assets/images/comment/menu.png')} style={{ width: 28, height: 28 }} />
                </Pressable> 
            : <View style={{ width: 28, height: 28 }} />}
        </View>
    );
}
