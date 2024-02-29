import FlexBox from '@/components/common/FlexBox';
import Typography from '@/components/common/Typography';
import { THEME } from '@/constants/theme';
import { View, Image } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: ({
    text1,
    props,
  }: {
    text1?: string;
    props: {
      uuid: string;
    };
  }) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: THEME.COLOR.BLACK,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {text1 && (
        <Typography size="body_md" color={THEME.COLOR.WHITE} weight="medium">
          {text1}
        </Typography>
      )}
    </View>
  ),

  error: ({
    text1,
    text2,
    props,
  }: {
    text1?: string;
    text2?: string;
    props: {
      uuid: string;
    };
  }) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: THEME.COLOR.BLACK,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlexBox alignItems="center">
        <Image source={require('@/../assets/images/warning.png')}></Image>
        {text1 && (
          <Typography size="body_md" color={THEME.COLOR.WHITE} weight="medium">
            {text1}
          </Typography>
        )}
      </FlexBox>

      {text2 && (
        <Typography size="body_md" color={THEME.COLOR.WHITE} weight="medium">
          {text2}
        </Typography>
      )}
    </View>
  ),
  /*
        Or create a completely new type - `tomatoToast`,
        building the layout from scratch.
    
        I can consume any custom `props` I want.
        They will be passed when calling the `show` method (see below)
      */
};
