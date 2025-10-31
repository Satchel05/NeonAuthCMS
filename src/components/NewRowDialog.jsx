'use client';


import * as React from 'react';
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

export function NewRowDialog({ columns }) {

    if(!columns || columns.length == 0) {
        return null;
    }


    const [formValues, setFormValues] = React.useState(
    Object.fromEntries(columns.map((col) => [col.key, '']))
    );

    function handleChange(key, value) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e) {
    e.preventDefault();
    console.log('New row:', formValues);
    // TODO: send formValues to API, then close dialog, etc.
    }


  return (
    <Dialog>
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

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >
          {columns.map((col) => (
            <div key={col.id} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {col.column_name}
              </label>
              <Input
                type={col.type}
                placeholder={col.placeholder}
                value={formValues[col.id]}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
              Save Row
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
