"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/ui/InputForm";
import { toast } from "sonner";

const bukuSihirSchema = z.object({
  judul: z.string(),
  deskripsi: z.string(),
  tipeSihir: z
    .string()
    .refine(
      (val) =>
        val === "ELEMENTAL" || val === "KUTUKAN" || val === "PENYEMBUHAN",
      {
        message: "Tipe Sihir harus berupa ELEMENTAL, KUTUKAN, atau PENYEMBUHAN",
      }
    ),
  jumlah: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Jumlah harus berupa angka",
  }),
  status: z
    .string()
    .refine(
      (val) => val === "TERSEDIA" || val === "DIPINJAM" || val === "HILANG",
      { message: "Status harus berupa TERSEDIA, DIPINJAM, atau HILANG" }
    ),
});

export const BukuForm = () => {
  const form = useForm<z.infer<typeof bukuSihirSchema>>({
    resolver: zodResolver(bukuSihirSchema),
  });

  async function onSubmit(values: z.infer<typeof bukuSihirSchema>) {
    const response = await fetch("https://betis25-oprec.vercel.app/api/bukusihir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        judul: values.judul,
        deskripsi: values.deskripsi,
        tipeSihir: values.tipeSihir,
        jumlah: Number(values.jumlah),
        status: values.status
      }),
    });

    const data = await response.json();

    if (response.ok) {
      form.reset();
      toast.success(data.message);
    } else {
      toast.error(`${response.status} ${data.message}`);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputForm label="Judul" placeholder="Judul" name="judul" form={form} />
        <InputForm
          label="Deskripsi"
          placeholder="Deskripsi"
          name="deskripsi"
          form={form}
        />
        <InputForm
          label="Tipe Sihir"
          placeholder="Tipe Sihir"
          name="tipeSihir"
          form={form}
        />
        <InputForm
          label="Jumlah"
          placeholder="Jumlah"
          name="jumlah"
          form={form}
        />
        <InputForm
          label="Status"
          placeholder="Status"
          name="status"
          form={form}
        />
        <button type="submit" className="bg-green-500 p-2 rounded-md">
          Submit
        </button>
      </form>
    </Form>
  );
};
