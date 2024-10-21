"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Truck, Calendar, Fuel, Recycle, Zap } from "lucide-react";

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
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  type: z.string({
    required_error: "Por favor seleccione un tipo de vehículo.",
  }),
  brand: z
    .string()
    .min(2, { message: "La marca debe tener al menos 2 caracteres." }),
  model: z
    .string()
    .min(2, { message: "El modelo debe tener al menos 2 caracteres." }),
  year: z
    .number()
    .min(1900, { message: "El año debe ser 1900 o posterior." })
    .max(new Date().getFullYear() + 1, {
      message: "El año no puede ser futuro.",
    }),
  licensePlate: z
    .string()
    .min(2, { message: "La matrícula debe tener al menos 2 caracteres." }),
  vin: z
    .string()
    .length(17, { message: "El VIN debe tener exactamente 17 caracteres." }),
  fuelType: z.string({
    required_error: "Por favor seleccione un tipo de combustible.",
  }),
  consumption: z
    .number()
    .min(0, { message: "El consumo debe ser un número positivo." }),
  mileage: z
    .number()
    .min(0, { message: "El kilometraje debe ser un número positivo." }),
  lastMaintenance: z.date({
    required_error: "La fecha del último mantenimiento es requerida.",
  }),
  nextMaintenance: z.date({
    required_error: "La fecha del próximo mantenimiento es requerida.",
  }),
  tireType: z.string({
    required_error: "Por favor seleccione un tipo de neumático.",
  }),
  tirePressure: z
    .number()
    .min(20, {
      message: "La presión de los neumáticos debe ser al menos 20 PSI.",
    })
    .max(50, {
      message: "La presión de los neumáticos no debe exceder 50 PSI.",
    }),
  oilType: z.string({
    required_error: "Por favor seleccione un tipo de aceite.",
  }),
  batteryType: z.string({
    required_error: "Por favor seleccione un tipo de batería.",
  }),
  acUsage: z
    .number()
    .min(0, {
      message: "El uso del aire acondicionado debe ser un número positivo.",
    })
    .max(100, {
      message: "El uso del aire acondicionado no puede exceder el 100%.",
    }),
  ecoMode: z.boolean(),
  regularMaintenance: z.boolean(),
  wasteManagement: z.array(z.string()).nonempty({
    message: "Seleccione al menos una práctica de gestión de residuos.",
  }),
  carbonFootprint: z
    .number()
    .min(0, { message: "La huella de carbono debe ser un número positivo." }),
  additionalNotes: z.string().optional(),
});

export default function VehicleRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      licensePlate: "",
      vin: "",
      fuelType: "",
      consumption: 0,
      mileage: 0,
      lastMaintenance: new Date(),
      nextMaintenance: new Date(),
      tireType: "",
      tirePressure: 32,
      oilType: "",
      batteryType: "",
      acUsage: 50,
      ecoMode: false,
      regularMaintenance: true,
      wasteManagement: [],
      carbonFootprint: 0,
      additionalNotes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Registro de Vehículo
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Truck className="h-5 w-5" />
                <h2 className="text-xl font-semibold">
                  Información del Vehículo
                </h2>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Vehículo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Camión de Reparto 1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Vehículo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de vehículo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="car">Coche</SelectItem>
                        <SelectItem value="truck">Camión</SelectItem>
                        <SelectItem value="van">Furgoneta</SelectItem>
                        <SelectItem value="motorcycle">Motocicleta</SelectItem>
                        <SelectItem value="bus">Autobús</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Toyota"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Corolla"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
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
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrícula</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: ABC123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Número de Identificación del Vehículo (VIN)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: 1HGBH41JXMN109186"
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
                <Fuel className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Consumo y Eficiencia</h2>
              </div>
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Combustible</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de combustible" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gasoline">Gasolina</SelectItem>
                        <SelectItem value="diesel">Diésel</SelectItem>
                        <SelectItem value="electric">Eléctrico</SelectItem>
                        <SelectItem value="hybrid">Híbrido</SelectItem>
                        <SelectItem value="lpg">GLP</SelectItem>
                        <SelectItem value="cng">GNC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo (L/100km o kWh/100km)</FormLabel>
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
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kilometraje Actual</FormLabel>
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
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <h2 className="text-xl font-semibold">
                Mantenimiento y Componentes
              </h2>
            </div>
            <FormField
              control={form.control}
              name="tireType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Neumáticos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo de neumático" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all-season">All Season</SelectItem>
                      <SelectItem value="summer">Verano</SelectItem>
                      <SelectItem value="winter">Invierno</SelectItem>
                      <SelectItem value="all-terrain">Todo Terreno</SelectItem>
                      <SelectItem value="performance">
                        Alto Rendimiento
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tirePressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presión de Neumáticos (PSI)</FormLabel>
                  <FormControl>
                    <Slider
                      min={20}
                      max={50}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>PSI: {field.value}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oilType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Aceite</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo de aceite" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="synthetic">Sintético</SelectItem>
                      <SelectItem value="semi-synthetic">
                        Semi-sintético
                      </SelectItem>
                      <SelectItem value="mineral">Mineral</SelectItem>
                      <SelectItem value="high-mileage">
                        Alto Kilometraje
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batteryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Batería</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo de batería" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lead-acid">Plomo-ácido</SelectItem>
                      <SelectItem value="agm">AGM</SelectItem>
                      <SelectItem value="lithium-ion">Litio-ion</SelectItem>
                      <SelectItem value="gel">Gel</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Zap className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Eficiencia y Prácticas Sostenibles
              </h2>
            </div>
            <FormField
              control={form.control}
              name="acUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uso del Aire Acondicionado (%)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>Porcentaje: {field.value}%</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ecoMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Modo Eco</FormLabel>
                    <FormDescription>
                      ¿El vehículo tiene y utiliza el modo eco?
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
              name="regularMaintenance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Mantenimiento Regular
                    </FormLabel>
                    <FormDescription>
                      ¿Se realiza mantenimiento regular según las
                      recomendaciones del fabricante?
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
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Recycle className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Gestión de Residuos</h2>
            </div>
            <FormField
              control={form.control}
              name="wasteManagement"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Prácticas de Gestión de Residuos
                    </FormLabel>
                    <FormDescription>
                      Seleccione todas las prácticas de gestión de residuos que
                      se aplican a este vehículo.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "oil-recycling",
                      "tire-recycling",
                      "battery-recycling",
                      "parts-recycling",
                      "eco-friendly-cleaning",
                      "waste-reduction",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="wasteManagement"
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

          <FormField
            control={form.control}
            name="carbonFootprint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Huella de Carbono Estimada (tCO2e/año)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Ingrese la estimación de la huella de carbono anual del
                  vehículo en toneladas de CO2 equivalente.
                </FormDescription>
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
                    placeholder="Cualquier información adicional relevante para el análisis de huella de carbono del vehículo..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-800"
          >
            Registrar Vehículo
          </Button>
        </form>
      </Form>
    </div>
  );
}
