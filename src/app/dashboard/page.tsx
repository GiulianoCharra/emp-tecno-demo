"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Leaf,
  ShoppingCart,
  Zap,
  Car,
  BarChart as BarChartIcon,
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

const data = [
  { name: "Ene", total: 1.2 },
  { name: "Feb", total: 1.1 },
  { name: "Mar", total: 1.3 },
  { name: "Abr", total: 1.0 },
  { name: "May", total: 0.9 },
  { name: "Jun", total: 1.1 },
];

export default function Dashboard() {
  const [goalProgress, setGoalProgress] = useState(65);

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
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
              1.2 toneladas CO2e
            </div>
            <p className="text-xs text-muted-foreground">
              <ArrowDown className="h-4 w-4 text-green-500 inline mr-1" />
              0.1 toneladas desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energía</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.5 toneladas CO2e</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUp className="h-4 w-4 text-red-500 inline mr-1" />
              0.1 toneladas desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transporte</CardTitle>
            <Car className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.4 toneladas CO2e</div>
            <p className="text-xs text-muted-foreground">
              <ArrowDown className="h-4 w-4 text-green-500 inline mr-1" />
              0.2 toneladas desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumo</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.3 toneladas CO2e</div>
            <p className="text-xs text-muted-foreground">
              Sin cambios desde el mes pasado
            </p>
          </CardContent>
        </Card>
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
              Desglose por Categoría
            </CardTitle>
            <CardDescription>
              Tu huella de carbono por área de actividad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Energía
                      </p>
                      <p className="text-sm text-muted-foreground">
                        0.5 toneladas CO2e
                      </p>
                    </div>
                    <div className="font-medium">42%</div>
                  </div>
                </div>
                <Progress
                  value={42}
                  className="h-2 bg-yellow-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Transporte
                      </p>
                      <p className="text-sm text-muted-foreground">
                        0.4 toneladas CO2e
                      </p>
                    </div>
                    <div className="font-medium">33%</div>
                  </div>
                </div>
                <Progress
                  value={33}
                  className="h-2 bg-blue-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Consumo
                      </p>
                      <p className="text-sm text-muted-foreground">
                        0.3 toneladas CO2e
                      </p>
                    </div>
                    <div className="font-medium">25%</div>
                  </div>
                </div>
                <Progress
                  value={25}
                  className="h-2 bg-purple-500"
                />
              </div>
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
                <Car className="mt-0.5 h-5 w-5 text-blue-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Usa transporte público o bicicleta
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reduce tus emisiones de transporte hasta en un 50%
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Zap className="mt-0.5 h-5 w-5 text-yellow-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Cambia a bombillas LED
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ahorra hasta un 80% en el consumo de energía para
                    iluminación
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Leaf className="mt-0.5 h-5 w-5 text-green-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Reduce el consumo de carne
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Una dieta basada en plantas puede reducir tu huella hasta en
                    un 30%
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
                  0.24 toneladas CO2e / 1.2 toneladas CO2e
                </p>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {goalProgress}%
              </div>
            </div>
            <Progress
              value={goalProgress}
              className="h-2 bg-green-600"
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
    </main>
  );
}
