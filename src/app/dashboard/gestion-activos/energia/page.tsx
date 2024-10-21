"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Plus,
  Search,
  MoreHorizontal,
  FileEdit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { usePathname } from "next/navigation";

type EnergySourceType =
  | "Electricidad"
  | "Gas Natural"
  | "Diésel"
  | "Solar"
  | "Eólica"
  | "Biomasa"
  | "Otro";

type EnergySource = {
  id: string;
  name: string;
  type: EnergySourceType;
  location: string;
  capacity: number;
  unit: string;
  annualProduction: number;
  carbonFootprint: number;
  lastMaintenance: string;
  status: "Activo" | "Inactivo" | "En mantenimiento";
};

export default function EnergyManagement() {
  const [energySources, setEnergySources] = useState<EnergySource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEnergySource, setCurrentEnergySource] = useState<
    Partial<EnergySource>
  >({});
  const [isEditing, setIsEditing] = useState(false);

  const rutaActual = usePathname(); // Obtiene la ruta actual

  useEffect(() => {
    // Simulating API call to fetch energy sources
    const fetchEnergySources = async () => {
      // This would be replaced with an actual API call
      const dummyEnergySources: EnergySource[] = [
        {
          id: "1",
          name: "Panel Solar A",
          type: "Solar",
          location: "Techo Edificio Principal",
          capacity: 100,
          unit: "kW",
          annualProduction: 175000,
          carbonFootprint: 0,
          lastMaintenance: "2023-05-15",
          status: "Activo",
        },
        {
          id: "2",
          name: "Generador Diésel",
          type: "Diésel",
          location: "Planta Baja",
          capacity: 500,
          unit: "kW",
          annualProduction: 50000,
          carbonFootprint: 35.5,
          lastMaintenance: "2023-08-01",
          status: "Inactivo",
        },
        {
          id: "3",
          name: "Turbina Eólica",
          type: "Eólica",
          location: "Campo Norte",
          capacity: 2,
          unit: "MW",
          annualProduction: 5000000,
          carbonFootprint: 0,
          lastMaintenance: "2023-09-30",
          status: "Activo",
        },
      ];
      setEnergySources(dummyEnergySources);
    };

    fetchEnergySources();
  }, []);

  const filteredEnergySources = energySources.filter(
    (source) =>
      source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEnergySource({
      ...currentEnergySource,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    setCurrentEnergySource({ ...currentEnergySource, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setEnergySources(
        energySources.map((source) =>
          source.id === currentEnergySource.id
            ? ({ ...source, ...currentEnergySource } as EnergySource)
            : source
        )
      );
    } else {
      const newId = (
        parseInt(energySources[energySources.length - 1]?.id || "0") + 1
      ).toString();
      const newEnergySource: EnergySource = {
        id: newId,
        name: currentEnergySource.name || "",
        type: (currentEnergySource.type as EnergySourceType) || "Otro",
        location: currentEnergySource.location || "",
        capacity: parseFloat(currentEnergySource.capacity?.toString() || "0"),
        unit: currentEnergySource.unit || "kW",
        annualProduction: parseFloat(
          currentEnergySource.annualProduction?.toString() || "0"
        ),
        carbonFootprint: parseFloat(
          currentEnergySource.carbonFootprint?.toString() || "0"
        ),
        lastMaintenance:
          currentEnergySource.lastMaintenance ||
          new Date().toISOString().split("T")[0],
        status:
          (currentEnergySource.status as
            | "Activo"
            | "Inactivo"
            | "En mantenimiento") || "Activo",
      };
      setEnergySources([...energySources, newEnergySource]);
    }
    setIsDialogOpen(false);
    setCurrentEnergySource({});
    setIsEditing(false);
  };

  const handleEdit = (source: EnergySource) => {
    setCurrentEnergySource(source);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEnergySources(energySources.filter((source) => source.id !== id));
  };

  const getTotalRenewableProduction = () => {
    return energySources
      .filter((source) => ["Solar", "Eólica", "Biomasa"].includes(source.type))
      .reduce((sum, source) => sum + source.annualProduction, 0);
  };

  const getTotalNonRenewableProduction = () => {
    return energySources
      .filter((source) => !["Solar", "Eólica", "Biomasa"].includes(source.type))
      .reduce((sum, source) => sum + source.annualProduction, 0);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Zap className="h-8 w-8" />
          Gestión de Fuentes de Energía
        </h2>
        <Link href={`${rutaActual}/registrar`}>
          <Button
            className="bg-green-700 hover:bg-green-800"
            // onClick={() => {
            //   setCurrentEnergySource({});
            //   setIsEditing(false);
            //   setIsDialogOpen(true);
            // }}
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Fuente de Energía
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Fuentes de Energía</CardTitle>
          <CardDescription>
            Vista general del impacto de carbono y producción de energía en la
            organización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Total de Fuentes</span>
              <span className="text-2xl font-bold">
                {filteredEnergySources.length}
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Producción Anual Total
              </span>
              <span className="text-2xl font-bold">
                {filteredEnergySources
                  .reduce((sum, source) => sum + source.annualProduction, 0)
                  .toLocaleString()}{" "}
                kWh
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Producción Renovable
              </span>
              <span className="text-2xl font-bold">
                {getTotalRenewableProduction().toLocaleString()} kWh
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Huella de Carbono Total
              </span>
              <span className="text-2xl font-bold">
                {filteredEnergySources
                  .reduce((sum, source) => sum + source.carbonFootprint, 0)
                  .toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar fuentes de energía..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Producción Anual (kWh)</TableHead>
            <TableHead>Huella de Carbono (tCO2e)</TableHead>
            <TableHead>Último Mantenimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEnergySources.map((source) => (
            <TableRow key={source.id}>
              <TableCell className="font-medium">{source.name}</TableCell>
              <TableCell>{source.type}</TableCell>
              <TableCell>{source.location}</TableCell>
              <TableCell>{`${source.capacity} ${source.unit}`}</TableCell>
              <TableCell>{source.annualProduction.toLocaleString()}</TableCell>
              <TableCell>{source.carbonFootprint.toFixed(2)}</TableCell>
              <TableCell>{source.lastMaintenance}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    source.status === "Activo"
                      ? "bg-green-100 text-green-800"
                      : source.status === "Inactivo"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {source.status}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(source)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(source.id)}
                      className="text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar" : "Agregar Nueva"} Fuente de Energía
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique" : "Complete"} los detalles de la fuente
              de energía aquí. Haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-right"
                >
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={currentEnergySource.name || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="type"
                  className="text-right"
                >
                  Tipo
                </Label>
                <Select
                  name="type"
                  value={currentEnergySource.type}
                  onValueChange={(value) => handleSelectChange(value, "type")}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electricidad">Electricidad</SelectItem>
                    <SelectItem value="Gas Natural">Gas Natural</SelectItem>
                    <SelectItem value="Diésel">Diésel</SelectItem>
                    <SelectItem value="Solar">Solar</SelectItem>
                    <SelectItem value="Eólica">Eólica</SelectItem>
                    <SelectItem value="Biomasa">Biomasa</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid  grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="location"
                  className="text-right"
                >
                  Ubicación
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={currentEnergySource.location || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="capacity"
                  className="text-right"
                >
                  Capacidad
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={currentEnergySource.capacity || ""}
                  onChange={handleInputChange}
                  className="col-span-2"
                />
                <Select
                  name="unit"
                  value={currentEnergySource.unit}
                  onValueChange={(value) => handleSelectChange(value, "unit")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="W">W</SelectItem>
                    <SelectItem value="kW">kW</SelectItem>
                    <SelectItem value="MW">MW</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="annualProduction"
                  className="text-right"
                >
                  Producción Anual (kWh)
                </Label>
                <Input
                  id="annualProduction"
                  name="annualProduction"
                  type="number"
                  value={currentEnergySource.annualProduction || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="carbonFootprint"
                  className="text-right"
                >
                  Huella de Carbono (tCO2e)
                </Label>
                <Input
                  id="carbonFootprint"
                  name="carbonFootprint"
                  type="number"
                  value={currentEnergySource.carbonFootprint || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="lastMaintenance"
                  className="text-right"
                >
                  Último Mantenimiento
                </Label>
                <Input
                  id="lastMaintenance"
                  name="lastMaintenance"
                  type="date"
                  value={currentEnergySource.lastMaintenance || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="status"
                  className="text-right"
                >
                  Estado
                </Label>
                <Select
                  name="status"
                  value={currentEnergySource.status}
                  onValueChange={(value) => handleSelectChange(value, "status")}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                    <SelectItem value="En mantenimiento">
                      En mantenimiento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800"
              >
                {isEditing ? "Actualizar" : "Guardar"} Fuente de Energía
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
