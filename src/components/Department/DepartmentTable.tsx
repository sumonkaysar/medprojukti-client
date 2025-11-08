import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IDepartment } from "@/types/department.type";

interface IProps {
  departments: IDepartment[];
  setManageDept: React.Dispatch<
    React.SetStateAction<{
      selectedDept: IDepartment | null;
      action: "delete" | "edit" | null;
    }>
  >;
}

const DepartmentTable = ({ departments, setManageDept }: IProps) => {
  return (
    <div className="p-6 border rounded-lg bg-white">
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <Input className="grow" placeholder="Search department..." />
        <div className="flex items-center gap-2">
          <span>Rows</span>
          <Select>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">10</SelectItem>
              <SelectItem value="INACTIVE">20</SelectItem>
            </SelectContent>
          </Select>
          {/* <Select className="w-24">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </Select> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Department Name</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments &&
              departments.map((dept) => (
                <tr key={dept.id} className="border-b">
                  <td className="py-3 px-4">{dept.id}</td>
                  <td className="py-3 px-4">{dept.name}</td>
                  <td className="py-3 px-4">{dept.description}</td>
                  <td className="py-3 px-4">{dept.status}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          setManageDept({
                            selectedDept: dept,
                            action: "edit",
                          })
                        }
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          setManageDept({
                            selectedDept: dept,
                            action: "delete",
                          })
                        }
                        variant="destructive"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center gap-2 mt-6">
        <div className="mr-auto">Showing 1 to 5 of 12 entries</div>
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="default" size="sm" className="bg-slate-600">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};

export default DepartmentTable;
