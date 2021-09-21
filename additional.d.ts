type Fulfilled<T> = T extends PromiseLike<infer U> ? U : T;

type DesignerMetadata = {
  birth: number;
  death?: number;
  birth_place?: string;
  resting_place?: string;
  education: string[];
  spouses: { name: string; info: string }[];
  children: string[];
  awards: { name: string; date: number }[];
  quote?: string;
};

type CustomImage = {
  src: string;
  width: number;
  height: number;
  blurDataUrl: string;
  alt: string;
};

type Vector = [number, number, number];

type ModelHighlight = {
  text: string;
  position: Vector;
  scale: Vector;
};
