import { DrawLine } from ".";

export type LayerContianer = {
  name?: string; 
  visible?: boolean;
  linePost: DrawLine[];
  imageSrc: string;
};
