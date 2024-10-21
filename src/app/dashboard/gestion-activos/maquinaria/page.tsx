"use client";

import { useState, useEffect } from "react";
import {
  Factory,
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

type Machine = {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  status: "Activo" | "Inactivo" | "En mantenimiento";
  lastMaintenance: string;
  carbonFootprint: number;
};

export default function MachineryManagement() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMachine, setCurrentMachine] = useState<Partial<Machine>>({});
  const [isEditing, setIsEditing] = useState(false);

  const rutaActual = usePathname(); // Obtiene la ruta actual

  useEffect(() => {
    // Simulating API call to fetch machines
    const fetchMachines = async () => {
      // This would be replaced with an actual API call
      const dummyMachines: Machine[] = [
        {
          id: "1",
          name: "Torno CNC",
          type: "Máquina de corte",
          model: "CNC-2000",
          serialNumber: "TC2000-001",
          status: "Activo",
          lastMaintenance: "2023-09-15",
          carbonFootprint: 5.2,
        },
        {
          id: "2",
          name: "Prensa Hidráulica",
          type: "Máquina de conformado",
          model: "PH-500",
          serialNumber: "PH500-002",
          status: "En mantenimiento",
          lastMaintenance: "2023-10-01",
          carbonFootprint: 3.8,
        },
        {
          id: "3",
          name: "Robot Soldador",
          type: "Robot industrial",
          model: "RS-100",
          serialNumber: "RS100-003",
          status: "Activo",
          lastMaintenance: "2023-10-10",
          carbonFootprint: 4.5,
        },
      ];
      setMachines(dummyMachines);
    };

    fetchMachines();
  }, []);

  const filteredMachines = machines.filter(
    (machine) =>
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMachine({ ...currentMachine, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setCurrentMachine({ ...currentMachine, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setMachines(
        machines.map((machine) =>
          machine.id === currentMachine.id
            ? ({ ...machine, ...currentMachine } as Machine)
            : machine
        )
      );
    } else {
      const newId = (
        parseInt(machines[machines.length - 1]?.id || "0") + 1
      ).toString();
      const newMachine: Machine = {
        id: newId,
        name: currentMachine.name || "",
        type: currentMachine.type || "",
        model: currentMachine.model || "",
        serialNumber: currentMachine.serialNumber || "",
        status:
          (currentMachine.status as
            | "Activo"
            | "Inactivo"
            | "En mantenimiento") || "Activo",
        lastMaintenance:
          currentMachine.lastMaintenance ||
          new Date().toISOString().split("T")[0],
        carbonFootprint: parseFloat(
          currentMachine.carbonFootprint?.toString() || "0"
        ),
      };
      setMachines([...machines, newMachine]);
    }
    setIsDialogOpen(false);
    setCurrentMachine({});
    setIsEditing(false);
  };

  const handleEdit = (machine: Machine) => {
    setCurrentMachine(machine);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMachines(machines.filter((machine) => machine.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Factory className="h-8 w-8" />
          Gestión de Maquinaria
        </h2>
        <Link href={`${rutaActual}/registrar`}>
          <Button
            className="bg-green-700 hover:bg-green-800"
            // onClick={() => {
            //   setCurrentMachine({});
            //   setIsEditing(false);
            //   setIsDialogOpen(true);
            // }}
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Máquina
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Maquinaria</CardTitle>
          <CardDescription>
            Vista general del impacto de carbono de la maquinaria en la
            organización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Total de Máquinas</span>
              <span className="text-2xl font-bold">
                {filteredMachines.length}
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Huella de Carbono Total
              </span>
              <span className="text-2xl font-bold">
                {filteredMachines
                  .reduce((sum, machine) => sum + machine.carbonFootprint, 0)
                  .toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Promedio por Máquina
              </span>
              <span className="text-2xl font-bold">
                {(
                  filteredMachines.reduce(
                    (sum, machine) => sum + machine.carbonFootprint,
                    0
                  ) / filteredMachines.length || 0
                ).toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Máquinas Activas</span>
              <span className="text-2xl font-bold">
                {
                  filteredMachines.filter(
                    (machine) => machine.status === "Activo"
                  ).length
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar máquinas..."
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
            <TableHead>Modelo</TableHead>
            <TableHead>Número de Serie</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Último Mantenimiento</TableHead>
            <TableHead className="text-right">
              Huella de Carbono (tCO2e)
            </TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMachines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell className="font-medium">{machine.name}</TableCell>
              <TableCell>{machine.type}</TableCell>
              <TableCell>{machine.model}</TableCell>
              <TableCell>{machine.serialNumber}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    machine.status === "Activo"
                      ? "bg-green-100 text-green-800"
                      : machine.status === "Inactivo"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {machine.status}
                </span>
              </TableCell>
              <TableCell>{machine.lastMaintenance}</TableCell>
              <TableCell className="text-right">
                {machine.carbonFootprint.toFixed(2)}
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
                    <DropdownMenuItem onClick={() => handleEdit(machine)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(machine.id)}
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
              {isEditing ? "Editar" : "Agregar Nueva"} Máquina
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique" : "Complete"} los detalles de la máquina
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
                  value={currentMachine.name || ""}
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
                <Input
                  id="type"
                  name="type"
                  value={currentMachine.type || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="model"
                  className="text-right"
                >
                  Modelo
                </Label>
                <Input
                  id="model"
                  name="model"
                  value={currentMachine.model || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="serialNumber"
                  className="text-right"
                >
                  Número de Serie
                </Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  value={currentMachine.serialNumber || ""}
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
                  value={currentMachine.status}
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
                  value={currentMachine.lastMaintenance || ""}
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
                  value={currentMachine.carbonFootprint || ""}
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
                {isEditing ? "Actualizar" : "Guardar"} Máquina
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
