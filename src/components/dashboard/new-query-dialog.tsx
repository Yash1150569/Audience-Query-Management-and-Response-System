'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { NewQueryForm } from '../forms/new-query-form';
import { useState } from 'react';

export function NewQueryDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          New Query
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Create New Query</DialogTitle>
          <DialogDescription>
            Simulate a new incoming query. The AI will automatically tag and prioritize it.
          </DialogDescription>
        </DialogHeader>
        <NewQueryForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
