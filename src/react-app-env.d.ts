/// <reference types="react-scripts" />
/// <reference types="three" />

declare module '*.mp4';
declare module '*.otf';

type Vector = [number, number, number];

type Tick = (delta: number) => void;

interface Model {
  group: THREE.Group;
  dispose: () => void;
}

interface Disposable {
  dispose: () => void;
}

type AreaName = 'home' | 'introduction' | 'timeline' | 'archive' | 'gallery' | 'craft';

interface CraftItem {
  name: string;
  type: 'technique' | 'material';
  keywords: string[];
  img: string;
  id: string;
}

interface Product {
  id: string;
  thumbSrc: string;
  story: string[];
  date: number;
  tags: ('seating' | 'storage' | 'tables' | 'accessories')[];
  model: string | null;
  nickname: string | null;
  brand: string | null;
}

interface Designer {
  firstName: string;
  lastName: string;
  id: string;
  birth: number;
  thumbSrc: string;
  bio: string[];
  works: Product[];
  death: number | null;
  quote: string | null;
}

interface GenericContentItem {
  tag: 'img' | 'p' | 'blockquote';
  content?: string;
  caption?: string;
  alt?: string;
  src?: string;
}

interface Timeline {
  segments: { title: string; date: string; content: GenericContentItem[] }[];
}
