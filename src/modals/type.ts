import { DimensionValue, ImageResizeMode, ImageSourcePropType } from "react-native";

export type UserImageData = {
  key: string;
  image: any;
};

export interface GridImageProps {
  image: ImageSourcePropType;
  isSelected?: boolean;
  onPress?: () => void;
  imageHeight?: number;
  selectedBorderColor?: string;
  placeholderColor?: string;
  borderRadius?: number;
  widthLoader?: DimensionValue
  imagePading?: DimensionValue
  resizeImage?: ImageResizeMode
  imagemarginBottom?: number
  imagemaginH?: number
  shimmermarginbottom?: number
}