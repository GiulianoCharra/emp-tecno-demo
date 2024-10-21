"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LeafIcon,
  TreeDeciduous,
  WindIcon,
  DropletIcon,
  SunIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CarbonCredit = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type:
    | "Forestal"
    | "Energía Renovable"
    | "Conservación de Agua"
    | "Agricultura Sostenible";
  location: string;
  certification: string;
  icon: React.ReactNode;
  image: string;
};

const carbonCredits: CarbonCredit[] = [
  {
    id: "1",
    name: "Reforestación Amazónica",
    description:
      "Apoye la reforestación de la selva amazónica y compense su huella de carbono.",
    price: 25,
    quantity: 1,
    type: "Forestal",
    location: "Amazonas, Brasil",
    certification: "Verified Carbon Standard (VCS)",
    icon: <TreeDeciduous className="h-6 w-6" />,
    image: "/images/reforestacion-amazonica.png",
  },
  {
    id: "2",
    name: "Parque Eólico Patagonia",
    description: "Invierta en energía eólica limpia en la Patagonia argentina.",
    price: 30,
    quantity: 1,
    type: "Energía Renovable",
    location: "Patagonia, Argentina",
    certification: "Gold Standard",
    icon: <WindIcon className="h-6 w-6" />,
    image: "/images/parque-eolico-patagonia.png",
  },
  {
    id: "3",
    name: "Conservación de Manglares",
    description:
      "Proteja los ecosistemas de manglares y su capacidad de captura de carbono.",
    price: 20,
    quantity: 1,
    type: "Conservación de Agua",
    location: "Sundarbans, Bangladesh",
    certification: "Plan Vivo",
    icon: <DropletIcon className="h-6 w-6" />,
    image: "/images/conservacion-de-manglares.png",
  },
  {
    id: "4",
    name: "Agricultura Regenerativa",
    description:
      "Apoye prácticas agrícolas que secuestran carbono en el suelo.",
    price: 22,
    quantity: 1,
    type: "Agricultura Sostenible",
    location: "Pampa, Argentina",
    certification: "Climate Action Reserve (CAR)",
    icon: <LeafIcon className="h-6 w-6" />,
    image: "/images/agricultura-regenerativa.png",
  },
  {
    id: "5",
    name: "Planta Solar Atacama",
    description:
      "Contribuya al desarrollo de energía solar en el desierto de Atacama.",
    price: 28,
    quantity: 1,
    type: "Energía Renovable",
    location: "Desierto de Atacama, Chile",
    certification: "CDM (Clean Development Mechanism)",
    icon: <SunIcon className="h-6 w-6" />,
    image: "/images/planta-solar-atacama.png",
  },
];

export default function CarbonCreditMarketplace() {
  const [cart, setCart] = useState<CarbonCredit[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const addToCart = (credit: CarbonCredit) => {
    setCart([...cart, credit]);
  };

  const removeFromCart = (creditId: string) => {
    setCart(cart.filter((item) => item.id !== creditId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const filteredCredits = carbonCredits.filter((credit) => {
    const matchesFilter = filter === "all" || credit.type === filter;
    const matchesSearch =
      credit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Marketplace de Créditos de Carbono
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        Compense su huella de carbono invirtiendo en proyectos certificados de
        reducción de emisiones.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3">
          <Label htmlFor="search">Buscar proyectos</Label>
          <Input
            id="search"
            placeholder="Buscar por nombre o descripción"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label htmlFor="filter">Filtrar por tipo</Label>
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger id="filter">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="Forestal">Forestal</SelectItem>
              <SelectItem value="Energía Renovable">
                Energía Renovable
              </SelectItem>
              <SelectItem value="Conservación de Agua">
                Conservación de Agua
              </SelectItem>
              <SelectItem value="Agricultura Sostenible">
                Agricultura Sostenible
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCredits.map((credit) => (
          <Card
            key={credit.id}
            className="flex flex-col"
          >
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={credit.image}
                  alt={credit.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  {credit.icon}
                </div>
                <Badge variant="secondary">{credit.type}</Badge>
              </div>
              <CardTitle className="mt-4">{credit.name}</CardTitle>
              <CardDescription>{credit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Ubicación:</span>
                  <span>{credit.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Certificación:</span>
                  <span>{credit.certification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Precio por crédito:</span>
                  <span className="text-green-600 font-bold">
                    ${credit.price}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => addToCart(credit)}
              >
                Agregar al Carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700">
            <ShoppingCartIcon className="mr-2 h-4 w-4" />
            Ver Carrito ({cart.length})
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrito de Compras</SheetTitle>
            <SheetDescription>
              Revise sus créditos de carbono seleccionados antes de finalizar la
              compra.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
            {cart.length === 0 && (
              <p className="text-center text-gray-500">
                Su carrito está vacío.
              </p>
            )}
            {cart.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="text-green-600 font-bold">
                    ${getTotalPrice()}
                  </span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Proceder al Pago
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
