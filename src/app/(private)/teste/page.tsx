"use client";

import { api } from "@/src/lib/axios/api";
import { useEffect } from "react";

export default function Teste() {
  useEffect(() => {
    getTickets();

    async function getTickets() {
      const res = await api("ticket/all");
      console.log(res.data);
    }
  }, []);

  return (
    <div>
      <h1>Teste</h1>
    </div>
  );
}
