export const FontType = {
    verysmall : 12,
  small: 14,
  regular: 16,
  medium: 18,
  large: 20,
  xlarge: 24,
  xxlarge: 26,
  xxxlarge : 28,
  xtraLarge: 32,
  xxtraLarge: 34,
  title: 36,
  titleBold : 38,
  titleBold2: 40,
  titleBold3: 44,
  titleBold4: 48,
  titleBold5: 52,
  titleBold6: 56,

} as const;

export type FontSize = typeof FontType[keyof typeof FontType]; 