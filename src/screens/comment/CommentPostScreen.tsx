import { CommentStackParamList } from '@/navigations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';

type Props = NativeStackScreenProps<CommentStackParamList, 'Post'>;

export default function CommentPostScreen({ route, navigation }: Props) {
    console.log(route.params.post)
    return (
        <View>
            <Text>CommentPostScreen</Text>
        </View>
    );
}
