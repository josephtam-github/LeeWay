# Leeway - AI-Powered Interior Design

Leeway is a React Native Expo app that uses AI to provide personalized interior design suggestions. Take a photo of your room and get expert design advice powered by Google's Generative AI.

## Features

- 📸 Camera integration for room photos
- 🤖 AI-powered design analysis using Google Gemini
- 🎨 Personalized design suggestions
- 📱 Beautiful, responsive UI with NativeWind (Tailwind CSS)
- 🔧 TypeScript for type safety

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS) for styling
- **Expo Camera** for photo capture
- **Expo Media Library** for photo management
- **Google Generative AI** for design analysis

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Main application screens
├── services/         # API integrations (Gemini AI, Camera)
├── types/            # TypeScript interfaces and types
```

## Quick Start

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your phone (for testing)

### Installation

1. **Clone the repository** (if not already in the directory)
   ```bash
   cd your-project-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Google Gemini API key:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Get Google Gemini API Key**
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Create a new project or select existing one
   - Generate an API key
   - Add the key to your `.env` file

### Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS required)
npm run ios

# Run on Web
npm run web
```

### Testing on Device

1. Install the **Expo Go** app on your phone
2. Scan the QR code from the terminal
3. The app will load on your device

## Configuration Files

### babel.config.js
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### tailwind.config.js
```javascript
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Permissions

The app requires the following permissions:
- **Camera**: To take photos of rooms
- **Photo Library**: To save and access room photos

These are configured in `app.json` and will be requested when needed.

## Development

### Adding New Components

Create new components in `src/components/`:

```typescript
// src/components/MyComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent: React.FC = () => {
  return (
    <View className="p-4 bg-white">
      <Text className="text-lg font-bold">Hello World</Text>
    </View>
  );
};

export default MyComponent;
```

### Using NativeWind

Use Tailwind CSS classes with the `className` prop:

```typescript
<View className="flex-1 justify-center items-center bg-blue-500">
  <Text className="text-white text-xl font-bold">Styled with NativeWind</Text>
</View>
```

### API Integration

AI services are in `src/services/gemini.ts`. To add new API calls:

```typescript
// src/services/myService.ts
class MyService {
  async myMethod() {
    // Your API logic here
  }
}

export default new MyService();
```

## Building for Production

```bash
# Create a build
npx eas build --platform all

# Create APK for Android
npx eas build --platform android --profile preview
```

## Troubleshooting

### Camera Not Working
- Ensure camera permissions are granted
- Check that camera plugin is properly configured in `app.json`
- Restart the Expo development server

### AI Responses Not Working
- Verify your Gemini API key is correct in `.env`
- Check internet connectivity
- Ensure you have Gemini API credits/quota

### NativeWind Styles Not Applying
- Verify `babel.config.js` includes the NativeWind plugin
- Check that `tailwind.config.js` content paths are correct
- Restart the Expo development server after configuration changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.