import React from "react";
import { NextPage } from "next";
import { ResponseDetailBukuSihir } from "@/modules/DetailsModule/interface";
import { DetailsModule } from "@/modules/DetailsModule";

const page: NextPage<{
  params: { id: string };
}> = async ({ params }) => {
  const response = await fetch(
    `https://betis25-oprec.vercel.app/api/bukusihir/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
    }
  );
  const data: ResponseDetailBukuSihir = await response.json();
  console.log(data);
  return (
    <DetailsModule data={data.bukuSihir} />
  )
};

export default page;
