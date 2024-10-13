"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Bienvenido a EcoHuella
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Analiza y gestiona la huella de carbono de tu empresa de manera
        eficiente y sostenible.
      </p>
      <Button asChild>
        <Link href="/dashboard">Ir al Dashboard</Link>
      </Button>
    </div>
  );
}
