"use client";
import React from "react";
import { BukuSihir } from "../interface";
import Link from "next/link";
import { toast } from "sonner";

export const Card = ({ bukuSihir }: { bukuSihir: BukuSihir }) => {
  const deleteBukuSihir = async () => {
    const response = await fetch(
      `https://betis25-oprec.vercel.app/api/bukusihir/${bukuSihir.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(`${response.status} ${data.message}`);
    }
  };

  return (
    <div className="bg-pink-400 rounded-[20px] px-5 py-7">
      <h1>Judul: {bukuSihir.judul}</h1>
      <p>Deskripsi: {bukuSihir.deskripsi}</p>
      <p>Tipe Sihir: {bukuSihir.tipeSihir}</p>
      <p>Jumlah: {bukuSihir.jumlah}</p>
      <p>Status: {bukuSihir.status}</p>
      <p>Created At: {new Date(bukuSihir.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(bukuSihir.updatedAt).toLocaleString()}</p>
      <button onClick={deleteBukuSihir} className="bg-red-500 p-2 rounded-md">
        Delete
      </button>
      <Link href={`/details/${bukuSihir.id}`}>
        <button className="bg-blue-500 p-2 rounded-md">Details</button>
      </Link>
    </div>
  );
};
