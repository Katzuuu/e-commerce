export type arrayOfProducts = [data];

export type data = {
  _id: string;
  title: string;
  category?: string;
  description?: string;
  price: number;
  images: [img, img, img, img];
  properties?: {};
};

type img = string;
