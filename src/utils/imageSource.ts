import type { ImageSourcePropType } from 'react-native';

/**
 * iOS will crash with "URI parsing error" if we pass an empty/invalid uri to <Image source={{uri}} />.
 * This helper returns a safe source: either a valid { uri } or a fallback require().
 */
export function getSafeImageSource(
  uri: unknown,
  fallback: ImageSourcePropType,
): ImageSourcePropType {
  if (typeof uri !== 'string') return fallback;

  const trimmed = uri.trim();
  if (!trimmed) return fallback;

  // Common bad persisted values
  if (trimmed === 'null' || trimmed === 'undefined') return fallback;

  // Accept remote and local file URIs
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('file://') ||
    trimmed.startsWith('content://')
  ) {
    return { uri: trimmed };
  }

  return fallback;
}

