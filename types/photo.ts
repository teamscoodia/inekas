import type { SizeKey } from "../lib/pricing";


export type PhotoItem = {
id: string;
file: File;
url: string; // object URL for preview
size: SizeKey;
};