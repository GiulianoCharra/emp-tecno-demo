"use client";

import { useState } from "react";
import {
  Building,
  Car,
  Factory,
  Leaf,
  Package,
  Plus,
  Trash2,
  Users,
  Wind,
  Zap,
  Droplet,
  BarChart2,
  Truck,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const assetTypes = [
  {
    name: "Personal",
    icon: Users,
    href: "/dashboard/gestion-activos/personal",
    description: "Empleados y contratistas",
    count: 150,
    impact: "Medio",
    color: "bg-blue-100",
  },
  {
    name: "Maquinaria",
    icon: Factory,
    href: "/dashboard/gestion-activos/maquinaria",
    description: "Equipos industriales y herramientas",
    count: 50,
    impact: "Alto",
    color: "bg-yellow-100",
  },
  {
    name: "Vehículos",
    icon: Car,
    href: "/dashboard/gestion-activos/vehiculos",
    description: "Coches, camiones y otros vehículos",
    count: 30,
    impact: "Alto",
    color: "bg-red-100",
  },
  {
    name: "Edificios",
    icon: Building,
    href: "/dashboard/gestion-activos/edificios",
    description: "Oficinas, almacenes y otras instalaciones",
    count: 5,
    impact: "Muy Alto",
    color: "bg-purple-100",
  },
  {
    name: "Fuentes de Energía",
    icon: Zap,
    href: "/dashboard/gestion-activos/energia",
    description: "Generadores, paneles solares, etc.",
    count: 10,
    impact: "Medio",
    color: "bg-orange-100",
  },
  {
    name: "Residuos",
    icon: Trash2,
    href: "/dashboard/gestion-activos/residuos",
    description: "Contenedores y sistemas de reciclaje",
    count: 20,
    impact: "Bajo",
    color: "bg-green-100",
  },
  {
    name: "Cadena de Suministro",
    icon: Truck,
    href: "/dashboard/gestion-activos/suministro",
    description: "Proveedores y logística",
    count: 40,
    impact: "Medio",
    color: "bg-indigo-100",
  },
  {
    name: "Recursos Hídricos",
    icon: Droplet,
    href: "/dashboard/gestion-activos/agua",
    description: "Sistemas de agua y tratamiento",
    count: 15,
    impact: "Medio",
    color: "bg-cyan-100",
  },
];

export default function AssetManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">
          Gestión de Activos
        </h2>
      </div>
      <Tabs
        defaultValue="all"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="high-impact">Alto Impacto</TabsTrigger>
          <TabsTrigger value="low-impact">Bajo Impacto</TabsTrigger>
        </TabsList>
        <TabsContent
          value="all"
          className="space-y-4"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assetTypes.map((asset) => (
              <Card
                key={asset.name}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div
                    className={`w-16 h-16 rounded-full ${asset.color} flex items-center justify-center mb-4`}
                  >
                    {<asset.icon className="h-8 w-8 " />}
                  </div>
                  <CardTitle className="text-lg font-semibold  text-green-700">
                    {asset.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {asset.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{asset.count}</div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        asset.impact === "Alto" || asset.impact === "Muy Alto"
                          ? "bg-red-100 text-red-800"
                          : asset.impact === "Medio"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {asset.impact}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-700 hover:bg-green-800"
                    asChild
                  >
                    <Link href={asset.href}>Gestionar {asset.name}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="high-impact">
          {/* Contenido para activos de alto impacto */}
        </TabsContent>
        <TabsContent value="low-impact">
          {/* Contenido para activos de bajo impacto */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
