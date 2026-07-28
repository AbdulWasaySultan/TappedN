// utils/imageSource.ts
import type { ImageSourcePropType } from 'react-native';

export function getSafeImageSource(
  uri: unknown,
  fallback: ImageSourcePropType,
): ImageSourcePropType {
  // If it's a number (from require()), return it directly
  if (typeof uri === 'number') {
    return uri;
  }
  
  // If it's not a string, use fallback
  if (typeof uri !== 'string') {
    return fallback;
  }

  const trimmed = uri.trim();
  
  // Check for empty or invalid strings
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') {
    return fallback;
  }

  // Check if it's a valid URL (http, https, file, content)
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('file://') ||
    trimmed.startsWith('content://')
  ) {
    return { uri: trimmed };
  }

  // For any other case (relative paths, invalid URLs), use fallback
  return fallback;
}