import * as ImagePicker from 'expo-image-picker';

export const takePhoto = async () => {
  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

  if (cameraStatus !== 'granted') {
    return;
  }

  const imageData = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.2,
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
    quality: 0.2,
  });
  return imageData;
};
