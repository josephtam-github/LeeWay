import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert, Image } from 'react-native';
import Button from '../components/Button';
import CameraComponent from '../components/CameraComponent';
import DesignSuggestionCard from '../components/DesignSuggestionCard';
import geminiService from '../services/gemini';
import { DesignRequest, DesignResponse, RoomType, DesignStyle } from '../types';

const HomeScreen: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [designResponse, setDesignResponse] = useState<DesignResponse | null>(null);

  const handlePhotoTaken = async (uri: string) => {
    setCapturedImage(uri);
    setShowCamera(false);
    
    // Auto-analyze the image
    await analyzeRoom(uri);
  };

  const analyzeRoom = async (imageUri?: string) => {
    setIsAnalyzing(true);
    setDesignResponse(null);

    try {
      const request: DesignRequest = {
        id: Date.now().toString(),
        imageUri: imageUri || capturedImage || undefined,
        description: 'Please analyze this room and provide design suggestions',
        roomType: 'living-room' as RoomType,
        style: 'modern' as DesignStyle,
        timestamp: new Date()
      };

      const response = await geminiService.analyzeRoom(request);
      
      if (response) {
        setDesignResponse(response);
      } else {
        Alert.alert('Error', 'Failed to analyze room. Please try again.');
      }
    } catch (error) {
      console.error('Error analyzing room:', error);
      Alert.alert('Error', 'Failed to analyze room. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetApp = () => {
    setCapturedImage(null);
    setDesignResponse(null);
    setIsAnalyzing(false);
  };

  if (showCamera) {
    return (
      <CameraComponent
        onPhotoTaken={handlePhotoTaken}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white shadow-sm">
          <View className="px-6 py-4">
            <Text className="text-3xl font-bold text-gray-900">Leeway</Text>
            <Text className="text-gray-600 mt-1">AI-Powered Interior Design</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 p-6">
          {!capturedImage && !designResponse ? (
            // Welcome State
            <View className="flex-1 justify-center items-center">
              <Text className="text-6xl mb-6">🏠</Text>
              <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Transform Your Space
              </Text>
              <Text className="text-gray-600 text-center mb-8 text-lg leading-6">
                Take a photo of your room and get personalized design suggestions from our AI
              </Text>
              
              <View className="w-full max-w-xs">
                <Button
                  title="Take Photo"
                  onPress={() => setShowCamera(true)}
                  variant="primary"
                  size="large"
                  className="mb-4"
                />
                <Button
                  title="Analyze Without Photo"
                  onPress={() => analyzeRoom()}
                  variant="outline"
                  size="large"
                />
              </View>
            </View>
          ) : (
            // Results State
            <View>
              {/* Image Preview */}
              {capturedImage && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-gray-900 mb-3">Your Room</Text>
                  <Image
                    source={{ uri: capturedImage }}
                    className="w-full h-48 rounded-lg"
                    resizeMode="cover"
                  />
                </View>
              )}

              {/* Analysis Status */}
              {isAnalyzing && (
                <View className="bg-blue-50 p-4 rounded-lg mb-6">
                  <Text className="text-blue-800 font-medium">Analyzing your room...</Text>
                  <Text className="text-blue-600 text-sm mt-1">
                    Our AI is reviewing your space and preparing personalized suggestions
                  </Text>
                </View>
              )}

              {/* Design Suggestions */}
              {designResponse && (
                <View className="mb-6">
                  <Text className="text-xl font-bold text-gray-900 mb-4">Design Analysis</Text>
                  
                  {/* Analysis */}
                  <View className="bg-white p-4 rounded-lg mb-4">
                    <Text className="text-gray-800 leading-6">{designResponse.analysis}</Text>
                  </View>

                  {/* Suggestions */}
                  <Text className="text-lg font-semibold text-gray-900 mb-3">Suggestions</Text>
                  {designResponse.suggestions.map((suggestion) => (
                    <DesignSuggestionCard
                      key={suggestion.id}
                      suggestion={suggestion}
                    />
                  ))}
                </View>
              )}

              {/* Action Buttons */}
              <View className="flex-row gap-3 mt-6">
                <Button
                  title="Take Another Photo"
                  onPress={() => setShowCamera(true)}
                  variant="primary"
                  className="flex-1"
                />
                <Button
                  title="Start Over"
                  onPress={resetApp}
                  variant="outline"
                  className="flex-1"
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;