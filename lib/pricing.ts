export type SizeKey = "4x6" | "5x7" | "8x10";


export const PRICES: Record<SizeKey, number> = {
"4x6": 1.5,
"5x7": 3,
"8x10": 5,
};


export const SIZES: { key: SizeKey; label: string }[] = [
{ key: "4x6", label: "4×6" },
{ key: "5x7", label: "5×7" },
{ key: "8x10", label: "8×10" },
];


export const formatAED = (n: number) => `AED ${n.toFixed(2)}`;