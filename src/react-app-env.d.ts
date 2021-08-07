/// <reference types="react-scripts" />
/// <reference types="three" />

declare module '*.mp4';
declare module '*.otf';

// THREE
type Vector = [number, number, number];
type Tick = (delta: number) => void;

interface Model {
  group: THREE.Group;
  dispose: () => void;
}

interface Disposable {
  dispose: () => void;
}

// Routes
type PathName =
  | '/'
  | '/introduction'
  | '/timeline'
  | '/archive'
  | '/archive/:designer'
  | '/archive/:designer/:product'
  | '/gallery'
  | '/craft'
  | '/craft/wood'
  | '/search'
  | '/credits';

// Data
type SearchResult = {
  header: string;
  subheader?: string;
  items: SearchResultItem[];
};

interface SearchResultItem {
  title: string;
  thumbSrc: string;
  id: string;
  type: 'designer' | 'product' | 'other';
}

interface CraftTopic {
  name: string;
  type: 'technique' | 'material';
  keywords: string[];
  vidSrc: string;
  id: string;
}

// Product
interface Product {
  productId: string;
  thumbSrc: string;
  story: (string | GenericMediaItem[])[];
  date: number;
  model: string | null;
  nickname: string | null;
  brand: Brand | null;
  productURL: string | null;
  dimensionsCm: {
    w: number;
    h: number;
    d: number;
  } | null;
  categories: ProductCategory[];
  materials: ProductMaterial[];
}

type ProductCategory = 'chairs' | 'storage' | 'tables' | 'accessories' | 'sofa';
type ProductMaterial = 'wood' | 'metal' | 'leather' | 'textile' | 'plastic';

interface Designer {
  firstName: string;
  lastName: string;
  designerId: string;
  birth: number;
  avatarSrc: string;
  heroSrc: string;
  bio: ChronologicContentSection[];
  works: Product[];
  death: number | null;
  quote: string | null;
  introductoryParagraph: string | null;
  birthPlace: string | null;
  restingPlace: string | null;
  education: string[];
  spouses: { name: string; info: string }[];
  children: string[];
  awards: { name: string; date: number }[];
}

type Brand =
  | 'PP Møbler'
  | 'Salesco AS'
  | 'Carl Hansen & Søn'
  | 'Rosendahl'
  | 'Georg Jensen';

type Timeline = ChronologicContentSection[];

interface ChronologicContentSection {
  header: string;
  date: number;
  text: string[];
  media: GenericMediaItem[];
}

interface GenericMediaItem {
  type: 'img' | 'vid';
  src: string;
  alt?: string;
  caption?: string;
}
