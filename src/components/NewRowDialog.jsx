'use client';


import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableRow, TableCell } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { DynamicForm } from '@/components/DynamicForm';

export function NewRowDialog({ columns, tableId }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleSucces = () => {
      setIsOpen(false);
      
    }

    if(!columns || columns.length == 0) {
        return null;
    }

    const initialData = Object.fromEntries(
      columns.map((col) => {
        let defaultValue;
        
        switch (col.column_type) {
          case 'tags':
            defaultValue = [];  // Empty array for tags
            break;
          case 'text':
            defaultValue = '';  // Empty string for text
            break;
          default:
            defaultValue = '';
        }
        
        return [col.column_name, defaultValue];
      })
    );

    const [formValues, setFormValues] = useState(initialData);

    function handleChange(key, value) {
      setFormValues((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3000/api/tables/${tableId}/rows`, {
          method: 'POST',                // POST request
          headers: {
            'Content-Type': 'application/json', // send JSON
          },
          body: JSON.stringify(formValues),    // convert JS object to JSON
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Created row:', result);
        
        handleSucces();

        return result;
      } catch (error) {
        console.error('Failed to create row:', error);
        throw error;
      }
    }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* ✅ Valid table structure */}
      <DialogTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-gray-50 border-dashed transition">
          <TableCell
            colSpan={columns.length}
            className="text-center text-gray-500"
          >
            <div className="flex items-center justify-center gap-2 py-2">
                <Plus className="h-4 w-4" />
                Add Row
            </div>
          </TableCell>
        </TableRow>
      </DialogTrigger>

      {/* ✅ Modern dialog */}
      <DialogContent
        className="
          sm:max-w-md
          backdrop-blur-md bg-white dark:bg-neutral-900/80
          border border-gray-200 dark:border-neutral-800
          shadow-2xl rounded-xl
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
        "
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Add New Row
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill out the fields below to create a new entry.
          </DialogDescription>
        </DialogHeader>

        <DynamicForm columns={columns} formValues={formValues} handleChange={handleChange} onSubmit={handleSubmit}/>
      </DialogContent>
    </Dialog>
  );
}
