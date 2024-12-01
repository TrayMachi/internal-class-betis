import React from "react";
import { toast } from "sonner";
import { BukuSihir } from "../HomePageModule/interface";
import { Card } from "../HomePageModule/elements/Card";

export const DetailsModule = ({ data }: { data: BukuSihir }) => {
  console.log(data);
  return (
    <main className="flex min-h-screen justify-center items-center">
      <Card bukuSihir={data} />
    </main>
  );
};
