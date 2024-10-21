"use client";

import { useState, useEffect } from "react";
import {
  Users,
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
import Link from "next/link";
import { usePathname } from "next/navigation";

type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: "Activo" | "Inactivo";
  lastUpdate: string;
  carbonFootprint: number;
};

export default function PersonnelManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee>>({});
  const [isEditing, setIsEditing] = useState(false);

  const rutaActual = usePathname(); // Obtiene la ruta actual

  useEffect(() => {
    // Simulating API call to fetch employees
    const fetchEmployees = async () => {
      // This would be replaced with an actual API call
      const dummyEmployees: Employee[] = [
        {
          id: "1",
          name: "Juan Pérez",
          email: "juan@example.com",
          position: "Gerente",
          department: "Ventas",
          status: "Activo",
          lastUpdate: "2023-10-15",
          carbonFootprint: 2.5,
        },
        {
          id: "2",
          name: "María García",
          email: "maria@example.com",
          position: "Analista",
          department: "Finanzas",
          status: "Activo",
          lastUpdate: "2023-10-14",
          carbonFootprint: 1.8,
        },
        {
          id: "3",
          name: "Carlos Rodríguez",
          email: "carlos@example.com",
          position: "Desarrollador",
          department: "TI",
          status: "Inactivo",
          lastUpdate: "2023-10-13",
          carbonFootprint: 3.2,
        },
      ];
      setEmployees(dummyEmployees);
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmployee({ ...currentEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setEmployees(
        employees.map((emp) =>
          emp.id === currentEmployee.id
            ? ({ ...emp, ...currentEmployee } as Employee)
            : emp
        )
      );
    } else {
      const newId = (
        parseInt(employees[employees.length - 1]?.id || "0") + 1
      ).toString();
      const newEmployee: Employee = {
        id: newId,
        name: currentEmployee.name || "",
        email: currentEmployee.email || "",
        position: currentEmployee.position || "",
        department: currentEmployee.department || "",
        status: "Activo",
        lastUpdate: new Date().toISOString().split("T")[0],
        carbonFootprint: parseFloat(
          currentEmployee.carbonFootprint?.toString() || "0"
        ),
      };
      setEmployees([...employees, newEmployee]);
    }
    setIsDialogOpen(false);
    setCurrentEmployee({});
    setIsEditing(false);
  };

  const handleEdit = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Users className="h-8 w-8" />
          Gestión de Personal
        </h2>
        <Link href={`${rutaActual}/registrar`}>
          <Button
            className="bg-green-700 hover:bg-green-800"
            // onClick={() => {
            //   setCurrentEmployee({});
            //   setIsEditing(false);
            //   setIsDialogOpen(true);
            // }}
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Empleado
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Personal</CardTitle>
          <CardDescription>
            Vista general del impacto de carbono del personal en la
            organización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Total de Empleados</span>
              <span className="text-2xl font-bold">
                {filteredEmployees.length}
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Huella de Carbono Total
              </span>
              <span className="text-2xl font-bold">
                {filteredEmployees
                  .reduce((sum, emp) => sum + emp.carbonFootprint, 0)
                  .toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">
                Promedio por Empleado
              </span>
              <span className="text-2xl font-bold">
                {(
                  filteredEmployees.reduce(
                    (sum, emp) => sum + emp.carbonFootprint,
                    0
                  ) / filteredEmployees.length || 0
                ).toFixed(2)}{" "}
                tCO2e
              </span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm text-gray-500">Empleados Activos</span>
              <span className="text-2xl font-bold">
                {
                  filteredEmployees.filter((emp) => emp.status === "Activo")
                    .length
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
            placeholder="Buscar empleados..."
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
            <TableHead>Email</TableHead>
            <TableHead>Posición</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Última Actualización</TableHead>
            <TableHead className="text-right">
              Huella de Carbono (tCO2e)
            </TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    employee.status === "Activo"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.status}
                </span>
              </TableCell>
              <TableCell>{employee.lastUpdate}</TableCell>
              <TableCell className="text-right">
                {employee.carbonFootprint.toFixed(2)}
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
                    <DropdownMenuItem onClick={() => handleEdit(employee)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(employee.id)}
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
              {isEditing ? "Editar" : "Agregar Nuevo"} Empleado
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique" : "Complete"} los detalles del empleado
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
                  value={currentEmployee.name || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={currentEmployee.email || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="position"
                  className="text-right"
                >
                  Posición
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={currentEmployee.position || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="department"
                  className="text-right"
                >
                  Departamento
                </Label>
                <Input
                  id="department"
                  name="department"
                  value={currentEmployee.department || ""}
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
                  value={currentEmployee.carbonFootprint || ""}
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
                {isEditing ? "Actualizar" : "Guardar"} Empleado
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
