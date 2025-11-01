"use client";
import React, { useMemo, useRef, useState } from "react";
import Uploader from "@/components/Uploader";
import ThumbnailGrid from "@/components/ThumbnailGrid";
import OrderSummary from "../components/OrderSummary";
import { PRICES, type SizeKey } from "@/lib/pricing";
import type { PhotoItem } from "@/types/photo";


export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);


  const handleFiles = (filesList: FileList) => {
    setError(null);
    const incoming = Array.from(filesList).filter((f) => f.type.startsWith("image/"));
    if (incoming.length !== filesList.length) setError("Only image files are allowed.");


    const remaining = 5 - photos.length;
    if (incoming.length > remaining) {
      setError(`You can add up to 5 photos total. You have ${photos.length} already.`);
    }


    const next = incoming.slice(0, Math.max(0, remaining)).map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      size: "4x6" as SizeKey,
    }));


    if (next.length) setPhotos((prev) => [...prev, ...next]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const p = prev.find((x) => x.id === id);
      if (p) URL.revokeObjectURL(p.url);
      return prev.filter((x) => x.id !== id);
    });
  };


  const clearAll = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
    setError(null);
  };


  const updateSize = (id: string, size: SizeKey) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, size } : p)));
  };


  const totals = useMemo(() => {
    const subtotal = photos.reduce((sum, p) => sum + PRICES[p.size], 0);
    return { items: photos.length, subtotal };
  }, [photos]);


  const onPayNow = async () => {
    setCheckingOut(true);
    await new Promise((r) => setTimeout(r, 700));
    setCheckingOut(false);
    alert(
      `✅ Order placed!


Items: ${totals.items}
Total: AED ${totals.subtotal.toFixed(2)}

(This is a demo — no real payment was processed.)`
    );
  };


  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">📸 Inekas Photogrphy</h1>
        </header>


        <div className="grid gap-6 md:grid-cols-3">
          <section className="md:col-span-2 rounded-2xl bg-white p-5 shadow">
            <h2 className="mb-4 text-lg font-semibold">1) Upload photos (max 5)</h2>


            {/* Uploader */}
            <Uploader onFiles={handleFiles} />


            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}


            {/* Thumbnails */}
            <ThumbnailGrid photos={photos} onRemove={removePhoto} onSizeChange={updateSize} />


            {photos.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button onClick={clearAll} className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                  Clear all
                </button>
                <span className="text-sm text-gray-500">{photos.length}/5 photos added</span>
              </div>
            )}
          </section>


          {/* Summary */}
          <OrderSummary photos={photos} onPay={onPayNow} processing={checkingOut} disabled={photos.length === 0} />
        </div>


        <footer className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Inekas Photography
        </footer>
      </div>
    </main>
  );
}