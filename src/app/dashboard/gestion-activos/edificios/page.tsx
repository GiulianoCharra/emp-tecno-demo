"use client";

import { useState, useEffect } from "react";
import {
  Building,
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
import Link from "next/link";

type BuildingType =
  | "Oficina"
  | "Almacén"
  | "Fábrica"
  | "Centro de datos"
  | "Otro";

type Building = {
  id: string;
  name: string;
  type: BuildingType;
  address: string;
  area: number;
  floors: number;
  yearBuilt: number;
  energyRating: string;
  carbonFootprint: number;
};

export default function BuildingManagement() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState<Partial<Building>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch buildings
    const fetchBuildings = async () => {
      // This would be replaced with an actual API call
      const dummyBuildings: Building[] = [
        {
          id: "1",
          name: "Edificio Central",
          type: "Oficina",
          address: "Calle Principal 123",
          area: 5000,
          floors: 10,
          yearBuilt: 2005,
          energyRating: "B",
          carbonFootprint: 120.5,
        },
        {
          id: "2",
          name: "Almacén Norte",
          type: "Almacén",
          address: "Av. Industrial 456",
          area: 10000,
          floors: 1,
          yearBuilt: 2010,
          energyRating: "C",
          carbonFootprint: 85.2,
        },
        {
          id: "3",
          name: "Fábrica Sur",
          type: "Fábrica",
          address: "Carretera Sur Km 5",
          area: 15000,
          floors: 2,
          yearBuilt: 2000,
          energyRating: "D",
          carbonFootprint: 250.8,
        },
      ];
      setBuildings(dummyBuildings);
    };

    fetchBuildings();
  }, []);

  const filteredBuildings = buildings.filter(
    (building) =>
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBuilding({ ...currentBuilding, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setCurrentBuilding({ ...currentBuilding, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setBuildings(
        buildings.map((building) =>
          building.id === currentBuilding.id
            ? ({ ...building, ...currentBuilding } as Building)
            : building
        )
      );
    } else {
      const newId = (
        parseInt(buildings[buildings.length - 1]?.id || "0") + 1
      ).toString();
      const newBuilding: Building = {
        id: newId,
        name: currentBuilding.name || "",
        type: (currentBuilding.type as BuildingType) || "Otro",
        address: currentBuilding.address || "",
        area: parseFloat(currentBuilding.area?.toString() || "0"),
        floors: parseInt(currentBuilding.floors?.toString() || "1"),
        yearBuilt: parseInt(
          currentBuilding.yearBuilt?.toString() ||
            new Date().getFullYear().toString()
        ),
        energyRating: currentBuilding.energyRating || "N/A",
        carbonFootprint: parseFloat(
          currentBuilding.carbonFootprint?.toString() || "0"
        ),
      };
      setBuildings([...buildings, newBuilding]);
    }
    setIsDialogOpen(false);
    setCurrentBuilding({});
    setIsEditing(false);
  };

  const handleEdit = (building: Building) => {
    setCurrentBuilding(building);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBuildings(buildings.filter((building) => building.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Building className="h-8 w-8" />
          Gestión de Edificios
        </h2>
        <Link href={`${window.location.pathname}/registrar`}>
          <Button
            className="bg-green-700 hover:bg-green-800"
            // onClick={() => {
            //   setCurrentBuilding({});
            //   setIsEditing(false);
            //   setIsDialogOpen(true);
            // }}
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Edificio
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Edificios</CardTitle>
          <CardDescription>
            Vista general del impacto de carbono de los edificios en la
            organización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Total de Edificios</span>
              <span className="text-2xl font-bold">
                {filteredBuildings.length}
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Huella de Carbono Total
              </span>
              <span className="text-2xl font-bold">
                {filteredBuildings
                  .reduce((sum, building) => sum + building.carbonFootprint, 0)
                  .toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Promedio por Edificio
              </span>
              <span className="text-2xl font-bold">
                {(
                  filteredBuildings.reduce(
                    (sum, building) => sum + building.carbonFootprint,
                    0
                  ) / filteredBuildings.length || 0
                ).toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Área Total</span>
              <span className="text-2xl font-bold">
                {filteredBuildings
                  .reduce((sum, building) => sum + building.area, 0)
                  .toFixed(0)}{" "}
                m²
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar edificios..."
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
            <TableHead>Dirección</TableHead>
            <TableHead>Área (m²)</TableHead>
            <TableHead>Pisos</TableHead>
            <TableHead>Año de Construcción</TableHead>
            <TableHead>Calificación Energética</TableHead>
            <TableHead className="text-right">
              Huella de Carbono (tCO2e)
            </TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBuildings.map((building) => (
            <TableRow key={building.id}>
              <TableCell className="font-medium">{building.name}</TableCell>
              <TableCell>{building.type}</TableCell>
              <TableCell>{building.address}</TableCell>
              <TableCell>{building.area}</TableCell>
              <TableCell>{building.floors}</TableCell>
              <TableCell>{building.yearBuilt}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    building.energyRating === "A"
                      ? "bg-green-100 text-green-800"
                      : building.energyRating === "B"
                      ? "bg-lime-100 text-lime-800"
                      : building.energyRating === "C"
                      ? "bg-yellow-100 text-yellow-800"
                      : building.energyRating === "D"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {building.energyRating}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {building.carbonFootprint.toFixed(2)}
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
                    <DropdownMenuItem onClick={() => handleEdit(building)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(building.id)}
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
              {isEditing ? "Editar" : "Agregar Nuevo"} Edificio
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique" : "Complete"} los detalles del edificio
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
                  value={currentBuilding.name || ""}
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
                  value={currentBuilding.type}
                  onValueChange={(value) => handleSelectChange(value, "type")}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oficina">Oficina</SelectItem>
                    <SelectItem value="Almacén">Almacén</SelectItem>
                    <SelectItem value="Fábrica">Fábrica</SelectItem>
                    <SelectItem value="Centro de datos">
                      Centro de datos
                    </SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="address"
                  className="text-right"
                >
                  Dirección
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={currentBuilding.address || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="area"
                  className="text-right"
                >
                  Área (m²)
                </Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={currentBuilding.area || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="floors"
                  className="text-right"
                >
                  Pisos
                </Label>
                <Input
                  id="floors"
                  name="floors"
                  type="number"
                  value={currentBuilding.floors || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="yearBuilt"
                  className="text-right"
                >
                  Año de Construcción
                </Label>
                <Input
                  id="yearBuilt"
                  name="yearBuilt"
                  type="number"
                  value={currentBuilding.yearBuilt || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="energyRating"
                  className="text-right"
                >
                  Calificación Energética
                </Label>
                <Select
                  name="energyRating"
                  value={currentBuilding.energyRating}
                  onValueChange={(value) =>
                    handleSelectChange(value, "energyRating")
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione una calificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                    <SelectItem value="G">G</SelectItem>
                  </SelectContent>
                </Select>
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
                  value={currentBuilding.carbonFootprint || ""}
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
                {isEditing ? "Actualizar" : "Guardar"} Edificio
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
