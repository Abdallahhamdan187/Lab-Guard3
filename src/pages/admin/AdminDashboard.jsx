import { Users, Package, TrendingUp, Activity, UserPlus, Settings, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";

// Updated paths to use the new @/ alias
import { StatCard } from "@/components/shared/StatCard";
import { mockEquipment, mockTransactions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function AdminDashboard() {
  const totalUsers = 156;
  const totalEquipment = mockEquipment.length;
  const totalTransactions = mockTransactions.length;
  const systemUptime = "99.8%";

  const monthlyData = [
    { id: 'oct', month: 'Oct', students: 42, instructors: 8, equipment: 28, transactions: 145 },
    { id: 'nov', month: 'Nov', students: 45, instructors: 9, equipment: 30, transactions: 168 },
    { id: 'dec', month: 'Dec', students: 48, instructors: 9, equipment: 32, transactions: 156 },
    { id: 'jan', month: 'Jan', students: 52, instructors: 10, equipment: 35, transactions: 189 },
    { id: 'feb', month: 'Feb', students: 55, instructors: 11, equipment: 38, transactions: 201 },
    { id: 'mar', month: 'Mar', students: 58, instructors: 12, equipment: 40, transactions: 223 }
  ];

  const recentUsers = [
    { id: '1', name: 'Fatima Al-Said', role: 'Student', department: 'Computer Engineering', date: '2026-03-22' },
    { id: '2', name: 'Hassan Mahmoud', role: 'Student', department: 'Electrical Engineering', date: '2026-03-21' },
    { id: '3', name: 'Dr. Noor Ahmed', role: 'Instructor', department: 'Mechanical Engineering', date: '2026-03-20' },
    { id: '4', name: 'Zainab Ibrahim', role: 'Lab Assistant', department: 'Electronics Lab', date: '2026-03-19' }
  ];

  const systemLogs = [
    { id: '1', action: 'User Login', user: 'Ahmad Khalil', timestamp: '2026-03-24 09:15:23', status: 'Success' },
    { id: '2', action: 'Equipment Updated', user: 'Lab Assistant', timestamp: '2026-03-24 08:45:10', status: 'Success' },
    { id: '3', action: 'Backup Completed', user: 'System', timestamp: '2026-03-24 02:00:00', status: 'Success' },
    { id: '4', action: 'Failed Login Attempt', user: 'Unknown', timestamp: '2026-03-23 23:45:12', status: 'Failed' }
  ];

  const handleExportReport = () => {
    toast.success("System report exported successfully!");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings size={16} />
            System Settings
          </Button>
          <Button
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-[#e9333f] hover:bg-[#d12233] text-white"
          >
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="#3498db"
          trend={{ value: "12%", isPositive: true }}
        />
        <StatCard
          title="Total Equipment"
          value={totalEquipment}
          icon={Package}
          color="#e9333f"
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard
          title="Total Transactions"
          value={totalTransactions}
          icon={TrendingUp}
          color="#27ae60"
          trend={{ value: "15%", isPositive: true }}
        />
        <StatCard
          title="System Uptime"
          value={systemUptime}
          icon={Activity}
          color="#9b59b6"
        />
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Growth Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line
              key="students-line"
              type="monotone"
              dataKey="students"
              stroke="#e9333f"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              key="equipment-line"
              type="monotone"
              dataKey="equipment"
              stroke="#3498db"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              key="transactions-line"
              type="monotone"
              dataKey="transactions"
              stroke="#27ae60"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <UserPlus size={16} />
              Add User
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{new Date(user.date).toLocaleDateString()}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Activity Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <p className="text-xs text-gray-500">{log.timestamp}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{log.user}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        log.status === 'Success'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }>
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-3">User Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Students</span>
              <span className="text-sm font-semibold text-gray-900">127 (81%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Instructors</span>
              <span className="text-sm font-semibold text-gray-900">18 (12%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Lab Assistants</span>
              <span className="text-sm font-semibold text-gray-900">11 (7%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Equipment Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Available</span>
              <span className="text-sm font-semibold text-green-600">
                {mockEquipment.filter(e => e.status === 'Available').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">In Use</span>
              <span className="text-sm font-semibold text-blue-600">
                {mockEquipment.filter(e => e.status === 'In Use').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Maintenance</span>
              <span className="text-sm font-semibold text-orange-600">
                {mockEquipment.filter(e => e.status === 'Maintenance').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Request Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Pending</span>
              <span className="text-sm font-semibold text-yellow-600">
                {mockTransactions.filter(t => t.status === 'Pending').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Approved</span>
              <span className="text-sm font-semibold text-green-600">
                {mockTransactions.filter(t => t.status === 'Approved').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Completed</span>
              <span className="text-sm font-semibold text-blue-600">
                {mockTransactions.filter(t => t.status === 'Completed').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}