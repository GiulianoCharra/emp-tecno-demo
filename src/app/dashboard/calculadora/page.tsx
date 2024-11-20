"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Leaf, Home, Car, ShoppingBag, Recycle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  // Housing
  housingType: z.enum(["apartment", "house", "other"]),
  houseSize: z.number().min(10).max(1000),
  energySource: z.enum(["fossil", "mixed", "renewable"]),
  energyEfficiency: z.number().min(1).max(5),
  insulationType: z.enum(["none", "basic", "advanced"]),
  heatingSystem: z.enum(["electric", "gas", "oil", "heatPump", "other"]),
  coolingSystem: z.enum(["none", "fans", "airConditioning"]),
  waterUsage: z.number().min(0).max(1000),
  adultsNumber: z.number().min(0).max(20),
  childrenNumber: z.number().min(0).max(20),
  elderlyNumber: z.number().min(0).max(20),

  // Transportation
  primaryTransport: z.enum(["car", "publicTransport", "bicycle", "walking"]),
  carType: z
    .enum(["gasoline", "diesel", "hybrid", "electric", "none"])
    .optional(),
  carFuelEfficiency: z.number().min(0).max(50).optional(),
  weeklyDriving: z.number().min(0).max(2000),
  publicTransportUsage: z.number().min(0).max(40),
  flightsPerYear: z.number().min(0).max(100),
  longDistanceBusTrainTrips: z.number().min(0).max(50),

  // Consumption
  dietType: z.enum(["meatHeavy", "average", "vegetarian", "vegan"]),
  localFoodPercentage: z.number().min(0).max(100),
  foodWaste: z.number().min(0).max(100),
  clothingPurchases: z.number().min(0).max(200),
  electronicsUsage: z.number().min(0).max(24),

  // Recycling
  recyclingHabits: z.object({
    paper: z.boolean(),
    plastic: z.boolean(),
    glass: z.boolean(),
    metal: z.boolean(),
    organic: z.boolean(),
  }),
  compostingHabits: z.boolean(),
  singleUsePlasticsReduction: z.number().min(0).max(5),

  // Lifestyle
  workFromHome: z.number().min(0).max(7),
  greenEnergyInvestment: z.boolean(),
  communityInvolvement: z.boolean(),
  carbonOffsetPurchases: z.boolean(),
});

const carbonCreditProjects = [
  {
    id: "1",
    name: "Reforestación Amazónica",
    description: "Proyecto de reforestación en la Amazonía brasileña",
    image: "/images/reforestacion-amazonica.png",
  },
  {
    id: "2",
    name: "Parque Eólico Patagonia",
    description: "Desarrollo de energía eólica en la Patagonia argentina",
    image: "/images/parque-eolico-patagonia.png",
  },
  {
    id: "3",
    name: "Conservación de Manglares",
    description: "Protección de ecosistemas de manglares en Bangladesh",
    image: "/images/conservacion-de-manglares.png",
  },
];

export default function CarbonFootprintCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      housingType: "apartment",
      houseSize: 50,
      energySource: "mixed",
      energyEfficiency: 3,
      insulationType: "basic",
      heatingSystem: "electric",
      coolingSystem: "fans",
      waterUsage: 150,
      primaryTransport: "car",
      carType: "gasoline",
      carFuelEfficiency: 10,
      weeklyDriving: 100,
      publicTransportUsage: 5,
      flightsPerYear: 2,
      longDistanceBusTrainTrips: 5,
      dietType: "average",
      localFoodPercentage: 20,
      foodWaste: 20,
      clothingPurchases: 50,
      electronicsUsage: 4,
      recyclingHabits: {
        paper: false,
        plastic: false,
        glass: false,
        metal: false,
        organic: false,
      },
      compostingHabits: false,
      singleUsePlasticsReduction: 2,
      workFromHome: 0,
      greenEnergyInvestment: false,
      communityInvolvement: false,
      carbonOffsetPurchases: false,
    },
  });

  const steps = [
    { title: "Vivienda", icon: <Home className="h-6 w-6" /> },
    { title: "Transporte", icon: <Car className="h-6 w-6" /> },
    { title: "Consumo", icon: <ShoppingBag className="h-6 w-6" /> },
    { title: "Reciclaje", icon: <Recycle className="h-6 w-6" /> },
    { title: "Estilo de Vida", icon: <Leaf className="h-6 w-6" /> },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Calculate carbon footprint based on form values
    let footprint = 0;

    // Housing calculations
    const housingSizeFactor = values.houseSize / 100;
    const energySourceFactor =
      values.energySource === "fossil"
        ? 1.5
        : values.energySource === "mixed"
        ? 1
        : 0.5;
    const energyEfficiencyFactor = (6 - values.energyEfficiency) / 5;
    const insulationFactor =
      values.insulationType === "none"
        ? 1.2
        : values.insulationType === "basic"
        ? 1
        : 0.8;
    const heatingFactor =
      values.heatingSystem === "oil"
        ? 1.5
        : values.heatingSystem === "gas"
        ? 1.2
        : values.heatingSystem === "electric"
        ? 1
        : 0.8;
    const coolingFactor =
      values.coolingSystem === "airConditioning"
        ? 1.3
        : values.coolingSystem === "fans"
        ? 1.1
        : 1;
    const waterUsageFactor = values.waterUsage / 150;

    footprint +=
      2 *
      housingSizeFactor *
      energySourceFactor *
      energyEfficiencyFactor *
      insulationFactor *
      heatingFactor *
      coolingFactor *
      waterUsageFactor;

    // Transportation calculations
    const transportFactor =
      values.primaryTransport === "car"
        ? 2
        : values.primaryTransport === "publicTransport"
        ? 1
        : 0.5;
    const carTypeFactor =
      values.carType === "gasoline"
        ? 1.5
        : values.carType === "diesel"
        ? 1.8
        : values.carType === "hybrid"
        ? 1
        : values.carType === "electric"
        ? 0.5
        : 0;
    const carEfficiencyFactor = values.carFuelEfficiency
      ? 10 / values.carFuelEfficiency
      : 1;
    footprint +=
      (values.weeklyDriving / 100) *
      transportFactor *
      carTypeFactor *
      carEfficiencyFactor;
    footprint += (values.publicTransportUsage / 10) * 0.5;
    footprint += values.flightsPerYear * 0.5;
    footprint += values.longDistanceBusTrainTrips * 0.1;

    // Consumption calculations
    const dietFactor =
      values.dietType === "meatHeavy"
        ? 2
        : values.dietType === "average"
        ? 1.5
        : values.dietType === "vegetarian"
        ? 1
        : 0.8;
    const localFoodFactor = 1 - values.localFoodPercentage / 200;
    const foodWasteFactor = values.foodWaste / 100;
    const clothingFactor = values.clothingPurchases / 50;
    const electronicsFactor = values.electronicsUsage / 8;

    footprint +=
      2 *
      dietFactor *
      localFoodFactor *
      (1 + foodWasteFactor) *
      clothingFactor *
      electronicsFactor;

    // Recycling calculations
    const recyclingItems = Object.values(values.recyclingHabits).filter(
      Boolean
    ).length;
    const recyclingFactor = 1 - recyclingItems * 0.1;
    const compostingFactor = values.compostingHabits ? 0.9 : 1;
    const plasticReductionFactor = 1 - values.singleUsePlasticsReduction * 0.05;

    footprint *= recyclingFactor * compostingFactor * plasticReductionFactor;

    // Lifestyle calculations
    const workFromHomeFactor = 1 - values.workFromHome * 0.02;
    const greenInvestmentFactor = values.greenEnergyInvestment ? 0.95 : 1;
    const communityInvolvementFactor = values.communityInvolvement ? 0.98 : 1;
    const carbonOffsetFactor = values.carbonOffsetPurchases ? 0.9 : 1;

    footprint *=
      workFromHomeFactor *
      greenInvestmentFactor *
      communityInvolvementFactor *
      carbonOffsetFactor;

    setResult(Math.round(footprint * 100) / 100);

    // Determine user profile
    if (footprint < 4) {
      setUserProfile("Eco-Warrior");
    } else if (footprint < 8) {
      setUserProfile("Consciente del Clima");
    } else if (footprint < 12) {
      setUserProfile("Ciudadano Promedio");
    } else if (footprint < 16) {
      setUserProfile("Alto Impacto");
    } else {
      setUserProfile("Huella Extrema");
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Calculadora de Huella de Carbono
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        Descubre tu impacto ambiental y aprende cómo reducirlo.
      </p>

      {result === null ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index === currentStep ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {step.icon}
                  <span className="ml-2">{step.title}</span>
                </div>
              ))}
            </div>

            <Progress
              value={((currentStep + 1) / steps.length) * 100}
              className="mb-4"
            />

            <Tabs
              value={currentStep.toString()}
              onValueChange={(value) => setCurrentStep(parseInt(value))}
            >
              <TabsContent value="0">
                <Card>
                  <CardHeader>
                    <CardTitle>Vivienda</CardTitle>
                    <CardDescription>
                      Cuéntanos sobre tu hogar y consumo de energía.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="housingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Vivienda</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el tipo de vivienda" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">
                                Apartamento
                              </SelectItem>
                              <SelectItem value="house">Casa</SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* campos para cargar eel numero de habitantes adultos*/}
                    <FormField
                      control={form.control}
                      name="adultsNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Adultos</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              value="1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* campos para cargar eel numero de habitantes niños*/}
                    <FormField
                      control={form.control}
                      name="childrenNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Niños</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* campos para cargar eel numero de habitantes adultos mayores*/}
                    <FormField
                      control={form.control}
                      name="elderlyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Adultos Mayores</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="houseSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tamaño de la Vivienda (m²)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="energySource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuente Principal de Energía</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona la fuente de energía" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fossil">
                                Combustibles Fósiles
                              </SelectItem>
                              <SelectItem value="mixed">Mixta</SelectItem>
                              <SelectItem value="renewable">
                                Renovable
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="energyEfficiency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Eficiencia Energética (1-5)</FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={5}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            1 = Baja eficiencia, 5 = Alta eficiencia
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="insulationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Aislamiento</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el tipo de aislamiento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">
                                Sin aislamiento
                              </SelectItem>
                              <SelectItem value="basic">
                                Aislamiento básico
                              </SelectItem>
                              <SelectItem value="advanced">
                                Aislamiento avanzado
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="heatingSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sistema de Calefacción</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el sistema de calefacción" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="electric">
                                Eléctrico
                              </SelectItem>
                              <SelectItem value="gas">Gas</SelectItem>
                              <SelectItem value="oil">Petróleo</SelectItem>
                              <SelectItem value="heatPump">
                                Bomba de calor
                              </SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coolingSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sistema de Refrigeración</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el sistema de refrigeración" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">
                                Sin refrigeración
                              </SelectItem>
                              <SelectItem value="fans">Ventiladores</SelectItem>
                              <SelectItem value="airConditioning">
                                Aire acondicionado
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="waterUsage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Consumo de Agua (litros por día)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="1">
                <Card>
                  <CardHeader>
                    <CardTitle>Transporte</CardTitle>
                    <CardDescription>
                      Información sobre tus hábitos de transporte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="primaryTransport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medio de Transporte Principal</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu medio de transporte principal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="car">Automóvil</SelectItem>
                              <SelectItem value="publicTransport">
                                Transporte Público
                              </SelectItem>
                              <SelectItem value="bicycle">Bicicleta</SelectItem>
                              <SelectItem value="walking">Caminar</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("primaryTransport") === "car" && (
                      <>
                        <FormField
                          control={form.control}
                          name="carType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Automóvil</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el tipo de automóvil" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="gasoline">
                                    Gasolina
                                  </SelectItem>
                                  <SelectItem value="diesel">Diésel</SelectItem>
                                  <SelectItem value="hybrid">
                                    Híbrido
                                  </SelectItem>
                                  <SelectItem value="electric">
                                    Eléctrico
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="carFuelEfficiency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Eficiencia del Combustible (km/l)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    <FormField
                      control={form.control}
                      name="weeklyDriving"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Kilómetros Conducidos por Semana
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="publicTransportUsage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Uso de Transporte Público (horas por semana)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="flightsPerYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vuelos por Año</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="longDistanceBusTrainTrips"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Viajes de Larga Distancia en Bus o Tren por Año
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="2">
                <Card>
                  <CardHeader>
                    <CardTitle>Consumo</CardTitle>
                    <CardDescription>
                      Hábitos de alimentación y compras.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="dietType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Dieta</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu tipo de dieta" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="meatHeavy">
                                Alta en Carne
                              </SelectItem>
                              <SelectItem value="average">Promedio</SelectItem>
                              <SelectItem value="vegetarian">
                                Vegetariana
                              </SelectItem>
                              <SelectItem value="vegan">Vegana</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="localFoodPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Porcentaje de Alimentos Locales (%)
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Porcentaje estimado de alimentos locales en tu dieta
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="foodWaste"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desperdicio de Alimentos (%)</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Porcentaje estimado de alimentos que desperdicias
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clothingPurchases"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Compras de Ropa (prendas por año)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="electronicsUsage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Uso de Dispositivos Electrónicos (horas por día)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="3">
                <Card>
                  <CardHeader>
                    <CardTitle>Reciclaje</CardTitle>
                    <CardDescription>
                      Tus hábitos de reciclaje y reducción de residuos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="recyclingHabits.paper"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Papel</FormLabel>
                            <FormDescription>
                              ¿Reciclas regularmente el papel?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recyclingHabits.plastic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Plástico
                            </FormLabel>
                            <FormDescription>
                              ¿Reciclas regularmente el plástico?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recyclingHabits.glass"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Vidrio</FormLabel>
                            <FormDescription>
                              ¿Reciclas regularmente el vidrio?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recyclingHabits.metal"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Metal</FormLabel>
                            <FormDescription>
                              ¿Reciclas regularmente el metal?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recyclingHabits.organic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Orgánico
                            </FormLabel>
                            <FormDescription>
                              ¿Reciclas o compostas regularmente los residuos
                              orgánicos?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="compostingHabits"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Compostaje
                            </FormLabel>
                            <FormDescription>
                              ¿Realizas compostaje en casa?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="singleUsePlasticsReduction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Reducción de Plásticos de Un Solo Uso (1-5)
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={5}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            1 = Poco esfuerzo, 5 = Gran esfuerzo en reducción
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="4">
                <Card>
                  <CardHeader>
                    <CardTitle>Estilo de Vida</CardTitle>
                    <CardDescription>
                      Otros aspectos de tu estilo de vida que impactan en tu
                      huella de carbono.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="workFromHome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Días de Trabajo desde Casa por Semana
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              min={0}
                              max={7}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="greenEnergyInvestment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Inversión en Energía Verde
                            </FormLabel>
                            <FormDescription>
                              ¿Has invertido en energías renovables o eficiencia
                              energética?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="communityInvolvement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Participación Comunitaria
                            </FormLabel>
                            <FormDescription>
                              ¿Participas en iniciativas ambientales locales?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="carbonOffsetPurchases"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Compra de Compensaciones de Carbono
                            </FormLabel>
                            <FormDescription>
                              ¿Has comprado compensaciones de carbono en el
                              último año?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Anterior
              </Button>
              <Button
                type="button"
                onClick={nextStep}
              >
                {currentStep === steps.length - 1 ? "Calcular" : "Siguiente"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Resultado de tu Huella de Carbono</CardTitle>
            <CardDescription>
              Basado en tus respuestas, hemos calculado tu impacto ambiental.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-700 mb-4">
                {result} toneladas de CO2e/año
              </p>
              <p className="text-xl mb-4">
                Tu perfil: <span className="font-semibold">{userProfile}</span>
              </p>
              <Progress
                value={(result / 20) * 100}
                className="w-full h-4 mb-4"
              />
              <p className="text-sm text-gray-600">
                0 toneladas CO2e/año ← Promedio mundial: 4.5 toneladas CO2e/año
                → 20+ toneladas CO2e/año
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <h3 className="text-lg font-semibold">
              Recomendaciones para reducir tu huella:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Considera cambiar a fuentes de energía renovable en tu hogar.
              </li>
              <li>
                Mejora el aislamiento de tu vivienda para reducir el consumo de
                energía.
              </li>
              <li>
                Utiliza más el transporte público o medios de transporte no
                motorizados.
              </li>
              <li>
                Si usas coche, considera cambiar a un modelo más eficiente o
                eléctrico.
              </li>
              <li>
                Reduce el consumo de carne y opta por una dieta más basada en
                plantas.
              </li>
              <li>Compra más alimentos locales y de temporada.</li>
              <li>
                Mejora tus hábitos de reciclaje y reduce el desperdicio de
                alimentos.
              </li>
              <li>Reduce el uso de plásticos de un solo uso.</li>
              <li>
                Invierte en tecnologías de eficiencia energética para tu hogar.
              </li>
              <li>Participa en iniciativas comunitarias de sostenibilidad.</li>
              <li>
                Considera comprar compensaciones de carbono para las emisiones
                que no puedas reducir.
              </li>
            </ul>
            <div className="grid gap-4 md:grid-cols-3">
              {carbonCreditProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="p-4">
                    <div className="relative w-full h-40 mb-2">
                      <Image
                        src={project.image}
                        alt={project.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/dashboard/marketplace">
                <Button className="bg-green-600 hover:bg-green-700">
                  Explorar Marketplace de Bonos de Carbono
                </Button>
              </Link>
            </div>

            <Button
              onClick={() => {
                setResult(null);
                setUserProfile(null);
              }}
              className="mt-4"
            >
              Volver a calcular
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
