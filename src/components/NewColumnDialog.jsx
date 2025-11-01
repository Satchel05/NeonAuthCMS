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

export function NewColumnDialog({ tableId }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleSucces = () => {
      setIsOpen(false);
      
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* ✅ Valid table structure */}
      <DialogTrigger asChild>
        <Plus />
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
            Add New Column
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill out the fields below to create a column.
          </DialogDescription>
        </DialogHeader>

        {/* INSERT NEW COLUMN FORM HERE */}
      </DialogContent>
    </Dialog>
  );
}
