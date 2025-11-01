"use client";
import React from "react";
import { PRICES, SIZES, type SizeKey } from "@/lib/pricing";
import type { PhotoItem } from "@/types/photo";


interface ThumbnailGridProps {
photos: PhotoItem[];
onRemove: (id: string) => void;
onSizeChange: (id: string, size: SizeKey) => void;
}


export default function ThumbnailGrid({ photos, onRemove, onSizeChange }: ThumbnailGridProps) {
return (
<div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
{photos.map((p) => (
<article key={p.id} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
<div className="relative">
<img src={p.url} alt="preview" className="h-40 w-full object-cover" />
<button
onClick={() => onRemove(p.id)}
className="absolute right-2 top-2 hidden rounded-full bg-black/70 px-2 py-1 text-xs text-white group-hover:block"
>
Remove
</button>
</div>
<div className="flex items-center justify-between gap-2 p-2">
<select
value={p.size}
onChange={(e) => onSizeChange(p.id, e.target.value as SizeKey)}
className="w-full rounded-lg border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
{SIZES.map((s) => (
<option key={s.key} value={s.key}>
{s.label} — AED {PRICES[s.key].toFixed(2)}
</option>
))}
</select>
</div>
</article>
))}
</div>
);
}