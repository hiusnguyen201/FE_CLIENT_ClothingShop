import { Nullable } from "./common";

export type Category = {
  id: string;
  image: Nullable<string>;
  name: string;
  slug: string;
  level: number;
  parent: Nullable<string>;
  children: Category[];
};
