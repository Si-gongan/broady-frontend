import { Image, Pressable } from "react-native";
import { useTheme } from "styled-components/native";
import Typography from "../common/Typography";
import { GET_PADDING } from "@/constants/theme";

export const MyPageButton = ({ image, title, onPress }: { image: any, title: string, onPress: () => void }) => {
    const theme = useTheme();

    return (
        <Pressable onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: theme.COLOR.WHITE, height: 68, padding: GET_PADDING("P4"), borderRadius: theme.STYLES.RADIUS.lg }}>
            <Image source={image} style={{ width: 36, height: 36 }} />
            <Typography size="body_lg" weight="bold" color={theme.COLOR.GRAY_ICON} styles={{ textAlign: "center" }}>{title}</Typography>
        </Pressable>
    );
}