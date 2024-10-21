"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Zap, Leaf, Factory, BarChart, Calendar, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  sourceName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  sourceType: z.string({
    required_error: "Por favor seleccione un tipo de fuente de energía.",
  }),
  energyOutput: z.number().min(0, {
    message: "La producción de energía debe ser un número positivo.",
  }),
  outputUnit: z.string({
    required_error: "Por favor seleccione una unidad de medida.",
  }),
  location: z
    .string()
    .min(2, { message: "La ubicación debe tener al menos 2 caracteres." }),
  commissionDate: z.date({
    required_error: "La fecha de puesta en marcha es requerida.",
  }),
  operationalHours: z
    .number()
    .min(0)
    .max(24, { message: "Las horas operativas deben estar entre 0 y 24." }),
  efficiency: z
    .number()
    .min(0)
    .max(100, { message: "La eficiencia debe estar entre 0 y 100%." }),
  carbonEmissionFactor: z.number().min(0, {
    message: "El factor de emisión de carbono debe ser un número positivo.",
  }),
  renewablePercentage: z.number().min(0).max(100, {
    message: "El porcentaje renovable debe estar entre 0 y 100%.",
  }),
  maintenanceFrequency: z.string({
    required_error: "Por favor seleccione una frecuencia de mantenimiento.",
  }),
  lastMaintenance: z.date({
    required_error: "La fecha del último mantenimiento es requerida.",
  }),
  nextMaintenance: z.date({
    required_error: "La fecha del próximo mantenimiento es requerida.",
  }),
  wasteBiproducts: z.array(z.string()).optional(),
  recyclingMeasures: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  gridConnection: z.boolean(),
  backupSystem: z.boolean(),
  smartMeterInstalled: z.boolean(),
  historicalData: z.object({
    lastYearProduction: z.number().min(0, {
      message: "La producción del año pasado debe ser un número positivo.",
    }),
    averageMonthlyProduction: z.number().min(0, {
      message: "La producción mensual promedio debe ser un número positivo.",
    }),
    peakDemandTime: z.string().optional(),
  }),
  costEfficiency: z.number().min(0, {
    message: "La eficiencia de costos debe ser un número positivo.",
  }),
  governmentIncentives: z.boolean(),
  futureExpansionPlans: z.boolean(),
  communityImpact: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export default function EnergySourceRegistration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceName: "",
      sourceType: "",
      energyOutput: 0,
      outputUnit: "",
      location: "",
      commissionDate: new Date(),
      operationalHours: 24,
      efficiency: 0,
      carbonEmissionFactor: 0,
      renewablePercentage: 0,
      maintenanceFrequency: "",
      lastMaintenance: new Date(),
      nextMaintenance: new Date(),
      wasteBiproducts: [],
      recyclingMeasures: [],
      certifications: [],
      gridConnection: false,
      backupSystem: false,
      smartMeterInstalled: false,
      historicalData: {
        lastYearProduction: 0,
        averageMonthlyProduction: 0,
        peakDemandTime: "",
      },
      costEfficiency: 0,
      governmentIncentives: false,
      futureExpansionPlans: false,
      communityImpact: "",
      additionalNotes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Registro de Fuente de Energía
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Zap className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Información Básica</h2>
              </div>
              <FormField
                control={form.control}
                name="sourceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Fuente</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Planta Solar Norte"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sourceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Fuente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de fuente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="solar">Solar</SelectItem>
                        <SelectItem value="wind">Eólica</SelectItem>
                        <SelectItem value="hydro">Hidroeléctrica</SelectItem>
                        <SelectItem value="geothermal">Geotérmica</SelectItem>
                        <SelectItem value="biomass">Biomasa</SelectItem>
                        <SelectItem value="natural-gas">Gas Natural</SelectItem>
                        <SelectItem value="coal">Carbón</SelectItem>
                        <SelectItem value="nuclear">Nuclear</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="energyOutput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producción de Energía</FormLabel>
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
              <FormField
                control={form.control}
                name="outputUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de Medida</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una unidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kWh">kWh</SelectItem>
                        <SelectItem value="MWh">MWh</SelectItem>
                        <SelectItem value="GWh">GWh</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Ciudad, Provincia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Factory className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Detalles Operativos</h2>
              </div>
              <FormField
                control={form.control}
                name="commissionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Puesta en Marcha</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="operationalHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas Operativas Diarias</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={24}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>Horas: {field.value}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="efficiency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eficiencia (%)</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Eficiencia: {field.value}%
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbonEmissionFactor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Factor de Emisión de Carbono (gCO2eq/kWh)
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
              <FormField
                control={form.control}
                name="renewablePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porcentaje Renovable (%)</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Porcentaje: {field.value}%
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Calendar className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Mantenimiento</h2>
            </div>
            <FormField
              control={form.control}
              name="maintenanceFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frecuencia de Mantenimiento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una frecuencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="semi-annual">Semestral</SelectItem>

                      <SelectItem value="annual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastMaintenance"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha del Último Mantenimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            field.value.toLocaleDateString()
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nextMaintenance"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha del Próximo Mantenimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            field.value.toLocaleDateString()
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Leaf className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Sostenibilidad y Certificaciones
              </h2>
            </div>
            <FormField
              control={form.control}
              name="wasteBiproducts"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Residuos y Subproductos
                    </FormLabel>
                    <FormDescription>
                      Seleccione todos los residuos o subproductos generados.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "ash",
                      "greenhouse-gases",
                      "wastewater",
                      "heat",
                      "noise",
                      "radioactive-waste",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="wasteBiproducts"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item
                                  .split("-")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recyclingMeasures"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Medidas de Reciclaje
                    </FormLabel>
                    <FormDescription>
                      Seleccione todas las medidas de reciclaje implementadas.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "water-recycling",
                      "waste-heat-recovery",
                      "material-recycling",
                      "carbon-capture",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="recyclingMeasures"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item
                                  .split("-")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certifications"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Certificaciones</FormLabel>
                    <FormDescription>
                      Seleccione todas las certificaciones obtenidas.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "iso-14001",
                      "iso-50001",
                      "leed",
                      "green-energy",
                      "carbon-neutral",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="certifications"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item
                                  .split("-")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <BarChart className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Datos Históricos y Eficiencia
              </h2>
            </div>
            <FormField
              control={form.control}
              name="historicalData.lastYearProduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producción del Año Pasado (kWh)</FormLabel>
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
            <FormField
              control={form.control}
              name="historicalData.averageMonthlyProduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producción Mensual Promedio (kWh)</FormLabel>
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
            <FormField
              control={form.control}
              name="historicalData.peakDemandTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora de Demanda Pico</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costEfficiency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eficiencia de Costos ($/kWh)</FormLabel>
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
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Info className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Información Adicional</h2>
            </div>
            <FormField
              control={form.control}
              name="gridConnection"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Conexión a la Red
                    </FormLabel>
                    <FormDescription>
                      ¿La fuente de energía está conectada a la red eléctrica?
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
              name="backupSystem"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Sistema de Respaldo
                    </FormLabel>
                    <FormDescription>
                      ¿Cuenta con un sistema de respaldo de energía?
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
              name="smartMeterInstalled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Medidor Inteligente
                    </FormLabel>
                    <FormDescription>
                      ¿Tiene instalado un medidor inteligente?
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
              name="governmentIncentives"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Incentivos Gubernamentales
                    </FormLabel>
                    <FormDescription>
                      ¿Recibe incentivos gubernamentales para energía limpia?
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
              name="futureExpansionPlans"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Planes de Expansión Futura
                    </FormLabel>
                    <FormDescription>
                      ¿Existen planes de expansión para esta fuente de energía?
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
              name="communityImpact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impacto en la Comunidad</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa el impacto de esta fuente de energía en la comunidad local..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas Adicionales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cualquier información adicional relevante para el análisis de huella de carbono..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-800"
          >
            Registrar Fuente de Energía
          </Button>
        </form>
      </Form>
    </div>
  );
}
