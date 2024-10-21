"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building, Zap, Trash2, Droplet, Leaf } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Building name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  type: z.string({ required_error: "Please select a building type." }),
  area: z.number().positive({ message: "Area must be a positive number." }),
  floors: z
    .number()
    .int()
    .positive({ message: "Number of floors must be a positive integer." }),
  occupancy: z
    .number()
    .int()
    .nonnegative({ message: "Occupancy must be a non-negative integer." }),
  yearBuilt: z
    .number()
    .int()
    .positive()
    .max(new Date().getFullYear(), {
      message: "Year built cannot be in the future.",
    }),
  energySource: z
    .array(z.string())
    .nonempty({ message: "Select at least one energy source." }),
  averageMonthlyEnergy: z
    .number()
    .nonnegative({
      message: "Energy consumption must be a non-negative number.",
    }),
  energyEfficiencyRating: z.string().optional(),
  wasteManagementSystem: z.string({
    required_error: "Please select a waste management system.",
  }),
  recyclingProgram: z.boolean(),
  waterConsumption: z
    .number()
    .nonnegative({
      message: "Water consumption must be a non-negative number.",
    }),
  rainwaterHarvesting: z.boolean(),
  greenSpaces: z.boolean(),
  solarPanels: z.boolean(),
  ledLighting: z.boolean(),
  smartBuildingFeatures: z.array(z.string()),
  additionalNotes: z.string().optional(),
});

export default function BuildingRegistration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      type: "",
      area: 0,
      floors: 1,
      occupancy: 0,
      yearBuilt: new Date().getFullYear(),
      energySource: [],
      averageMonthlyEnergy: 0,
      wasteManagementSystem: "",
      recyclingProgram: false,
      waterConsumption: 0,
      rainwaterHarvesting: false,
      greenSpaces: false,
      solarPanels: false,
      ledLighting: false,
      smartBuildingFeatures: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <Building className="h-8 w-8" />
        Registro de Nuevo Edificio
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
                    <FormLabel>Nombre del Edificio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Torre Sustentable"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Calle Ecológica 123, Ciudad Verde"
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
                    <FormLabel>Tipo de Edificio</FormLabel>
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
                        <SelectItem value="office">Oficina</SelectItem>
                        <SelectItem value="residential">Residencial</SelectItem>
                        <SelectItem value="commercial">Comercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="mixed-use">Uso Mixto</SelectItem>
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
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área Total (m²)</FormLabel>
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
                name="floors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Pisos</FormLabel>
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
                name="occupancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ocupación Máxima</FormLabel>
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
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año de Construcción</FormLabel>
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
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Zap className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Consumo de Energía</h2>
            </div>
            <FormField
              control={form.control}
              name="energySource"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Fuentes de Energía
                    </FormLabel>
                    <FormDescription>
                      Seleccione todas las fuentes de energía utilizadas en el
                      edificio.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "electricity",
                      "natural-gas",
                      "solar",
                      "wind",
                      "geothermal",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="energySource"
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
              name="averageMonthlyEnergy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo Mensual Promedio (kWh)</FormLabel>
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
              name="energyEfficiencyRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calificación de Eficiencia Energética</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una calificación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">A (Muy eficiente)</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                      <SelectItem value="G">G (Poco eficiente)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Trash2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Gestión de Residuos</h2>
            </div>
            <FormField
              control={form.control}
              name="wasteManagementSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sistema de Gestión de Residuos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un sistema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="municipal">
                        Recolección Municipal
                      </SelectItem>
                      <SelectItem value="private">Servicio Privado</SelectItem>
                      <SelectItem value="onsite">
                        Tratamiento in situ
                      </SelectItem>
                      <SelectItem value="mixed">Sistema Mixto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recyclingProgram"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Programa de Reciclaje
                    </FormLabel>
                    <FormDescription>
                      ¿El edificio cuenta con un programa de reciclaje?
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
              <Droplet className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Uso de Agua</h2>
            </div>
            <FormField
              control={form.control}
              name="waterConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo Mensual Promedio de Agua (m³)</FormLabel>
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
              name="rainwaterHarvesting"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Sistema de Recolección de Agua de Lluvia
                    </FormLabel>
                    <FormDescription>
                      ¿El edificio cuenta con un sistema de recolección de agua
                      de lluvia?
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
              <Leaf className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Características Sustentables
              </h2>
            </div>
            <FormField
              control={form.control}
              name="greenSpaces"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Áreas Verdes</FormLabel>
                    <FormDescription>
                      ¿El edificio cuenta con áreas verdes o jardines?
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
              name="solarPanels"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Paneles Solares</FormLabel>
                    <FormDescription>
                      ¿El edificio tiene instalados paneles solares?
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
              name="ledLighting"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Iluminación LED</FormLabel>
                    <FormDescription>
                      ¿El edificio utiliza principalmente iluminación LED?
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
              name="smartBuildingFeatures"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Características de Edificio Inteligente
                    </FormLabel>
                    <FormDescription>
                      Seleccione todas las características de edificio
                      inteligente presentes.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "smart-hvac",
                      "occupancy-sensors",
                      "energy-management-system",
                      "smart-lighting",
                      "building-automation",
                      "smart-water-management",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="smartBuildingFeatures"
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
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas Adicionales</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cualquier información adicional relevante sobre el edificio..."
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
            Registrar Edificio
          </Button>
        </form>
      </Form>
    </div>
  );
}
