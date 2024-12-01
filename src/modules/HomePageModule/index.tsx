"use client";
import React, { useState, useEffect } from "react";
import { BukuSihir, ResponseBukuSihir } from "./interface";
import { toast } from "sonner";
import { Card } from "./elements/Card";
import { BukuForm } from "./sections/BukuForm";

const HomePageModule = () => {
  const [data, setData] = useState<BukuSihir[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        "https://betis25-oprec.vercel.app/api/bukusihir",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          },
        }
      );
      const data: ResponseBukuSihir = await response.json();
      if (response.ok) {
        setData(data.bukuSihir);
        toast.success(data.message);
      } else {
        toast.error(`${response.status} ${data.message}`);
      }

      setIsLoading(false);
    };

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white">
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-3 gap-4">
            {data.map((bukuSihir) => (
              <Card key={bukuSihir.id} bukuSihir={bukuSihir} />
            ))}
          </div>
          <BukuForm />
        </div>
      )}
    </div>
  );
};

export default HomePageModule;
