"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Truck,
  Package,
  BarChart2,
  Calendar,
  MapPin,
  Leaf,
  Info,
  CheckCircle,
} from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  type: z.enum(["supplier", "logistics", "warehouse", "retailer"], {
    required_error:
      "Por favor seleccione un tipo de elemento en la cadena de suministro.",
  }),
  location: z
    .string()
    .min(2, { message: "La ubicación debe tener al menos 2 caracteres." }),
  carbonFootprint: z
    .number()
    .min(0, { message: "La huella de carbono debe ser un número positivo." }),
  sustainabilityScore: z.number().min(0).max(100, {
    message: "La puntuación de sostenibilidad debe estar entre 0 y 100.",
  }),
  annualEmissions: z
    .number()
    .min(0, { message: "Las emisiones anuales deben ser un número positivo." }),
  energyConsumption: z
    .number()
    .min(0, { message: "El consumo de energía debe ser un número positivo." }),
  renewableEnergyPercentage: z.number().min(0).max(100, {
    message: "El porcentaje de energía renovable debe estar entre 0 y 100.",
  }),
  wasteGenerated: z.number().min(0, {
    message: "La cantidad de residuos generados debe ser un número positivo.",
  }),
  recyclingRate: z
    .number()
    .min(0)
    .max(100, { message: "La tasa de reciclaje debe estar entre 0 y 100." }),
  waterConsumption: z
    .number()
    .min(0, { message: "El consumo de agua debe ser un número positivo." }),
  transportationMode: z.enum(["road", "rail", "sea", "air", "multimodal"], {
    required_error: "Por favor seleccione un modo de transporte.",
  }),
  averageShippingDistance: z.number().min(0, {
    message: "La distancia promedio de envío debe ser un número positivo.",
  }),
  certifications: z.array(z.string()).optional(),
  sustainabilityInitiatives: z.array(z.string()).optional(),
  lastAuditDate: z.date({
    required_error: "La fecha del último auditoría es requerida.",
  }),
  nextAuditDate: z.date({
    required_error: "La fecha de la próxima auditoría es requerida.",
  }),
  hasEmergencyPlan: z.boolean(),
  riskLevel: z.enum(["low", "medium", "high"], {
    required_error: "Por favor seleccione un nivel de riesgo.",
  }),
  notes: z.string().optional(),
  isCertified: z.boolean(),
  certificationDetails: z.string().optional(),
  usesEmissionControlService: z.boolean(),
  emissionControlServiceDetails: z.string().optional(),
});

export default function SupplyChainItemRegistration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "supplier",
      location: "",
      carbonFootprint: 0,
      sustainabilityScore: 0,
      annualEmissions: 0,
      energyConsumption: 0,
      renewableEnergyPercentage: 0,
      wasteGenerated: 0,
      recyclingRate: 0,
      waterConsumption: 0,
      transportationMode: "road",
      averageShippingDistance: 0,
      certifications: [],
      sustainabilityInitiatives: [],
      lastAuditDate: new Date(),
      nextAuditDate: new Date(),
      hasEmergencyPlan: false,
      riskLevel: "low",
      notes: "",
      isCertified: false,
      certificationDetails: "",
      usesEmissionControlService: false,
      emissionControlServiceDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aquí normalmente enviarías los datos al backend
    alert("Elemento de la cadena de suministro registrado con éxito!");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Registrar Elemento de la Cadena de Suministro
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-700">
                <Package className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Información Básica</h2>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Elemento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Proveedor Eco-Friendly"
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
                    <FormLabel>Tipo de Elemento</FormLabel>
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
                        <SelectItem value="supplier">Proveedor</SelectItem>
                        <SelectItem value="logistics">Logística</SelectItem>
                        <SelectItem value="warehouse">Almacén</SelectItem>
                        <SelectItem value="retailer">Minorista</SelectItem>
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
                        placeholder="Ej: Barcelona, España"
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
                <Leaf className="h-5 w-5" />
                <h2 className="text-xl font-semibold">
                  Métricas de Sostenibilidad
                </h2>
              </div>
              <FormField
                control={form.control}
                name="carbonFootprint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Huella de Carbono (tCO2e/año)</FormLabel>
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
                name="sustainabilityScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puntuación de Sostenibilidad (0-100)</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>Puntuación: {field.value}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualEmissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emisiones Anuales (tCO2e)</FormLabel>
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
              <BarChart2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Consumo y Eficiencia</h2>
            </div>
            <FormField
              control={form.control}
              name="energyConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo de Energía (kWh/año)</FormLabel>
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
              name="renewableEnergyPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porcentaje de Energía Renovable (%)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
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
              name="wasteGenerated"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Residuos Generados (toneladas/año)</FormLabel>
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
              name="waterConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo de Agua (m³/año)</FormLabel>
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
              <Truck className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Logística y Transporte</h2>
            </div>
            <FormField
              control={form.control}
              name="transportationMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modo de Transporte Principal</FormLabel>
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
                      <SelectItem value="road">Carretera</SelectItem>
                      <SelectItem value="rail">Ferrocarril</SelectItem>
                      <SelectItem value="sea">Marítimo</SelectItem>
                      <SelectItem value="air">Aéreo</SelectItem>
                      <SelectItem value="multimodal">Multimodal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="averageShippingDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distancia Promedio de Envío (km)</FormLabel>
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
              <CheckCircle className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Certificaciones y Servicios
              </h2>
            </div>
            <FormField
              control={form.control}
              name="isCertified"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Certificación Ambiental
                    </FormLabel>
                    <FormDescription>
                      ¿El elemento de la cadena de suministro cuenta con alguna
                      certificación ambiental?
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
              name="certificationDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detalles de la Certificación</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Proporcione detalles sobre las certificaciones ambientales..."
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
              name="usesEmissionControlService"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Servicio de Control de Emisiones
                    </FormLabel>
                    <FormDescription>
                      ¿El elemento utiliza algún servicio de control de
                      emisiones de CO2?
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
              name="emissionControlServiceDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Detalles del Servicio de Control de Emisiones
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Proporcione detalles sobre el servicio de control de emisiones utilizado..."
                      className="resize-none"
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
              <MapPin className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Certificaciones e Iniciativas
              </h2>
            </div>
            <FormField
              control={form.control}
              name="certifications"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Certificaciones</FormLabel>
                    <FormDescription>
                      Seleccione todas las certificaciones aplicables.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "ISO 14001",
                      "ISO 50001",
                      "FSC",
                      "LEED",
                      "Carbon Trust Standard",
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
                                      ? field.onChange([
                                          ...(field.value || []),
                                          item,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
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
              name="sustainabilityInitiatives"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Iniciativas de Sostenibilidad
                    </FormLabel>
                    <FormDescription>
                      Seleccione todas las iniciativas implementadas.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Reducción de Emisiones",
                      "Eficiencia Energética",
                      "Gestión de Residuos",
                      "Conservación del Agua",
                      "Cadena de Suministro Verde",
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
                                      ? field.onChange([
                                          ...(field.value || []),
                                          item,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
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
              <Calendar className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                Auditorías y Gestión de Riesgos
              </h2>
            </div>
            <FormField
              control={form.control}
              name="lastAuditDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de la Última Auditoría</FormLabel>
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
              name="nextAuditDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de la Próxima Auditoría</FormLabel>
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
              name="hasEmergencyPlan"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Plan de Emergencia
                    </FormLabel>
                    <FormDescription>
                      ¿Tiene un plan de emergencia para incidentes ambientales?
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
              name="riskLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Nivel de Riesgo Ambiental</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="font-normal">Bajo</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">Medio</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">Alto</FormLabel>
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
              <Info className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Información Adicional</h2>
            </div>
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
            Registrar Elemento de la Cadena de Suministro
          </Button>
        </form>
      </Form>
    </div>
  );
}
