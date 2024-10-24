import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, BarChart2, Factory, Trees, Calculator } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoHuella - Analizador de Huella de Carbono",
  description: "Analiza y gestiona la huella de carbono de tu empresa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
        )}
      >
        <header
          className="fixed z-50 w-full flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-white
        dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
        "
        >
          <Link
            href="/"
            className="text-lg font-semibold text-green-700"
          >
            EcoHuella
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button
              variant="ghost"
              className="text-sm font-medium"
              asChild
            >
              <Link href={`/dashboard`}>
                <BarChart2 className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              asChild
            >
              <Link href={`/dashboard/calculadora`}>
                <Calculator className="mr-2 h-4 w-4" />
                Calculadora
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              asChild
            >
              <Link href={`/dashboard/marketplace`}>
                <Trees className="mr-2 h-4 w-4" />
                Marketplace
              </Link>
            </Button>
          </nav>
          {/* boton para cambiar el tema a dark */}
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="ml-4"
          >
            <Users className="h-5 w-5 text-green-700" />
            <span className="sr-only">Perfil de usuario</span>
          </Button>
        </header>
        <main className="flex-1 p-4 pt-14">{children}</main>
      </body>
    </html>
  );
}
