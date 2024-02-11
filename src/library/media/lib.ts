import * as ImagePicker from 'expo-image-picker';

const IMAGE_QUALITY = 0.2; // 0 ~ 1

export const takePhoto = async () => {
  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

  if (cameraStatus !== 'granted') {
    return;
  }

  const imageData = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: IMAGE_QUALITY,
  });
  return imageData;
};

export const pickImage = async () => {
  const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (mediaStatus !== 'granted') {
    return;
  }

  const imageData = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: IMAGE_QUALITY,
  });
  return imageData;
};
