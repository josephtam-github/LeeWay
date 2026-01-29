import { GoogleGenerativeAI } from '@google/generative-ai';
import { DesignRequest, DesignResponse, ApiError } from '../types';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    // Initialize with API key from environment or config
    // In production, store API key securely
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    }
  }

  async analyzeRoom(request: DesignRequest): Promise<DesignResponse | null> {
    if (!this.model) {
      throw new Error('Gemini API not initialized. Please check your API key.');
    }

    try {
      const prompt = this.buildPrompt(request);
      
      const parts = [
        { text: prompt },
        ...(request.imageUri ? [{ 
          inlineData: {
            mimeType: "image/jpeg", // Adjust based on actual image type
            data: await this.getImageData(request.imageUri)
          }
        }] : [])
      ];

      const result = await this.model.generateContent(parts);
      const response = await result.response;
      const text = response.text();

      return this.parseResponse(text, request);
    } catch (error) {
      console.error('Error analyzing room:', error);
      return null;
    }
  }

  private buildPrompt(request: DesignRequest): string {
    return `
      As an expert interior designer, analyze this ${request.roomType} and provide design suggestions.
      
      Context:
      - Room Type: ${request.roomType}
      - Preferred Style: ${request.style}
      - Description: ${request.description}
      ${request.budget ? `- Budget: $${request.budget}` : ''}

      Please provide:
      1. Overall analysis of the current space
      2. Specific design suggestions categorized by furniture, color scheme, lighting, decor, layout, and storage
      3. Prioritize suggestions by impact and budget considerations
      4. Estimated costs where applicable

      Format your response as structured JSON with the following format:
      {
        "analysis": "Your analysis here",
        "suggestions": [
          {
            "title": "Suggestion title",
            "description": "Detailed description",
            "category": "furniture|color-scheme|lighting|decor|layout|storage",
            "priority": "high|medium|low",
            "estimatedCost": 0
          }
        ]
      }
    `;
  }

  private async getImageData(imageUri: string): Promise<string> {
    // Convert image URI to base64 data
    // This would need to be implemented based on the actual image handling
    // For now, return empty string as placeholder
    return '';
  }

  private parseResponse(text: string, request: DesignRequest): DesignResponse {
    try {
      const parsed = JSON.parse(text);
      
      return {
        id: Date.now().toString(),
        requestId: request.id,
        analysis: parsed.analysis || 'Analysis not available',
        suggestions: parsed.suggestions || [],
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error parsing response:', error);
      
      // Fallback response
      return {
        id: Date.now().toString(),
        requestId: request.id,
        analysis: text,
        suggestions: [],
        timestamp: new Date()
      };
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.model) return false;
    
    try {
      const result = await this.model.generateContent("Test connection");
      return !!result;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

export default new GeminiService();