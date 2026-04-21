import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  Image,
  type ImageProps,
  type ImageSourcePropType,
  InteractionManager,
} from 'react-native';
import { getSafeImageSource } from '../../../utils/imageSource';

type Props = Omit<ImageProps, 'source'> & {
  uri?: unknown;
  fallbackSource: ImageSourcePropType;
  /**
   * When true, defer rendering until after navigation/animations settle.
   * This reduces Fabric re-clones during transitions.
   */
  deferUntilInteractions?: boolean;
};

function SafeImageInner({
  uri,
  fallbackSource,
  deferUntilInteractions = false,
  ...imageProps
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!deferUntilInteractions) {
      setReady(true);
      return;
    }

    const task = InteractionManager.runAfterInteractions(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
      task.cancel();
    };
  }, [deferUntilInteractions]);

  const source = useMemo(() => {
    return getSafeImageSource(uri, fallbackSource);
  }, [uri, fallbackSource]);

  // Deferral strategy: avoid rendering <Image> until we're ready.
  // Returning null avoids passing an incomplete/invalid ImageSource during transitions.
  if (!ready) return null;

  return <Image {...imageProps} source={source} />;
}

export default memo(SafeImageInner);

