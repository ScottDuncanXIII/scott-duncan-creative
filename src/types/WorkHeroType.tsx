import { ImageType } from "./ImageType";

export type WorkHeroType = {
  id: string;
  initAnim: boolean;
  heroImage: ImageType | undefined;
  link?: {
    label: string;
    url: string;
  };
  mainColor: string | undefined;
  statusLabel: string;
  status: string;
  title: string | undefined;
  years: {
    label: string;
    value: string;
  };
  workplaceLabel: string;
  workplace: string;
  yearsLabel: string;
};
