import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const openCamera = async () => {
    try {
        const result = await launchCamera({
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        });

        if (result.didCancel || result.errorCode) {
            return null;
        }

        return result?.assets?.[0]?.uri ?? null;
    } catch (error) {
        console.log('Camera Error:', error);
        return null;
    }
};

export const openGallery = async () => {
    try {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        if (result.didCancel || result.errorCode) {
            return null;
        }

        return result?.assets?.[0]?.uri ?? null;
    } catch (error) {
        console.log('Gallery Error:', error);
        return null;
    }
};