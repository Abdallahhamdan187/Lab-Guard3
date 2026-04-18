import { Package, Users, CheckCircle, Clock, TrendingUp, XCircle } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockTransactions, mockEquipment } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function InstructorDashboard() {
  const pendingApprovals = mockTransactions.filter(t => t.status === 'Pending');
  const approvedToday = mockTransactions.filter(t =>
    t.status === 'Approved' &&
    new Date(t.approvalDate || '').toDateString() === new Date().toDateString()
  ).length;
  const totalStudents = 45;
  const activeEquipment = mockEquipment.filter(e => e.status === 'In Use').length;

  const weeklyData = [
    { id: 'mon', day: 'Mon', requests: 12, approvals: 10 },
    { id: 'tue', day: 'Tue', requests: 15, approvals: 13 },
    { id: 'wed', day: 'Wed', requests: 10, approvals: 9 },
    { id: 'thu', day: 'Thu', requests: 18, approvals: 15 },
    { id: 'fri', day: 'Fri', requests: 8, approvals: 7 }
  ];

  const handleApprove = (id, equipmentName) => {
    toast.success(`Approved borrow request for ${equipmentName}`);
  };

  const handleDeny = (id, equipmentName) => {
    toast.error(`Denied borrow request for ${equipmentName}`);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage student requests and monitor equipment usage</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          icon={Clock}
          color="#f39c12"
        />
        <StatCard
          title="Approved Today"
          value={approvedToday}
          icon={CheckCircle}
          color="#27ae60"
          trend={{ value: "15%", isPositive: true }}
        />
        <StatCard
          title="Active Students"
          value={totalStudents}
          icon={Users}
          color="#3498db"
        />
        <StatCard
          title="Equipment in Use"
          value={activeEquipment}
          icon={TrendingUp}
          color="#e9333f"
        />
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Request Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area
              key="requests-area"
              type="monotone"
              dataKey="requests"
              stackId="1"
              stroke="#e9333f"
              fill="#e9333f"
              fillOpacity={0.6}
            />
            <Area
              key="approvals-area"
              type="monotone"
              dataKey="approvals"
              stackId="2"
              stroke="#27ae60"
              fill="#27ae60"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#e9333f] rounded"></div>
            <span className="text-sm text-gray-600">Requests</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#27ae60] rounded"></div>
            <span className="text-sm text-gray-600">Approvals</span>
          </div>
        </div>
      </div>

      {/* Pending Approvals Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pending Approval Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Student</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.length > 0 ? (
                pendingApprovals.map((txn) => (
                  <TableRow key={txn.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{txn.userName}</p>
                        <p className="text-xs text-gray-500">{txn.userRole}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{txn.equipmentName}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{txn.quantity}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-xs">{txn.purpose}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{new Date(txn.requestDate).toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={txn.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(txn.id, txn.equipmentName)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeny(txn.id, txn.equipmentName)}
                          className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                          <XCircle size={16} className="mr-1" />
                          Deny
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <CheckCircle className="mx-auto text-gray-400 mb-2" size={48} />
                    <p className="text-gray-600">No pending approvals</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recently Approved</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {mockTransactions.filter(t => t.status === 'Approved').slice(0, 5).map((txn) => (
              <div key={txn.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{txn.equipmentName}</p>
                    <p className="text-xs text-gray-500 mt-1">Student: {txn.userName}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(txn.approvalDate || '').toLocaleDateString()}
                    </p>
                  </div>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Equipment Status Overview</h3>
          </div>
          <div className="p-6 space-y-4">
            {['Available', 'In Use', 'Maintenance', 'Reserved'].map((status) => {
              const count = mockEquipment.filter(e => e.status === status).length;
              const total = mockEquipment.length;
              const percentage = (count / total) * 100;

              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{status}</span>
                    <span className="text-sm text-gray-500">{count} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${status === 'Available' ? 'bg-green-500' :
                        status === 'In Use' ? 'bg-blue-500' :
                          status === 'Maintenance' ? 'bg-orange-500' :
                            'bg-purple-500'
                        }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
