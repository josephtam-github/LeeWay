// Common type definitions for the Leeway app

export interface DesignRequest {
  id: string;
  imageUri?: string;
  description: string;
  roomType: RoomType;
  style: DesignStyle;
  budget?: number;
  timestamp: Date;
}

export interface DesignResponse {
  id: string;
  requestId: string;
  suggestions: DesignSuggestion[];
  analysis: string;
  timestamp: Date;
}

export interface DesignSuggestion {
  id: string;
  title: string;
  description: string;
  category: SuggestionCategory;
  priority: Priority;
  estimatedCost?: number;
}

export type RoomType = 
  | 'living-room' 
  | 'bedroom' 
  | 'kitchen' 
  | 'bathroom' 
  | 'dining-room' 
  | 'office' 
  | 'other';

export type DesignStyle = 
  | 'modern' 
  | 'traditional' 
  | 'minimalist' 
  | 'industrial' 
  | 'bohemian' 
  | 'scandinavian' 
  | 'rustic' 
  | 'eclectic';

export type SuggestionCategory = 
  | 'furniture' 
  | 'color-scheme' 
  | 'lighting' 
  | 'decor' 
  | 'layout' 
  | 'storage';

export type Priority = 'high' | 'medium' | 'low';

// Camera and media types
export interface CameraPermissions {
  camera: boolean;
  mediaLibrary: boolean;
}

// API response types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}