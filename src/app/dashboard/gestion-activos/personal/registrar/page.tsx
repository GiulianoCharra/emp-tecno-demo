"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  CalendarIcon,
  User,
  Briefcase,
  Car,
  Zap,
  Recycle,
  Smartphone,
  Plane,
  Home,
  Leaf,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  dateOfBirth: z.date({ required_error: "A date of birth is required." }),
  department: z.string({ required_error: "Please select a department." }),
  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters." }),
  workSchedule: z.string({ required_error: "Please select a work schedule." }),
  transportationMode: z.string({
    required_error: "Please select a primary mode of transportation.",
  }),
  commuteDistance: z
    .number()
    .min(0, { message: "Distance must be a positive number." }),
  carType: z.string().optional(),
  energyProvider: z
    .string()
    .min(2, { message: "Energy provider must be at least 2 characters." }),
  renewableEnergy: z.boolean(),
  wasteRecycling: z
    .array(z.string())
    .nonempty({ message: "Select at least one recycling habit." }),
  paperlessWorkflow: z.boolean(),
  deviceUsage: z.object({
    computer: z.number().min(0).max(24),
    smartphone: z.number().min(0).max(24),
    tablet: z.number().min(0).max(24),
  }),
  businessTravel: z.string({
    required_error: "Please select a business travel frequency.",
  }),
  remoteWorkDays: z.number().min(0).max(5),
  sustainabilityInitiatives: z.array(z.string()),
  additionalNotes: z.string().optional(),
});

export default function EmployeeRegistration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
      workSchedule: "",
      transportationMode: "",
      commuteDistance: 0,
      energyProvider: "",
      renewableEnergy: false,
      wasteRecycling: [],
      paperlessWorkflow: false,
      deviceUsage: {
        computer: 8,
        smartphone: 2,
        tablet: 1,
      },
      businessTravel: "",
      remoteWorkDays: 0,
      sustainabilityInitiatives: [],
      additionalNotes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Registro de Empleado para Análisis de Huella de Carbono
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <User className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Información Personal</h2>
              </div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Juan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pérez"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="juan.perez@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Nacimiento</FormLabel>
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
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
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
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Briefcase className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Información Laboral</h2>
              </div>
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="it">TI</SelectItem>
                        <SelectItem value="hr">Recursos Humanos</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Ventas</SelectItem>
                        <SelectItem value="finance">Finanzas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Desarrollador Senior"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horario de Trabajo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un horario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">
                          Tiempo Completo
                        </SelectItem>
                        <SelectItem value="part-time">Medio Tiempo</SelectItem>
                        <SelectItem value="flexible">
                          Horario Flexible
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Car className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Transporte</h2>
            </div>
            <FormField
              control={form.control}
              name="transportationMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modo Principal de Transporte</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un modo de transporte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="car">Automóvil</SelectItem>
                      <SelectItem value="public-transport">
                        Transporte Público
                      </SelectItem>
                      <SelectItem value="bicycle">Bicicleta</SelectItem>
                      <SelectItem value="walk">Caminando</SelectItem>
                      <SelectItem value="carpool">Carpool</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commuteDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distancia de Commute (km por día)</FormLabel>
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
              name="carType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Vehículo (si aplica)</FormLabel>
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
                      <SelectItem value="gasoline">Gasolina</SelectItem>
                      <SelectItem value="diesel">Diésel</SelectItem>
                      <SelectItem value="electric">Eléctrico</SelectItem>
                      <SelectItem value="hybrid">Híbrido</SelectItem>
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
              <h2 className="text-xl font-semibold">Uso de Energía</h2>
            </div>
            <FormField
              control={form.control}
              name="energyProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proveedor de Energía en Casa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre del proveedor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="renewableEnergy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Uso de Energía Renovable
                    </FormLabel>
                    <FormDescription>
                      ¿Utiliza energía renovable en su hogar?
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
              <h2 className="text-xl font-semibold">
                Hábitos de Residuos y Reciclaje
              </h2>
            </div>
            <FormField
              control={form.control}
              name="wasteRecycling"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Hábitos de Reciclaje
                    </FormLabel>
                    <FormDescription>
                      Seleccione todos los materiales que recicla regularmente.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "paper",
                      "plastic",
                      "glass",
                      "metal",
                      "electronics",
                      "organic",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="wasteRecycling"
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
                                {item.charAt(0).toUpperCase() + item.slice(1)}
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
              name="paperlessWorkflow"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Flujo de Trabajo sin Papel
                    </FormLabel>
                    <FormDescription>
                      ¿Utiliza principalmente métodos digitales para el trabajo?
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
              <Smartphone className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Uso de Tecnología</h2>
            </div>
            <FormField
              control={form.control}
              name="deviceUsage.computer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uso Diario de Computadora (horas)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={24}
                      step={0.5}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      // className="[&>span:first-of-type>span]:bg-green-600"
                    />
                  </FormControl>
                  <FormDescription>Horas: {field.value}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceUsage.smartphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uso Diario de Smartphone (horas)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={24}
                      step={0.5}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      // className="[&>span:first-of-type>span]:bg-green-600"
                    />
                  </FormControl>
                  <FormDescription>Horas: {field.value}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceUsage.tablet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uso Diario de Tablet (horas)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={24}
                      step={0.5}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      // className="[&>span:first-of-type>span]:bg-green-600"
                    />
                  </FormControl>
                  <FormDescription>Horas: {field.value}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Plane className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Viajes de Negocios</h2>
            </div>
            <FormField
              control={form.control}
              name="businessTravel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frecuencia de Viajes de Negocios</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="never" />
                        </FormControl>
                        <FormLabel className="font-normal">Nunca</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="rarely" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Raramente (1-2 veces al año)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="occasionally" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Ocasionalmente (3-6 veces al año)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="frequently" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Frecuentemente (mensualmente)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="very-frequently" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Muy frecuentemente (semanalmente)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Home className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Trabajo Remoto</h2>
            </div>
            <FormField
              control={form.control}
              name="remoteWorkDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Días de Trabajo Remoto por Semana</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      // className="[&>span:first-of-type>span]:bg-green-600"
                    />
                  </FormControl>
                  <FormDescription>Días: {field.value}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Leaf className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Iniciativas de Sostenibilidad
              </h2>
            </div>
            <FormField
              control={form.control}
              name="sustainabilityInitiatives"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Participación en Iniciativas de Sostenibilidad
                    </FormLabel>
                    <FormDescription>
                      Seleccione todas las iniciativas en las que participa o
                      está interesado.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "tree-planting",
                      "energy-saving",
                      "waste-reduction",
                      "sustainable-transport",
                      "eco-friendly-products",
                      "community-cleanup",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="sustainabilityInitiatives"
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
                    placeholder="Cualquier información adicional relevante para el análisis de huella de carbono..."
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
            Registrar Empleado
          </Button>
        </form>
      </Form>
    </div>
  );
}
