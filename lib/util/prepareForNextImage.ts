import sharp from 'sharp';
import getPublicPath from './getPublicPath';
import { join } from 'path';
import { existsSync } from 'fs';

const prepareForNextImage = async (src: string, altText?: string) => {
  const placeholder = join(process.cwd(), 'public', 'placeholder.png');
  const _src = existsSync(src) ? src : placeholder;

  const { width, height, format } = await sharp(_src).metadata();
  const blurDataUrl = await sharp(_src).resize(8).toBuffer();
  return {
    src: getPublicPath(_src),
    width: width!,
    height: height!,
    blurDataUrl: `data:image/${format};base64,${blurDataUrl.toString(
      'base64'
    )}`,
    alt: altText ?? '',
  };
};

export default prepareForNextImage;
