"use client";
import React from "react";
import { PRICES, SIZES, formatAED } from "@/lib/pricing";
import type { PhotoItem } from "@/types/photo";


interface OrderSummaryProps {
    photos: PhotoItem[];
    disabled?: boolean;
    onPay: () => void;
    processing?: boolean;
}


export default function OrderSummary({ photos, onPay, disabled, processing }: OrderSummaryProps) {
    const subtotal = photos.reduce((sum, p) => sum + PRICES[p.size], 0);


    return (
        <aside className="rounded-2xl bg-white p-5 shadow">
            <h2 className="mb-4 text-lg font-semibold">2) Order summary</h2>


            <ul className="mb-4 space-y-2 text-sm">
                {SIZES.map((s) => {
                    const count = photos.filter((p) => p.size === s.key).length;
                    if (!count) return null;
                    const rowTotal = count * PRICES[s.key];
                    return (
                        <li key={s.key} className="flex justify-between">
                            <span>
                                {s.label} × {count}
                            </span>
                            <span>{formatAED(rowTotal)}</span>
                        </li>
                    );
                })}
            </ul>

            <div className="mb-4 h-px w-full bg-gray-200" />


            <div className="mb-6 flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatAED(subtotal)}</span>
            </div>


            <button
                onClick={onPay}
                disabled={disabled || processing}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {processing ? "Processing…" : "Pay Now (Test)"}
            </button>

        </aside>
    );
}