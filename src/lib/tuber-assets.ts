// Asset map for authentic tuber illustrations
import singkongImg from '../assets/tubers/singkong.jpg';
import ubiJalarImg from '../assets/tubers/ubi-jalar.jpg';
import talasImg from '../assets/tubers/talas.jpg';

export const TUBER_IMAGES: Record<string, string> = {
  'singkong': singkongImg,
  'ubi-jalar': ubiJalarImg,
  'talas': talasImg,
};

export function getTuberImage(slug: string): string {
  return TUBER_IMAGES[slug] || ubiJalarImg;
}
