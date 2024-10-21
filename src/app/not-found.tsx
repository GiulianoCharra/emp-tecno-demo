"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-md w-full rounded-lg shadow-lg p-6 text-center">
        <div className="mb-4">
          <Leaf className="mx-auto h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200  mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400  mb-6">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Puede
          que haya sido movida o ya no exista.
        </p>
        <div className="mb-6">
          <Image
            src="/images/404.png"
            alt="Ilustración de página no encontrada"
            width={300}
            height={200}
            className="mx-auto rounded-full"
          />
        </div>
        <Button
          onClick={() => router.push("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Volver a la página de inicio
        </Button>
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">
            Redirigiendo a la página de inicio en 5 segundos...
          </p>
          <Progress
            value={progress}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
