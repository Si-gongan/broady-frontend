import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CommentStackParamList } from '../../navigations';

export const useCommentNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<CommentStackParamList>>();

    return navigation;
};
