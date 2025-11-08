import DepartmentForm from "@/components/Department/DepartmentForm";
import DepartmentTable from "@/components/Department/DepartmentTable";
import type { IDepartment } from "@/types/department.type";
import { useEffect, useState } from "react";

const Department = () => {
  const [manageDept, setManageDept] = useState<{
    selectedDept: IDepartment | null;
    action: "delete" | "edit" | null;
  }>({
    selectedDept: null,
    action: null,
  });

  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/departments", {
          credentials: "include",
        });
        const data = await response.json();
        setDepartments(data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Department Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DepartmentForm manageDept={manageDept} />
        </div>
        <div className="lg:col-span-2">
          <DepartmentTable
            departments={departments}
            setManageDept={setManageDept}
          />
        </div>
      </div>
    </div>
  );
};

export default Department;
