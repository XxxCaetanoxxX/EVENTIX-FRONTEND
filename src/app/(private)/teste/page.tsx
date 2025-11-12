"use client";

import { useEffect } from "react";

export default function Teste() {
  useEffect(() => {
    getTickets();

    async function getTickets() {
      const res = await fetch("/api/proxy/ticket/all");
      const data = await res.json();
      console.log(data);
    }
  }, []);

  return (
    <div>
      <h1>Teste</h1>
    </div>
  );
}
