import { useState } from "react";
import { PackagePlus, PackageMinus, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockEquipment, currentUser } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BorrowRequest() {
  const [borrowForm, setBorrowForm] = useState({
    equipmentId: "",
    quantity: 1,
    purpose: "",
    expectedReturnDate: ""
  });

  const [returnForm, setReturnForm] = useState({
    equipmentId: "",
    quantity: 1,
    condition: "good",
    notes: ""
  });

  const availableEquipment = mockEquipment.filter(e => e.availableQuantity > 0);

  // Mock borrowed equipment for return
  const borrowedEquipment = [
    { id: "eq-001", name: "Arduino Uno R3", quantity: 2, borrowDate: "2026-03-20" },
    { id: "eq-003", name: "Multimeter Fluke 87V", quantity: 1, borrowDate: "2026-03-18" }
  ];

  const handleBorrowSubmit = (e) => {
    e.preventDefault();

    if (!borrowForm.equipmentId || !borrowForm.purpose || !borrowForm.expectedReturnDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const equipment = mockEquipment.find(e => e.id === borrowForm.equipmentId);

    toast.success("Borrow request submitted!", {
      description: `Request for ${equipment?.name} has been sent for approval.`
    });

    setBorrowForm({
      equipmentId: "",
      quantity: 1,
      purpose: "",
      expectedReturnDate: ""
    });
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();

    if (!returnForm.equipmentId) {
      toast.error("Please select equipment to return");
      return;
    }

    const equipment = borrowedEquipment.find(e => e.id === returnForm.equipmentId);

    toast.success("Return request submitted!", {
      description: `Return request for ${equipment?.name} has been submitted.`
    });

    setReturnForm({
      equipmentId: "",
      quantity: 1,
      condition: "good",
      notes: ""
    });
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Borrow & Return</h1>
        <p className="text-gray-600 mt-1">Submit requests to borrow or return laboratory equipment</p>
      </div>

      {/* FIX: Added "flex flex-col" to force the tabs to sit on top of the content, 
        preventing them from turning into a massive sidebar. 
      */}
      <Tabs defaultValue="borrow" className="w-full flex flex-col">
        {/* FIX: Added mb-6 to create breathing room between the toggle and the form */}
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="borrow" className="flex items-center gap-2">
            <PackagePlus size={16} />
            Borrow Equipment
          </TabsTrigger>
          <TabsTrigger value="return" className="flex items-center gap-2">
            <PackageMinus size={16} />
            Return Equipment
          </TabsTrigger>
        </TabsList>

        {/* Borrow Form Content */}
        <TabsContent value="borrow" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Side: The Form (Takes up 2/3 of the space) */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-sm border-gray-200">
                <form onSubmit={handleBorrowSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Select Equipment *</Label>
                    <Select
                      value={borrowForm.equipmentId}
                      onValueChange={(value) => setBorrowForm({ ...borrowForm, equipmentId: value })}
                    >
                      <SelectTrigger id="equipment">
                        <SelectValue placeholder="Choose equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableEquipment.map(eq => (
                          <SelectItem key={eq.id} value={eq.id}>
                            {eq.name} ({eq.availableQuantity} available)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={borrowForm.quantity}
                        onChange={(e) => setBorrowForm({ ...borrowForm, quantity: parseInt(e.target.value) || 1 })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="returnDate">Expected Return Date *</Label>
                      <Input
                        id="returnDate"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={borrowForm.expectedReturnDate}
                        onChange={(e) => setBorrowForm({ ...borrowForm, expectedReturnDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose *</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Describe why you need this equipment (e.g., course project, lab assignment, research)..."
                      value={borrowForm.purpose}
                      onChange={(e) => setBorrowForm({ ...borrowForm, purpose: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#e9333f] hover:bg-[#d12233] text-white py-6"
                  >
                    Submit Borrow Request
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right Side: Information Cards (Takes up 1/3 of the space) */}
            <div className="space-y-6">
              <Card className="p-6 shadow-sm border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} className="text-gray-500" />
                  Your Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="text-sm font-medium">{currentUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Student ID</p>
                    <p className="text-sm font-medium">{currentUser.studentId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Department</p>
                    <p className="text-sm font-medium">{currentUser.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium">{currentUser.email}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-[#f0f7ff] border-[#bfdbfe] shadow-sm">
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-4">Important Guidelines</h3>
                <ul className="text-sm text-[#1e40af] space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>All requests require instructor approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Equipment must be returned by the specified date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Late returns may affect future borrowing privileges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Report any damage immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Maximum borrow period is 14 days</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Return Form Content */}
        <TabsContent value="return" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-sm border-gray-200">
                <form onSubmit={handleReturnSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="returnEquipment">Select Equipment to Return *</Label>
                    <Select
                      value={returnForm.equipmentId}
                      onValueChange={(value) => setReturnForm({ ...returnForm, equipmentId: value })}
                    >
                      <SelectTrigger id="returnEquipment">
                        <SelectValue placeholder="Choose equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        {borrowedEquipment.map(eq => (
                          <SelectItem key={eq.id} value={eq.id}>
                            {eq.name} (Qty: {eq.quantity}) - Borrowed: {new Date(eq.borrowDate).toLocaleDateString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="returnQuantity">Quantity *</Label>
                      <Input
                        id="returnQuantity"
                        type="number"
                        min="1"
                        value={returnForm.quantity}
                        onChange={(e) => setReturnForm({ ...returnForm, quantity: parseInt(e.target.value) || 1 })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Equipment Condition *</Label>
                      <Select
                        value={returnForm.condition}
                        onValueChange={(value) => setReturnForm({ ...returnForm, condition: value })}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="damaged">Damaged</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any issues, damages, or comments about the equipment..."
                      value={returnForm.notes}
                      onChange={(e) => setReturnForm({ ...returnForm, notes: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#e9333f] hover:bg-[#d12233] text-white py-6"
                  >
                    Submit Return Request
                  </Button>
                </form>
              </Card>
            </div>

            <div>
              <Card className="p-6 shadow-sm border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-gray-500" />
                  Currently Borrowed
                </h3>
                <div className="space-y-3">
                  {borrowedEquipment.map((eq) => (
                    <div key={eq.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{eq.name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">Qty: {eq.quantity}</p>
                        <p className="text-xs text-gray-500">Since: {new Date(eq.borrowDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}