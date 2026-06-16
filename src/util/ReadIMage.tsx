import { Images } from '../const/images';

export const getImageSource = (img: any) => {
  if (!img) return null;
  if (
    typeof img === 'string' &&
    (img.startsWith('http://') || img.startsWith('https://'))
  ) {
    return { uri: img };
  }
  if (typeof img === 'string' && img.startsWith('file')) {
    return { uri: img };
  }
  if (typeof img === 'string') {
    return Images[img];
  }
  return img;
};
