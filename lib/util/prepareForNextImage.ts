import sharp from 'sharp';
import getPublicPath from './getPublicPath';

const prepareForNextImage = async (src: string, altText?: string) => {
  const { width, height, format } = await sharp(src).metadata();
  const blurDataUrl = await sharp(src).resize(8).toBuffer();
  return {
    src: getPublicPath(src),
    width: width!,
    height: height!,
    blurDataUrl: `data:image/${format};base64,${blurDataUrl.toString(
      'base64'
    )}`,
    alt: altText ?? '',
  };
};

export default prepareForNextImage;
