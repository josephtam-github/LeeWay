import React, { useState, useRef } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Button from './Button';
import cameraService from '../services/camera';

interface CameraComponentProps {
  onPhotoTaken: (uri: string) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onPhotoTaken, onClose }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-center p-4">Requesting camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-6">
        <Text className="text-white text-center text-lg mb-6">
          We need your permission to show the camera
        </Text>
        <Button
          title="Grant Permission"
          onPress={requestPermission}
          variant="primary"
        />
        <Button
          title="Cancel"
          onPress={onClose}
          variant="outline"
          className="mt-3"
        />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    try {
      const uri = await cameraService.takePicture({ current: cameraRef.current });
      if (uri) {
        onPhotoTaken(uri);
      } else {
        Alert.alert('Error', 'Failed to take picture');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take picture');
      console.error('Error taking picture:', error);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing={facing}
      >
        <View className="flex-1 justify-end items-center pb-8">
          <View className="flex-row items-center justify-between w-full px-8">
            <Button
              title="Cancel"
              onPress={onClose}
              variant="outline"
              size="small"
            />
            
            <View className="w-20 h-20 rounded-full border-4 border-white items-center justify-center">
              <Button
                title=""
                onPress={takePicture}
                className="w-16 h-16 rounded-full bg-white"
              />
            </View>
            
            <Button
              title="Flip"
              onPress={toggleCameraFacing}
              variant="outline"
              size="small"
            />
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraComponent;