"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Trash2, Recycle, Calendar, BarChart, Info } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  type: z.string({
    required_error: "Por favor seleccione un tipo de residuo.",
  }),
  quantity: z
    .number()
    .min(0, { message: "La cantidad debe ser un número positivo." }),
  unit: z.string({
    required_error: "Por favor seleccione una unidad de medida.",
  }),
  disposalMethod: z.string({
    required_error: "Por favor seleccione un método de disposición.",
  }),
  recyclingRate: z
    .number()
    .min(0)
    .max(100, { message: "La tasa de reciclaje debe estar entre 0 y 100%." }),
  carbonFootprint: z
    .number()
    .min(0, { message: "La huella de carbono debe ser un número positivo." }),
  lastCollection: z.date({
    required_error: "La fecha de última recolección es requerida.",
  }),
  nextCollection: z.date({
    required_error: "La fecha de próxima recolección es requerida.",
  }),
  collectionFrequency: z.string({
    required_error: "Por favor seleccione una frecuencia de recolección.",
  }),
  processingCost: z.number().min(0, {
    message: "El costo de procesamiento debe ser un número positivo.",
  }),
  hazardousLevel: z
    .number()
    .min(0)
    .max(5, { message: "El nivel de peligrosidad debe estar entre 0 y 5." }),
  storageLocation: z.string().min(2, {
    message: "La ubicación de almacenamiento debe tener al menos 2 caracteres.",
  }),
  responsibleDepartment: z.string().min(2, {
    message: "El departamento responsable debe tener al menos 2 caracteres.",
  }),
  notes: z.string().optional(),
});

export default function RegisterWasteStreamPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      quantity: 0,
      unit: "",
      disposalMethod: "",
      recyclingRate: 0,
      carbonFootprint: 0,
      lastCollection: new Date(),
      nextCollection: new Date(),
      collectionFrequency: "",
      processingCost: 0,
      hazardousLevel: 0,
      storageLocation: "",
      responsibleDepartment: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
    alert("Flujo de residuos registrado con éxito!");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Registrar Flujo de Residuos
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Trash2 className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Información Básica</h2>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Flujo de Residuos</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Residuos de Oficina"
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
                    <FormLabel>Tipo de Residuo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de residuo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="organico">Orgánico</SelectItem>
                        <SelectItem value="plastico">Plástico</SelectItem>
                        <SelectItem value="papel">Papel</SelectItem>
                        <SelectItem value="vidrio">Vidrio</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="electronico">Electrónico</SelectItem>
                        <SelectItem value="peligroso">Peligroso</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
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
                name="unit"
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
                        <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                        <SelectItem value="ton">Toneladas (ton)</SelectItem>
                        <SelectItem value="litros">Litros (L)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Recycle className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Gestión y Disposición</h2>
              </div>
              <FormField
                control={form.control}
                name="disposalMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de Disposición</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un método" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="reciclaje">Reciclaje</SelectItem>
                        <SelectItem value="compostaje">Compostaje</SelectItem>
                        <SelectItem value="incineracion">
                          Incineración
                        </SelectItem>
                        <SelectItem value="vertedero">Vertedero</SelectItem>
                        <SelectItem value="tratamiento_especial">
                          Tratamiento Especial
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recyclingRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tasa de Reciclaje (%)</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>Tasa: {field.value}%</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbonFootprint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Huella de Carbono (tCO2e)</FormLabel>
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
              <Calendar className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Programación de Recolección
              </h2>
            </div>
            <FormField
              control={form.control}
              name="lastCollection"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Última Recolección</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
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
              name="nextCollection"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Próxima Recolección</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
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
            <FormField
              control={form.control}
              name="collectionFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frecuencia de Recolección</FormLabel>
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
                      <SelectItem value="diaria">Diaria</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="quincenal">Quincenal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <BarChart className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Costos y Peligrosidad</h2>
            </div>
            <FormField
              control={form.control}
              name="processingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo de Procesamiento (por unidad)</FormLabel>
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
              name="hazardousLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel de Peligrosidad (0-5)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>Nivel: {field.value}</FormDescription>
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
              name="storageLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación de Almacenamiento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsibleDepartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento Responsable</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas Adicionales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese cualquier información adicional relevante..."
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
            Registrar Flujo de Residuos
          </Button>
        </form>
      </Form>
    </div>
  );
}
