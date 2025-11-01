import { TagSelect } from '@/components/TagSelect';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/DatePicker';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';

// need:
// name
// column_type
// is_required
// let's skip options for now

export function ColumnForm({ columns, formValues, handleChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      
      <div className="flex justify-center mt-4">
        <Button type="submit" className="w-full">Add Row</Button>
      </div>
    </form>
  );
}