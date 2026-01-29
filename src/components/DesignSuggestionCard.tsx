import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { DesignSuggestion } from '../types';

interface DesignSuggestionCardProps {
  suggestion: DesignSuggestion;
}

const DesignSuggestionCard: React.FC<DesignSuggestionCardProps> = ({ suggestion }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    // In a real app, you would use actual icons
    switch (category) {
      case 'furniture':
        return '🪑';
      case 'color-scheme':
        return '🎨';
      case 'lighting':
        return '💡';
      case 'decor':
        return '🖼️';
      case 'layout':
        return '📐';
      case 'storage':
        return '📦';
      default:
        return '✨';
    }
  };

  return (
    <View className="bg-white rounded-lg shadow-md p-4 m-2">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Text className="text-2xl mr-2">{getCategoryIcon(suggestion.category)}</Text>
          <Text className="text-lg font-semibold text-gray-800 flex-1">
            {suggestion.title}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${getPriorityColor(suggestion.priority)}`}>
          <Text className="text-xs font-medium capitalize">
            {suggestion.priority}
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-600 text-sm mb-3 leading-5">
        {suggestion.description}
      </Text>
      
      <View className="flex-row justify-between items-center">
        <Text className="text-xs text-gray-500 capitalize">
          {suggestion.category.replace('-', ' ')}
        </Text>
        {suggestion.estimatedCost && (
          <Text className="text-sm font-medium text-blue-600">
            ${suggestion.estimatedCost.toLocaleString()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default DesignSuggestionCard;