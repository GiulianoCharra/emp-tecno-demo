"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  FileEdit,
  Trash,
  Recycle,
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

type WasteType =
  | "Orgánico"
  | "Plástico"
  | "Papel"
  | "Vidrio"
  | "Metal"
  | "Electrónico"
  | "Peligroso"
  | "Otro";
type DisposalMethod =
  | "Reciclaje"
  | "Compostaje"
  | "Incineración"
  | "Vertedero"
  | "Tratamiento especial";

type WasteStream = {
  id: string;
  name: string;
  type: WasteType;
  quantity: number;
  unit: "kg" | "ton" | "litros";
  disposalMethod: DisposalMethod;
  recyclingRate: number;
  carbonFootprint: number;
  lastCollection: string;
  notes: string;
};

export default function WasteManagement() {
  const [wasteStreams, setWasteStreams] = useState<WasteStream[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentWasteStream, setCurrentWasteStream] = useState<
    Partial<WasteStream>
  >({});
  const [isEditing, setIsEditing] = useState(false);
  const rutaActual = usePathname();

  useEffect(() => {
    // Simulating API call to fetch waste streams
    const fetchWasteStreams = async () => {
      // This would be replaced with an actual API call
      const dummyWasteStreams: WasteStream[] = [
        {
          id: "1",
          name: "Residuos de Oficina",
          type: "Papel",
          quantity: 500,
          unit: "kg",
          disposalMethod: "Reciclaje",
          recyclingRate: 80,
          carbonFootprint: 0.5,
          lastCollection: "2023-10-15",
          notes: "Principalmente papel y cartón",
        },
        {
          id: "2",
          name: "Desechos de Cafetería",
          type: "Orgánico",
          quantity: 200,
          unit: "kg",
          disposalMethod: "Compostaje",
          recyclingRate: 100,
          carbonFootprint: 0.1,
          lastCollection: "2023-10-16",
          notes: "Restos de alimentos y servilletas",
        },
        {
          id: "3",
          name: "Equipos Electrónicos",
          type: "Electrónico",
          quantity: 50,
          unit: "kg",
          disposalMethod: "Reciclaje",
          recyclingRate: 90,
          carbonFootprint: 1.2,
          lastCollection: "2023-09-30",
          notes: "Computadoras y periféricos obsoletos",
        },
      ];
      setWasteStreams(dummyWasteStreams);
    };

    fetchWasteStreams();
  }, []);

  const filteredWasteStreams = wasteStreams.filter(
    (stream) =>
      stream.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stream.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stream.disposalMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWasteStream({
      ...currentWasteStream,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    setCurrentWasteStream({ ...currentWasteStream, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setWasteStreams(
        wasteStreams.map((stream) =>
          stream.id === currentWasteStream.id
            ? ({ ...stream, ...currentWasteStream } as WasteStream)
            : stream
        )
      );
    } else {
      const newId = (
        parseInt(wasteStreams[wasteStreams.length - 1]?.id || "0") + 1
      ).toString();
      const newWasteStream: WasteStream = {
        id: newId,
        name: currentWasteStream.name || "",
        type: (currentWasteStream.type as WasteType) || "Otro",
        quantity: parseFloat(currentWasteStream.quantity?.toString() || "0"),
        unit: (currentWasteStream.unit as "kg" | "ton" | "litros") || "kg",
        disposalMethod:
          (currentWasteStream.disposalMethod as DisposalMethod) || "Reciclaje",
        recyclingRate: parseFloat(
          currentWasteStream.recyclingRate?.toString() || "0"
        ),
        carbonFootprint: parseFloat(
          currentWasteStream.carbonFootprint?.toString() || "0"
        ),
        lastCollection:
          currentWasteStream.lastCollection ||
          new Date().toISOString().split("T")[0],
        notes: currentWasteStream.notes || "",
      };
      setWasteStreams([...wasteStreams, newWasteStream]);
    }
    setIsDialogOpen(false);
    setCurrentWasteStream({});
    setIsEditing(false);
  };

  const handleEdit = (stream: WasteStream) => {
    setCurrentWasteStream(stream);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setWasteStreams(wasteStreams.filter((stream) => stream.id !== id));
  };

  const getTotalWaste = () => {
    return wasteStreams.reduce((sum, stream) => {
      if (stream.unit === "ton") return sum + stream.quantity * 1000;
      if (stream.unit === "litros") return sum + stream.quantity;
      return sum + stream.quantity;
    }, 0);
  };

  const getRecycledWaste = () => {
    return wasteStreams.reduce((sum, stream) => {
      const quantity =
        stream.unit === "ton" ? stream.quantity * 1000 : stream.quantity;
      return sum + (quantity * stream.recyclingRate) / 100;
    }, 0);
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Recycle className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Gestión de Residuos
          </h2>
        </div>
        <Link href={`${rutaActual}/registrar`}>
          <Button
            // onClick={() => setIsDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Flujo de Residuos
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen de Residuos</CardTitle>
          <CardDescription>
            Vista general del manejo de residuos y su impacto ambiental en la
            organización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col p-3 border rounded-lg bg-blue-50">
              <span className="text-sm text-gray-500">
                Total de Flujos de Residuos
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {filteredWasteStreams.length}
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg bg-green-50">
              <span className="text-sm text-gray-500">
                Cantidad Total de Residuos
              </span>
              <span className="text-2xl font-bold text-green-600">
                {getTotalWaste().toLocaleString()} kg
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg bg-yellow-50">
              <span className="text-sm text-gray-500">Residuos Reciclados</span>
              <span className="text-2xl font-bold text-yellow-600">
                {getRecycledWaste().toLocaleString()} kg
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg bg-red-50">
              <span className="text-sm text-gray-500">
                Huella de Carbono Total
              </span>
              <span className="text-2xl font-bold text-red-600">
                {wasteStreams
                  .reduce((sum, stream) => sum + stream.carbonFootprint, 0)
                  .toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar flujos de residuos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[200px]">Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Método de Disposición</TableHead>
              <TableHead>Tasa de Reciclaje</TableHead>
              <TableHead>Huella de Carbono (tCO2e)</TableHead>
              <TableHead>Última Recolección</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWasteStreams.map((stream, index) => (
              <TableRow
                key={stream.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="font-medium">{stream.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      stream.type === "Orgánico"
                        ? "bg-green-100 text-green-800"
                        : stream.type === "Plástico"
                        ? "bg-blue-100 text-blue-800"
                        : stream.type === "Papel"
                        ? "bg-yellow-100 text-yellow-800"
                        : stream.type === "Vidrio"
                        ? "bg-purple-100 text-purple-800"
                        : stream.type === "Metal"
                        ? "bg-gray-100 text-gray-800"
                        : stream.type === "Electrónico"
                        ? "bg-red-100 text-red-800"
                        : stream.type === "Peligroso"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {stream.type}
                  </span>
                </TableCell>
                <TableCell>{`${stream.quantity} ${stream.unit}`}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      stream.disposalMethod === "Reciclaje"
                        ? "bg-green-100 text-green-800"
                        : stream.disposalMethod === "Compostaje"
                        ? "bg-yellow-100 text-yellow-800"
                        : stream.disposalMethod === "Incineración"
                        ? "bg-red-100 text-red-800"
                        : stream.disposalMethod === "Vertedero"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {stream.disposalMethod}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      stream.recyclingRate > 75
                        ? "bg-green-100 text-green-800"
                        : stream.recyclingRate > 50
                        ? "bg-yellow-100 text-yellow-800"
                        : stream.recyclingRate > 25
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {`${stream.recyclingRate}%`}
                  </span>
                </TableCell>
                <TableCell>{stream.carbonFootprint.toFixed(2)}</TableCell>
                <TableCell>{stream.lastCollection}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(stream)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(stream.id)}
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
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar" : "Agregar Nuevo"} Flujo de Residuos
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique" : "Complete"} los detalles del flujo de
              residuos aquí. Haga clic en guardar cuando termine.
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
                  value={currentWasteStream.name || ""}
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
                  value={currentWasteStream.type}
                  onValueChange={(value) => handleSelectChange(value, "type")}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Orgánico">Orgánico</SelectItem>
                    <SelectItem value="Plástico">Plástico</SelectItem>
                    <SelectItem value="Papel">Papel</SelectItem>
                    <SelectItem value="Vidrio">Vidrio</SelectItem>
                    <SelectItem value="Metal">Metal</SelectItem>
                    <SelectItem value="Electrónico">Electrónico</SelectItem>
                    <SelectItem value="Peligroso">Peligroso</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="quantity"
                  className="text-right"
                >
                  Cantidad
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={currentWasteStream.quantity || ""}
                  onChange={handleInputChange}
                  className="col-span-2"
                />
                <Select
                  name="unit"
                  value={currentWasteStream.unit}
                  onValueChange={(value) => handleSelectChange(value, "unit")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ton">ton</SelectItem>
                    <SelectItem value="litros">litros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="disposalMethod"
                  className="text-right"
                >
                  Método de Disposición
                </Label>
                <Select
                  name="disposalMethod"
                  value={currentWasteStream.disposalMethod}
                  onValueChange={(value) =>
                    handleSelectChange(value, "disposalMethod")
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Reciclaje">Reciclaje</SelectItem>
                    <SelectItem value="Compostaje">Compostaje</SelectItem>
                    <SelectItem value="Incineración">Incineración</SelectItem>
                    <SelectItem value="Vertedero">Vertedero</SelectItem>
                    <SelectItem value="Tratamiento especial">
                      Tratamiento especial
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="recyclingRate"
                  className="text-right"
                >
                  Tasa de Reciclaje (%)
                </Label>
                <Input
                  id="recyclingRate"
                  name="recyclingRate"
                  type="number"
                  min="0"
                  max="100"
                  value={currentWasteStream.recyclingRate || ""}
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
                  value={currentWasteStream.carbonFootprint || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="lastCollection"
                  className="text-right"
                >
                  Última Recolección
                </Label>
                <Input
                  id="lastCollection"
                  name="lastCollection"
                  type="date"
                  value={currentWasteStream.lastCollection || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="notes"
                  className="text-right"
                >
                  Notas
                </Label>
                <Input
                  id="notes"
                  name="notes"
                  value={currentWasteStream.notes || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
              >
                {isEditing ? "Actualizar" : "Guardar"} Flujo de Residuos
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
