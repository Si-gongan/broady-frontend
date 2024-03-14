import { IPost } from "@/@types/post";
import { View, Pressable, Image } from "react-native";
import Typography from "../common/Typography";
import { useTheme } from 'styled-components/native';
import Margin from "../common/Margin";
import { GET_MARGIN, GET_PADDING } from "@/constants/theme";

const processingBadge = ({ post }: { post: IPost }) => {
    const theme = useTheme();

    const now = new Date();

    return (
        post.isComplete ? (
            <View style={{ borderRadius: theme.STYLES.RADIUS.sm, borderColor: theme.COLOR.MINT_2, borderWidth: 1, backgroundColor: theme.COLOR.WHITE, paddingHorizontal: GET_PADDING('P5') / 2, paddingVertical: GET_PADDING('P5') / 4 }}>
                <Typography size="body_sm" weight="medium" color={theme.COLOR.MINT_2}>완료</Typography>
            </View>
        ) : (
            post.availabilityState.expiredAt.toString() < now.toString() ? (
                <View style={{ borderRadius: theme.STYLES.RADIUS.sm, borderColor: theme.COLOR.MINT_2, borderWidth: 1, backgroundColor: theme.COLOR.WHITE, paddingHorizontal: GET_PADDING('P5') / 2, paddingVertical: GET_PADDING('P5') / 4 }}>
                    <Typography size="body_sm" weight="medium" color={theme.COLOR.MINT_2}>대기중</Typography>
                </View>
            ) : (
                <View style={{ borderRadius: theme.STYLES.RADIUS.sm, borderColor: theme.COLOR.MINT_2, borderWidth: 1, backgroundColor: theme.COLOR.WHITE, paddingHorizontal: GET_PADDING('P5') / 2, paddingVertical: GET_PADDING('P5') / 4 }}>
                    <Typography size="body_sm" weight="medium" color={theme.COLOR.MINT_2}>진행중</Typography>
                </View>
            )
        )
    );
}

export const PostListItem = ({ post, onPress }: { post: IPost; onPress: (post: IPost | null) => void }) => {
    const theme = useTheme();

    const imageSrc = process.env.EXPO_PUBLIC_S3_BUCKET_URL + "/" + post.photo;
    
    return (
        <>
            <Pressable onPress={() => onPress(post)} style={{ flex: 1, flexDirection: 'column', backgroundColor: theme.COLOR.WHITE, paddingHorizontal: GET_PADDING('P4'), paddingVertical: GET_PADDING('P2'), gap: 10, borderRadius: theme.STYLES.RADIUS.lg }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 8 }}>
                            <Typography size="body_xl" weight="bold" color={theme.COLOR.GRAY_ICON}>{post.title}</Typography>
                            {processingBadge({ post })}
                        </View>
                        <Typography size="body_md" color={theme.COLOR.BLACK}>포인트 : 50P</Typography>
                    </View>
                    <Image source={require("../../../assets/images/comment/arrow-right-bg.png")} style={{ width: 22, height: 22 }} />
                </View>
                <Image source={{ uri: imageSrc }} style={{ width: '100%', height: 200, borderRadius: theme.STYLES.RADIUS.lg }} />
            </Pressable>
            <Margin margin={GET_MARGIN('h6') * 2} />
        </>
    );
}

