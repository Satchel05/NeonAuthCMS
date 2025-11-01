"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableRow, TableCell } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

export function NewColumnDialog({tableId}) {

    const [isOpen, setIsOpen] = useState(false);

    const handleSucces = () => {
        setIsOpen(false);
    }

  const [formData, setFormData] = useState({
    columnName: "",
    columnType: "text",
    isRequired: false,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    console.log(JSON.stringify({
          column_name: formData.columnName,
          column_type: formData.columnType,
          is_required: formData.isRequired,
          options: {}}))


      const response = await fetch(`http://localhost:3000/api/tables/${tableId}/columns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          column_name: formData.columnName,
          column_type: formData.columnType,
          is_required: formData.isRequired,
          options: {},
        }),
      });

      if (!response.ok) throw new Error('Failed to create column');

      // Reset form
      setFormData({ columnName: "", columnType: "text", isRequired: false });
      
      handleSucces();

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create column');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
            <div className="flex items-center justify-center gap-2 py-2">
                <Plus className="h-4 w-4" />
                Add Column
            </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Column Name *</Label>
            <Input
              value={formData.columnName}
              onChange={(e) => handleChange('columnName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Column Type *</Label>
            <Select 
              value={formData.columnType} 
              onValueChange={(val) => handleChange('columnType', val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="tags">Tags</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData.isRequired}
              onCheckedChange={(val) => handleChange('isRequired', val)}
            />
            <Label className="font-normal">Required field</Label>
          </div>

          <Button type="submit" className="w-full">
            Create Column
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}