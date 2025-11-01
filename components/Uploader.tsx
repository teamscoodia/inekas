"use client";
import React, { useRef, useState } from "react";


interface UploaderProps {
onFiles: (files: FileList) => void;
}


export default function Uploader({ onFiles }: UploaderProps) {
const ref = useRef<HTMLInputElement | null>(null);
const [dragOver, setDragOver] = useState(false);


return (
<div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
<input
ref={ref}
id="file-input"
type="file"
accept="image/*"
multiple
className="hidden"
onChange={(e) => e.target.files && onFiles(e.target.files)}
/>


<label
htmlFor="file-input"
className="inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
<path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
<path fillRule="evenodd" d="M1.5 12a10.5 10.5 0 1121 0 10.5 10.5 0 01-21 0zm10.5-7.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clipRule="evenodd" />
</svg>
Choose Photos
</label>


<p className="mt-2 text-xs text-gray-500">PNG/JPG; you can also drag & drop here.</p>


<div
onDragOver={(e) => {
e.preventDefault();
setDragOver(true);
}}
onDragLeave={() => setDragOver(false)}
onDrop={(e) => {
e.preventDefault();
setDragOver(false);
if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
}}
className={`mt-3 rounded-lg p-3 text-xs ${dragOver ? "bg-indigo-50 text-indigo-800" : "bg-gray-50 text-gray-600"}`}
>
Drag & drop images onto this area
</div>
</div>
);
}