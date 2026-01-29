import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { CameraPermissions } from '../types';

class CameraService {
  async requestPermissions(): Promise<CameraPermissions> {
    try {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();

      return {
        camera: cameraPermission.status === 'granted',
        mediaLibrary: mediaPermission.status === 'granted'
      };
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return {
        camera: false,
        mediaLibrary: false
      };
    }
  }

  async checkPermissions(): Promise<CameraPermissions> {
    try {
      const cameraPermission = await Camera.getCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.getPermissionsAsync();

      return {
        camera: cameraPermission.status === 'granted',
        mediaLibrary: mediaPermission.status === 'granted'
      };
    } catch (error) {
      console.error('Error checking permissions:', error);
      return {
        camera: false,
        mediaLibrary: false
      };
    }
  }

  async takePicture(cameraRef: any): Promise<string | null> {
    try {
      if (!cameraRef.current) {
        throw new Error('Camera reference not available');
      }

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false
      });

      return photo.uri;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    }
  }

  async saveToLibrary(imageUri: string): Promise<boolean> {
    try {
      const permissions = await this.checkPermissions();
      
      if (!permissions.mediaLibrary) {
        const newPermissions = await this.requestPermissions();
        if (!newPermissions.mediaLibrary) {
          throw new Error('Media library permission not granted');
        }
      }

      await MediaLibrary.saveToLibraryAsync(imageUri);
      return true;
    } catch (error) {
      console.error('Error saving to library:', error);
      return false;
    }
  }

  async pickFromLibrary(): Promise<string | null> {
    try {
      const permissions = await this.checkPermissions();
      
      if (!permissions.mediaLibrary) {
        const newPermissions = await this.requestPermissions();
        if (!newPermissions.mediaLibrary) {
          throw new Error('Media library permission not granted');
        }
      }

      const result = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
        first: 1,
        sortBy: 'creationTime'
      });

      if (result.assets.length > 0) {
        const asset = result.assets[0];
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        return assetInfo.localUri || assetInfo.uri;
      }

      return null;
    } catch (error) {
      console.error('Error picking from library:', error);
      return null;
    }
  }
}

export default new CameraService();