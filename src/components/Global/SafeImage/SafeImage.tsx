// Components/Global/SafeImage/SafeImage.tsx
import React, { useState } from 'react';
import { Image, ImageProps, ImageSourcePropType } from 'react-native';
import { getSafeImageSource } from '../../../utils/imageSource';

type Props = Omit<ImageProps, 'source'> & {
  uri?: string | null;
  fallbackSource: ImageSourcePropType;
};

export default function SafeImage({ uri, fallbackSource, style, resizeMode = 'cover', ...imageProps }: Props) {
  const [hasError, setHasError] = useState(false);
  
  // Get the safe source (this will return fallback if URI is invalid)
  const source = getSafeImageSource(hasError ? null : uri, fallbackSource);
  
  // If source is already the fallback (because URI was invalid), just render it
  if (source === fallbackSource) {
    return <Image source={fallbackSource} style={style} resizeMode={resizeMode} {...imageProps} />;
  }
  
  // Otherwise try to load the URI and show fallback on error
  return (
    <Image
      source={source}
      style={style}
      resizeMode={resizeMode}
      onError={() => setHasError(true)}
      {...imageProps}
    />
  );
}