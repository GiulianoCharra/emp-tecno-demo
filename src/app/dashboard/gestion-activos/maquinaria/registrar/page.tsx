"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Factory, Zap, Clock, Wrench, Leaf } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre de la maquinaria debe tener al menos 2 caracteres.",
  }),
  model: z.string().min(2, {
    message: "El número de modelo debe tener al menos 2 caracteres.",
  }),
  manufacturer: z.string().min(2, {
    message: "El nombre del fabricante debe tener al menos 2 caracteres.",
  }),
  type: z.string({
    required_error: "Por favor seleccione un tipo de maquinaria.",
  }),
  yearManufactured: z.number().int().positive().max(new Date().getFullYear(), {
    message: "El año de fabricación no puede ser en el futuro.",
  }),
  energySource: z.string({
    required_error: "Por favor seleccione una fuente de energía.",
  }),
  powerRating: z
    .number()
    .positive({ message: "La potencia nominal debe ser un número positivo." }),
  averageEnergyConsumption: z.number().nonnegative({
    message: "El consumo de energía debe ser un número no negativo.",
  }),
  operatingHours: z.number().nonnegative({
    message: "Las horas de operación deben ser un número no negativo.",
  }),
  efficiency: z
    .number()
    .min(0)
    .max(100, { message: "La eficiencia debe estar entre 0 y 100." }),
  maintenanceFrequency: z.string({
    required_error: "Por favor seleccione una frecuencia de mantenimiento.",
  }),
  lastMaintenanceDate: z.date({
    required_error: "La fecha del último mantenimiento es requerida.",
  }),
  emissionsRating: z.string().optional(),
  noiseLevelDecibels: z.number().nonnegative({
    message: "El nivel de ruido debe ser un número no negativo.",
  }),
  wasteProduction: z.number().nonnegative({
    message: "La producción de residuos debe ser un número no negativo.",
  }),
  recycledMaterialsPercentage: z.number().min(0).max(100, {
    message: "El porcentaje de materiales reciclados debe estar entre 0 y 100.",
  }),
  hasEmissionControlSystem: z.boolean(),
  isEnergyStarCertified: z.boolean(),
  additionalNotes: z.string().optional(),
});

export default function MachineryRegistration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      manufacturer: "",
      type: "",
      yearManufactured: new Date().getFullYear(),
      energySource: "",
      powerRating: 0,
      averageEnergyConsumption: 0,
      operatingHours: 0,
      efficiency: 0,
      maintenanceFrequency: "",
      lastMaintenanceDate: new Date(),
      noiseLevelDecibels: 0,
      wasteProduction: 0,
      recycledMaterialsPercentage: 0,
      hasEmissionControlSystem: false,
      isEnergyStarCertified: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <Factory className="h-8 w-8" />
        Registro de Nueva Maquinaria
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Maquinaria</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Torno CNC"
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
                        placeholder="XYZ-1000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fabricante</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Industrial Machines Co."
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
                    <FormLabel>Tipo de Maquinaria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cnc">CNC</SelectItem>
                        <SelectItem value="lathe">Torno</SelectItem>
                        <SelectItem value="mill">Fresadora</SelectItem>
                        <SelectItem value="press">Prensa</SelectItem>
                        <SelectItem value="robot">Robot Industrial</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="yearManufactured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año de Fabricación</FormLabel>
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
                    <FormLabel>Fuente de Energía</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una fuente de energía" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electricity">
                          Electricidad
                        </SelectItem>
                        <SelectItem value="natural-gas">Gas Natural</SelectItem>
                        <SelectItem value="diesel">Diésel</SelectItem>
                        <SelectItem value="propane">Propano</SelectItem>
                        <SelectItem value="solar">Solar</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="powerRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potencia Nominal (kW)</FormLabel>
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
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Zap className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Consumo de Energía</h2>
            </div>
            <FormField
              control={form.control}
              name="averageEnergyConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo Promedio de Energía (kWh/hora)</FormLabel>
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
              name="efficiency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eficiencia Energética (%)</FormLabel>
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
                    Eficiencia actual: {field.value}%
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Clock className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Operación</h2>
            </div>
            <FormField
              control={form.control}
              name="operatingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas de Operación Diarias</FormLabel>
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
              <Wrench className="h-5 w-5" />
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
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="biannual">Semestral</SelectItem>
                      <SelectItem value="annual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastMaintenanceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha del Último Mantenimiento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Leaf className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Impacto Ambiental</h2>
            </div>
            <FormField
              control={form.control}
              name="emissionsRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clasificación de Emisiones</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una clasificación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">A (Muy Baja)</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F (Muy Alta)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noiseLevelDecibels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel de Ruido (dB)</FormLabel>
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
              name="wasteProduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producción de Residuos (kg/día)</FormLabel>
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
              name="recycledMaterialsPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porcentaje de Materiales Reciclados (%)</FormLabel>
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
                    Porcentaje actual: {field.value}%
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hasEmissionControlSystem"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Sistema de Control de Emisiones
                    </FormLabel>
                    <FormDescription>
                      ¿La maquinaria cuenta con un sistema de control de
                      emisiones?
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
              name="isEnergyStarCertified"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Certificación Energy Star
                    </FormLabel>
                    <FormDescription>
                      ¿La maquinaria cuenta con certificación Energy Star?
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

          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas Adicionales</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cualquier información adicional relevante sobre la maquinaria..."
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
            Registrar Maquinaria
          </Button>
        </form>
      </Form>
    </div>
  );
}
