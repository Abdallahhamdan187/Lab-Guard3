import { useState } from "react";
import { Download, FileText, Filter, Calendar } from "lucide-react";
import { mockTransactions } from "@/data/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exportToPDF, exportToExcel } from "../../utils/exportUtils";
import { toast } from "sonner";

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(txn => {
    const matchesSearch = txn.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || txn.type === typeFilter;
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;

    let matchesDate = true;
    if (dateFrom) {
      matchesDate = new Date(txn.requestDate) >= new Date(dateFrom);
    }
    if (dateTo && matchesDate) {
      matchesDate = new Date(txn.requestDate) <= new Date(dateTo);
    }

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const handleExportPDF = () => {
    exportToPDF(filteredTransactions, 'transaction-history.pdf');
    toast.success("PDF exported successfully!");
  };

  const handleExportExcel = () => {
    exportToExcel(filteredTransactions, 'transaction-history.xlsx');
    toast.success("Excel file exported successfully!");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-1">View and export your equipment transaction records</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleExportPDF}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText size={16} />
            Export PDF
          </Button>
          <Button
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-[#e9333f] hover:bg-[#d12233] text-white"
          >
            <Download size={16} />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Search by equipment or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <Filter className="mr-2" size={16} />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Borrow">Borrow</SelectItem>
              <SelectItem value="Return">Return</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <Filter className="mr-2" size={16} />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Denied">Denied</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="From"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{filteredTransactions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {filteredTransactions.filter(t => t.status === 'Approved').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {filteredTransactions.filter(t => t.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {filteredTransactions.filter(t => t.status === 'Completed').length}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Date</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                  <TableRow key={txn.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">
                            {new Date(txn.requestDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(txn.requestDate).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-gray-900">{txn.equipmentName}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${txn.type === 'Borrow'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                        }`}>
                        {txn.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{txn.quantity}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-xs truncate">{txn.purpose}</p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={txn.status} />
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{txn.approvedBy || '-'}</p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <FileText className="mx-auto text-gray-400 mb-2" size={48} />
                    <p className="text-gray-600">No transactions found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
