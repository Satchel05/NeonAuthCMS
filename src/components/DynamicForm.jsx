import { TagSelect } from '@/components/TagSelect';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/DatePicker';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';

const INPUT_COMPONENTS = {
    tags: TagSelect,
    text: Input,
    number: Input,
    date: DatePicker,
}

const getInputProps = (column, value, onChange) => {
  const baseProps = {
    value,
    onChange: column.column_type === 'tags' 
      ? onChange 
      : (e) => onChange(e.target.value),
  };

  switch (column.column_type) {
    case 'tags':
      return {
        ...baseProps,
        options: column.options.dropdown_options || [],
      };
    case 'number':
      return {
        ...baseProps,
        type: 'number',
      };
    case 'date':
      return {
        ...baseProps,
        type: 'date',
      };
    default:
      return baseProps;
  }
};

export function DynamicForm({ columns, formValues, handleChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {columns.map((column) => {
        const InputComponent = INPUT_COMPONENTS[column.column_type] || Input;
        const inputProps = getInputProps(
          column,
          formValues[column.column_name],
          (val) => handleChange(column.column_name, val)
        );

        return (
          <div key={column.id}>
            <Label>{column.column_name}</Label>
            <InputComponent {...inputProps} />
          </div>
        );
      })}
      <div className="flex justify-center mt-4">
        <Button type="submit" className="w-full">Add Row</Button>
      </div>
    </form>
  );
}