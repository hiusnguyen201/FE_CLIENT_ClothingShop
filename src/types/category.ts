import { Nullable } from "./common";

export type Category = {
    id: string;
    image: string | undefined;
    name: string;
    slug: string;
    level: number;
    parent: Nullable<string>;
    children: Category[];
};