"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Leaf,
  Zap,
  Car,
  BarChart as BarChartIcon,
  Building,
  Users,
  Truck,
  Factory,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const data = [
  { name: "Ene", total: 1.2 },
  { name: "Feb", total: 1.1 },
  { name: "Mar", total: 1.3 },
  { name: "Abr", total: 1.0 },
  { name: "May", total: 0.9 },
  { name: "Jun", total: 1.1 },
];

const assetCategories = [
  {
    name: "Edificios",
    icon: <Building className="h-4 w-4 text-blue-500" />,
    emissions: 0.5,
    color: "bg-blue-500",
  },
  {
    name: "Vehículos",
    icon: <Car className="h-4 w-4 text-green-500" />,
    emissions: 0.3,
    color: "bg-green-500",
  },
  {
    name: "Maquinaria",
    icon: <Factory className="h-4 w-4 text-yellow-500" />,
    emissions: 0.2,
    color: "bg-yellow-500",
  },
  {
    name: "Personal",
    icon: <Users className="h-4 w-4 text-purple-500" />,
    emissions: 0.1,
    color: "bg-purple-500",
  },
  {
    name: "Cadena de Suministro",
    icon: <Truck className="h-4 w-4 text-red-500" />,
    emissions: 0.1,
    color: "bg-red-500",
  },
  {
    name: "Energía",
    icon: <Zap className="h-4 w-4 text-yellow-200" />,
    emissions: 0.3,
    color: "bg-yellow-200",
  },
];

export default function Dashboard() {
  const [goalProgress, setGoalProgress] = useState(65);

  const totalEmissions = assetCategories.reduce(
    (sum, category) => sum + category.emissions,
    0
  );

  return (
    <div className="flex flex-col min-h-screen space-y-6 pt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
        <Link href="/dashboard/gestion-activos">
          <Button className="bg-green-700 hover:bg-green-800">
            <Building className="mr-2 h-4 w-4" /> Gestionar Activos
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Huella de Carbono Total
            </CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {totalEmissions.toFixed(1)} toneladas CO2e
            </div>
            <p className="text-xs text-muted-foreground">
              <ArrowDown className="h-4 w-4 text-green-500 inline mr-1" />
              0.1 toneladas desde el mes pasado
            </p>
          </CardContent>
        </Card>
        {assetCategories.slice(0, 3).map((category, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {category.name}
              </CardTitle>
              {category.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {category.emissions.toFixed(1)} toneladas CO2e
              </div>
              <p className="text-xs text-muted-foreground">
                {category.emissions > 0.2 ? (
                  <ArrowUp className="h-4 w-4 text-red-500 inline mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-green-500 inline mr-1" />
                )}
                {(category.emissions * 0.1).toFixed(1)} toneladas desde el mes
                pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <BarChartIcon className="h-5 w-5" />
              Evolución de Huella de Carbono
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} t`}
                />
                <Bar
                  dataKey="total"
                  fill="#4ade80"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Leaf className="h-5 w-5" />
              Desglose por Categoría de Activos
            </CardTitle>
            <CardDescription>
              Tu huella de carbono por tipo de activo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetCategories.map((category, index) => (
                <div
                  key={index}
                  className="space-y-2"
                >
                  <div className="flex items-center">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {category.icon}
                        <p className="text-sm font-medium leading-none">
                          {category.name}
                        </p>
                      </div>
                      <div className="font-medium">
                        {((category.emissions / totalEmissions) * 100).toFixed(
                          0
                        )}
                        %
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={(category.emissions / totalEmissions) * 100}
                    className={`h-2 ${category.color}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <AlertCircle className="h-5 w-5" />
              Consejos para Reducir tu Huella
            </CardTitle>
            <CardDescription>
              Pequeños cambios pueden tener un gran impacto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Building className="mt-0.5 h-5 w-5 text-blue-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Mejora la eficiencia energética de los edificios
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Implementa sistemas de gestión de energía y aislamiento
                    térmico
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Car className="mt-0.5 h-5 w-5 text-green-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Optimiza la flota de vehículos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Considera vehículos eléctricos o híbridos para reducir
                    emisiones
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Factory className="mt-0.5 h-5 w-5 text-yellow-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Actualiza la maquinaria a modelos más eficientes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Invierte en tecnología que reduzca el consumo de energía y
                    recursos
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Leaf className="h-5 w-5" />
              Tu Meta de Reducción
            </CardTitle>
            <CardDescription>
              Progreso hacia tu objetivo de reducción anual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Meta Anual: 20% de reducción
                </p>
                <p className="text-sm text-muted-foreground">
                  {(totalEmissions * 0.2).toFixed(2)} toneladas CO2e /{" "}
                  {totalEmissions.toFixed(2)} toneladas CO2e
                </p>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {goalProgress}%
              </div>
            </div>
            <Progress
              value={goalProgress}
              className="h-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>0%</div>
              <div>100%</div>
            </div>
            <Button
              className="w-full bg-green-700 hover:bg-green-800"
              onClick={() => setGoalProgress(Math.min(100, goalProgress + 5))}
            >
              Actualizar Progreso
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
