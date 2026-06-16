import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { primaryColor, seconDaryColor, seconderyText } from '../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserImages } from '../const/images';
import GridImage from '../ReusableCOmponent/GridImage';
import { useSelector, useDispatch } from 'react-redux';
import { Appdispatch, StoreState } from '../redux/store/Store';
import { saveImage } from '../redux/redusers/reducers';
import { UpdateUserImage } from '../redux/actions/actiont';
import { getImageSource } from '../util/ReadIMage';
import { openCamera, openGallery } from '../util/ImagePicker';

const ProfileComponents = () => {
  const dispatch = useDispatch<Appdispatch>();
  const { presentUser, image }: any = useSelector(
    (state: StoreState) => state.globle,
  );

  // const { image } = useSelector((state: StoreState) => state.globle);
  const [selectedImageId, setSelectedImageId] = useState('');
  const [avatarIMage, setavatarIMage] = useState('');

  // Profile user profile selection --------------------------------

  //--------------------- Open the camera -----------------------------

  const OpenCamera = async () => {
    const uri = await openCamera();
    if (uri) {
      dispatch(saveImage(uri));
      dispatch(
        UpdateUserImage({
          userId: presentUser.id,
          image: uri,
        }),
      );
      setSelectedImageId('');
    }
  };

  //---------------- Open the Galley ---------------------

  const OpenGallery = async () => {
    const uri = await openGallery();
    if (uri) {
      dispatch(saveImage(uri));
      dispatch(
        UpdateUserImage({
          userId: presentUser.id,
          image: uri,
        }),
      );
      setSelectedImageId('');
    }
  };

  //-------------------------- save Image ---------------------

  const handleSave = () => {
    if (selectedImageId) {
      const selectedImage = UserImages.find(
        item => item.key === selectedImageId,
      );
      if (selectedImage) {
        dispatch(saveImage(selectedImageId));
        dispatch(
          UpdateUserImage({
            userId: presentUser.id,
            image: avatarIMage,
          }),
        );
        setSelectedImageId('');
      }
    }
  };

  //----------------- Remove the Image-------------------

  const handleRemove = () => {
    dispatch(saveImage(null));
    dispatch(
      UpdateUserImage({
        userId: presentUser.id,
        image: '',
      }),
    );
    setSelectedImageId('');
  };

  useEffect(() => {
    console.log(presentUser);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Profile Image</Text>
      <View style={[styles.ProfileImage, { borderWidth: image ? 0 : 2 }]}>
        {image ? (
          <Image
            source={getImageSource(image)}
            style={styles.profileImagePreview}
          />
        ) : (
          <Icon name="person-outline" size={60} />
        )}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => OpenCamera()}
          style={styles.imageButtons}
        >
          <Text style={styles.buttonText}>Image from Camera</Text>
          <View style={styles.Icon}>
            <Icon name="camera" size={30} color={seconDaryColor} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => OpenGallery()}
          style={styles.imageButtons}
        >
          <Text style={styles.buttonText}>Image from gallery</Text>
          <View style={styles.Icon}>
            <Icon name="image" size={30} color={seconDaryColor} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.imageContainer}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {UserImages?.map(item => (
            <View
              key={item.key}
              style={[
                styles.imageSelectWrapper,
                selectedImageId === item.key && styles.imageSelectWrapperActive,
              ]}
            >
              <GridImage
                widthLoader="100%"
                imagePading={0}
                imageHeight={100}
                key={item.key}
                image={item.image}
                isSelected={false}
                onPress={() => {
                  setSelectedImageId(
                    selectedImageId === item.key ? '' : item.key,
                  );
                  setavatarIMage(item.key);
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.actionGroup}>
        <TouchableOpacity
          onPress={handleSave}
          disabled={!selectedImageId}
          style={[styles.saveButton, { opacity: selectedImageId ? 1 : 0.5 }]}
        >
          <Text style={styles.SavenremoveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRemove}
          disabled={!image}
          style={[styles.removeButton, { opacity: image ? 1 : 0.5 }]}
        >
          <Text style={styles.SavenremoveText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  profileText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    backgroundColor: seconDaryColor,
    paddingTop: 10,
    paddingBottom: 20,
  },

  profileImagePreview: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  imagePlaceholder: {
    borderWidth: 1,
    borderColor: primaryColor,
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  ProfileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 'auto',
    marginVertical: 30,
    borderWidth: 2,
    height: 110,
    width: 110,
    borderColor: primaryColor,
  },

  buttonGroup: {
    marginHorizontal: 30,
    gap: 16,
    marginBottom: 20,
  },

  imageButtons: {
    backgroundColor: primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonText: {
    color: seconderyText,
    fontWeight: '700',
    fontSize: 20,
    paddingVertical: 10,
    marginEnd: 30,
  },

  Icon: {
    position: 'absolute',
    right: 20,
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 20,
    maxHeight: 450,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },

  item: {
    width: '33.33%',
    padding: 5,
  },

  imageWrapper: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  selectedWrapper: {
    borderColor: primaryColor,
  },

  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },

  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: primaryColor,
    borderRadius: 10,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionGroup: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    elevation: 50,
  },

  saveButton: {
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 30,
  },

  removeButton: {
    backgroundColor: '#ce3131',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 30,
  },

  SavenremoveText: {
    color: seconderyText,
    fontWeight: '700',
    fontSize: 20,
    paddingVertical: 10,
  },

  imageSelectWrapper: {
    width: '33.33%',
    padding: 3,
    borderWidth: 2.5,
    borderColor: 'transparent',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSelectWrapperActive: {
    borderColor: primaryColor,
  },
});
