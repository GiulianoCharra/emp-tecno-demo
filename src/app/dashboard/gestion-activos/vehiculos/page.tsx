"use client";

import { useState, useEffect } from "react";
import {
  Truck,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VehicleType = "Coche" | "Camión" | "Furgoneta" | "Motocicleta" | "Otro";
type FuelType = "Gasolina" | "Diésel" | "Eléctrico" | "Híbrido" | "GNC" | "GLP";

type Vehicle = {
  id: string;
  name: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  fuelType: FuelType;
  consumption: number;
  mileage: number;
  carbonFootprint: number;
};

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Partial<Vehicle>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch vehicles
    const fetchVehicles = async () => {
      // This would be replaced with an actual API call
      const dummyVehicles: Vehicle[] = [
        {
          id: "1",
          name: "Coche Ejecutivo",
          type: "Coche",
          brand: "Tesla",
          model: "Model 3",
          year: 2022,
          licensePlate: "ABC123",
          fuelType: "Eléctrico",
          consumption: 0,
          mileage: 15000,
          carbonFootprint: 0.5,
        },
        {
          id: "2",
          name: "Camión de Reparto",
          type: "Camión",
          brand: "Volvo",
          model: "FH16",
          year: 2020,
          licensePlate: "XYZ789",
          fuelType: "Diésel",
          consumption: 30,
          mileage: 50000,
          carbonFootprint: 45.2,
        },
        {
          id: "3",
          name: "Furgoneta de Servicio",
          type: "Furgoneta",
          brand: "Ford",
          model: "Transit",
          year: 2021,
          licensePlate: "DEF456",
          fuelType: "GNC",
          consumption: 8,
          mileage: 30000,
          carbonFootprint: 15.8,
        },
      ];
      setVehicles(dummyVehicles);
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVehicle({ ...currentVehicle, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setCurrentVehicle({ ...currentVehicle, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === currentVehicle.id
            ? ({ ...vehicle, ...currentVehicle } as Vehicle)
            : vehicle
        )
      );
    } else {
      const newId = (
        parseInt(vehicles[vehicles.length - 1]?.id || "0") + 1
      ).toString();
      const newVehicle: Vehicle = {
        id: newId,
        name: currentVehicle.name || "",
        type: (currentVehicle.type as VehicleType) || "Otro",
        brand: currentVehicle.brand || "",
        model: currentVehicle.model || "",
        year: parseInt(
          currentVehicle.year?.toString() || new Date().getFullYear().toString()
        ),
        licensePlate: currentVehicle.licensePlate || "",
        fuelType: (currentVehicle.fuelType as FuelType) || "Gasolina",
        consumption: parseFloat(currentVehicle.consumption?.toString() || "0"),
        mileage: parseInt(currentVehicle.mileage?.toString() || "0"),
        carbonFootprint: parseFloat(
          currentVehicle.carbonFootprint?.toString() || "0"
        ),
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setIsDialogOpen(false);
    setCurrentVehicle({});
    setIsEditing(false);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setCurrentVehicle(vehicle);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Truck className="h-8 w-8" />
          Gestión de Vehículos
        </h2>
        <Button
          className="bg-green-700 hover:bg-green-800"
          onClick={() => {
            setCurrentVehicle({});
            setIsEditing(false);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Vehículo
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Vehículos</CardTitle>
          <CardDescription>
            Vista general del impacto de carbono de los vehículos en la
            organización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Total de Vehículos</span>
              <span className="text-2xl font-bold">
                {filteredVehicles.length}
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Huella de Carbono Total
              </span>
              <span className="text-2xl font-bold">
                {filteredVehicles
                  .reduce((sum, vehicle) => sum + vehicle.carbonFootprint, 0)
                  .toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Promedio por Vehículo
              </span>
              <span className="text-2xl font-bold">
                {(
                  filteredVehicles.reduce(
                    (sum, vehicle) => sum + vehicle.carbonFootprint,
                    0
                  ) / filteredVehicles.length || 0
                ).toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Kilometraje Total</span>
              <span className="text-2xl font-bold">
                {filteredVehicles
                  .reduce((sum, vehicle) => sum + vehicle.mileage, 0)
                  .toLocaleString()}{" "}
                km
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar vehículos..."
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
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Año</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Tipo de Combustible</TableHead>
            <TableHead>Consumo (L/100km)</TableHead>
            <TableHead>Kilometraje</TableHead>
            <TableHead className="text-right">
              Huella de Carbono (tCO2e)
            </TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.name}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.brand}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    vehicle.fuelType === "Eléctrico"
                      ? "bg-green-100 text-green-800"
                      : vehicle.fuelType === "Híbrido"
                      ? "bg-blue-100 text-blue-800"
                      : vehicle.fuelType === "GNC" || vehicle.fuelType === "GLP"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {vehicle.fuelType}
                </span>
              </TableCell>
              <TableCell>{vehicle.consumption}</TableCell>
              <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
              <TableCell className="text-right">
                {vehicle.carbonFootprint.toFixed(2)}
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
                    <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(vehicle.id)}
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
              {isEditing ? "Editar" : "Agregar Nuevo"} Vehículo
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique" : "Complete"} los detalles del vehículo
              aquí. Haga clic en guardar cuando termine.
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
                  value={currentVehicle.name || ""}
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
                  value={currentVehicle.type}
                  onValueChange={(value) => handleSelectChange(value, "type")}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Coche">Coche</SelectItem>
                    <SelectItem value="Camión">Camión</SelectItem>
                    <SelectItem value="Furgoneta">Furgoneta</SelectItem>
                    <SelectItem value="Motocicleta">Motocicleta</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="brand"
                  className="text-right"
                >
                  Marca
                </Label>
                <Input
                  id="brand"
                  name="brand"
                  value={currentVehicle.brand || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid  grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="model"
                  className="text-right"
                >
                  Modelo
                </Label>
                <Input
                  id="model"
                  name="model"
                  value={currentVehicle.model || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="year"
                  className="text-right"
                >
                  Año
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={currentVehicle.year || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="licensePlate"
                  className="text-right"
                >
                  Matrícula
                </Label>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  value={currentVehicle.licensePlate || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="fuelType"
                  className="text-right"
                >
                  Tipo de Combustible
                </Label>
                <Select
                  name="fuelType"
                  value={currentVehicle.fuelType}
                  onValueChange={(value) =>
                    handleSelectChange(value, "fuelType")
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo de combustible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                    <SelectItem value="Diésel">Diésel</SelectItem>
                    <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                    <SelectItem value="GNC">GNC</SelectItem>
                    <SelectItem value="GLP">GLP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="consumption"
                  className="text-right"
                >
                  Consumo (L/100km)
                </Label>
                <Input
                  id="consumption"
                  name="consumption"
                  type="number"
                  value={currentVehicle.consumption || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="mileage"
                  className="text-right"
                >
                  Kilometraje
                </Label>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  value={currentVehicle.mileage || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="carbonFootprint"
                  className="text-right"
                >
                  Huella de Carbono
                </Label>
                <Input
                  id="carbonFootprint"
                  name="carbonFootprint"
                  type="number"
                  value={currentVehicle.carbonFootprint || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800"
              >
                {isEditing ? "Actualizar" : "Guardar"} Vehículo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
