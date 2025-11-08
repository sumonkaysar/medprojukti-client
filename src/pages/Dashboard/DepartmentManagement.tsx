import DepartmentForm from "../../components/Department/DepartmentForm";
import DepartmentTable from "../../components/Department/DepartmentTable";

const DepartmentManagement = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Department Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DepartmentForm />
        </div>
        <div className="lg:col-span-2">
          <DepartmentTable />
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
