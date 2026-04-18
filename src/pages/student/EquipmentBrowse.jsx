import { useState } from "react";
import { Search, Filter, SlidersHorizontal, Package } from "lucide-react";
import { mockEquipment } from "@/data/mockData";
import { EquipmentCard } from "@/components/shared/EquipmentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function EquipmentBrowse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [borrowQuantity, setBorrowQuantity] = useState(1);
  const [purpose, setPurpose] = useState("");

  // Get unique categories
  const categories = ["all", ...new Set(mockEquipment.map(e => e.category))];

  // Filter equipment
  const filteredEquipment = mockEquipment.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || equipment.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || equipment.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleBorrowClick = (equipment) => {
    setSelectedEquipment(equipment);
    setBorrowQuantity(1);
    setPurpose("");
  };

  const handleSubmitBorrow = () => {
    if (!purpose.trim()) {
      toast.error("Please provide a purpose for borrowing");
      return;
    }

    toast.success("Borrow request submitted successfully!", {
      description: `Request for ${borrowQuantity} ${selectedEquipment.name} has been sent for approval.`
    });

    setSelectedEquipment(null);
    setBorrowQuantity(1);
    setPurpose("");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Browse Equipment</h1>
        <p className="text-gray-600 mt-1">Search and borrow laboratory equipment</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search equipment by name or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <Filter className="mr-2" size={16} />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SlidersHorizontal className="mr-2" size={16} />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="In Use">In Use</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredEquipment.length}</span> equipment items
        </p>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onBorrow={() => handleBorrowClick(equipment)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Equipment Found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Borrow Dialog */}
      <Dialog open={!!selectedEquipment} onOpenChange={() => setSelectedEquipment(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Borrow Equipment</DialogTitle>
            <DialogDescription>
              Submit a request to borrow {selectedEquipment?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={selectedEquipment?.availableQuantity || 1}
                value={borrowQuantity}
                onChange={(e) => setBorrowQuantity(parseInt(e.target.value) || 1)}
              />
              <p className="text-xs text-gray-500">
                Available: {selectedEquipment?.availableQuantity} units
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose for borrowing this equipment (e.g., course project, research, lab assignment)..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setSelectedEquipment(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitBorrow}
              className="flex-1 bg-[#e9333f] hover:bg-[#d12233] text-white"
            >
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
