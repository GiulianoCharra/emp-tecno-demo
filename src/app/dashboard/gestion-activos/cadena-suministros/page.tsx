"use client";

import { useState } from "react";
import {
  Truck,
  Package,
  BarChart2,
  Plus,
  Search,
  MoreHorizontal,
  FileEdit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useRouter } from "next/router";

type SupplyChainItem = {
  id: string;
  name: string;
  type: "supplier" | "logistics" | "warehouse" | "retailer";
  location: string;
  carbonFootprint: number;
  sustainabilityScore: number;
};

export default function SupplyChainManagement() {
  const router = useRouter();
  const rutaActual = router.pathname; // Obtiene la ruta actual
  const [supplyChainItems, setSupplyChainItems] = useState<SupplyChainItem[]>([
    {
      id: "1",
      name: "Eco Fabrics Co.",
      type: "supplier",
      location: "Barcelona, Spain",
      carbonFootprint: 50,
      sustainabilityScore: 85,
    },
    {
      id: "2",
      name: "Green Logistics Ltd.",
      type: "logistics",
      location: "Madrid, Spain",
      carbonFootprint: 75,
      sustainabilityScore: 70,
    },
    {
      id: "3",
      name: "Sustainable Storage Solutions",
      type: "warehouse",
      location: "Valencia, Spain",
      carbonFootprint: 30,
      sustainabilityScore: 90,
    },
    {
      id: "4",
      name: "EcoFashion Outlet",
      type: "retailer",
      location: "Seville, Spain",
      carbonFootprint: 25,
      sustainabilityScore: 80,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<SupplyChainItem>>({});
  const [isEditing, setIsEditing] = useState(false);

  const filteredItems = supplyChainItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setSupplyChainItems(
        supplyChainItems.map((item) =>
          item.id === currentItem.id
            ? ({ ...item, ...currentItem } as SupplyChainItem)
            : item
        )
      );
    } else {
      const newId = (
        parseInt(supplyChainItems[supplyChainItems.length - 1]?.id || "0") + 1
      ).toString();
      const newItem: SupplyChainItem = {
        id: newId,
        name: currentItem.name || "",
        type: currentItem.type as
          | "supplier"
          | "logistics"
          | "warehouse"
          | "retailer",
        location: currentItem.location || "",
        carbonFootprint: parseFloat(
          currentItem.carbonFootprint?.toString() || "0"
        ),
        sustainabilityScore: parseFloat(
          currentItem.sustainabilityScore?.toString() || "0"
        ),
      };
      setSupplyChainItems([...supplyChainItems, newItem]);
    }
    setIsDialogOpen(false);
    setCurrentItem({});
    setIsEditing(false);
  };

  const handleEdit = (item: SupplyChainItem) => {
    setCurrentItem(item);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSupplyChainItems(supplyChainItems.filter((item) => item.id !== id));
  };

  const getTotalCarbonFootprint = () => {
    return supplyChainItems.reduce(
      (sum, item) => sum + item.carbonFootprint,
      0
    );
  };

  const getAverageSustainabilityScore = () => {
    const total = supplyChainItems.reduce(
      (sum, item) => sum + item.sustainabilityScore,
      0
    );
    return total / supplyChainItems.length;
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Gestión de Cadena de Suministro
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en la cadena de suministro..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href={`${rutaActual}/registrar`}>
          <Button
            // onClick={() => setIsDialogOpen(true)}
            className="bg-green-700 hover:bg-green-800"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Cadena de Suministro
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Huella de Carbono Total
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getTotalCarbonFootprint().toFixed(2)} tCO2e
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Puntuación de Sostenibilidad
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getAverageSustainabilityScore().toFixed(2)}/100
            </div>
            <p className="text-xs text-muted-foreground">
              +15% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Proveedores Activos
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                supplyChainItems.filter((item) => item.type === "supplier")
                  .length
              }
            </div>
            <p className="text-xs text-muted-foreground">+2 nuevos este mes</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eficiencia Logística
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +5% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[200px]">Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Huella de Carbono (tCO2e)</TableHead>
              <TableHead>Puntuación de Sostenibilidad</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow
                key={item.id}
                // className={
                //   item.type === "supplier"
                //     ? "bg-blue-50"
                //     : item.type === "logistics"
                //     ? "bg-green-50"
                //     : item.type === "warehouse"
                //     ? "bg-yellow-50"
                //     : "bg-purple-50"
                // }
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      item.type === "supplier"
                        ? "bg-blue-100 text-blue-800"
                        : item.type === "logistics"
                        ? "bg-green-100 text-green-800"
                        : item.type === "warehouse"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.carbonFootprint}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      item.sustainabilityScore > 80
                        ? "bg-green-100 text-green-800"
                        : item.sustainabilityScore > 60
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.sustainabilityScore}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(item.id)}
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
              {isEditing ? "Editar" : "Agregar"} Elemento de la Cadena de
              Suministro
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique" : "Complete"} los detalles del elemento
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
                  value={currentItem.name || ""}
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
                  value={currentItem.type}
                  onValueChange={(value) => handleSelectChange(value, "type")}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Proveedor</SelectItem>
                    <SelectItem value="logistics">Logística</SelectItem>
                    <SelectItem value="warehouse">Almacén</SelectItem>
                    <SelectItem value="retailer">Minorista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="location"
                  className="text-right"
                >
                  Ubicación
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={currentItem.location || ""}
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
                  value={currentItem.carbonFootprint || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="sustainabilityScore"
                  className="text-right"
                >
                  Puntuación de Sostenibilidad
                </Label>
                <Input
                  id="sustainabilityScore"
                  name="sustainabilityScore"
                  type="number"
                  value={currentItem.sustainabilityScore || ""}
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
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
