import { ImageType } from "./ImageType";

export type SelectedWorkType = {
  id: string;
  colorMain: string;
  title: string;
  logo: string;
  selectedWorks: {
    thumbnailMain: string;
    thumbnail3d: string;
    alt: string;
  };
  heroImage: ImageType;
  years: {
    label: string;
    value: string;
  };
  status: string;
  workplace: string;
  link: {
    url: string;
    label: string;
  };
  techStackIds: string[];
  caseStudyImages: ImageType[];
  overview: string;
  highlights: string;
};
