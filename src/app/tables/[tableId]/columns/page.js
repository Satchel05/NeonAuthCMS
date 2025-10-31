import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function ColumnsPage({ params }) {
    // a little janky right now

    const { tableId } = await params;
    const response = await fetch(`http://localhost:3000/api/tables/${tableId}/columns`, {
        cache: 'no-store'
    });

    const columns = await response.json();

    return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Column Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Required</TableHead>
          <TableHead>Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {columns.map((col) => (
          <TableRow key={col.id}>
            <TableCell className="font-medium">{col.column_name}</TableCell>
            <TableCell>{col.column_type}</TableCell>
            <TableCell>{col.is_required ? '✓' : '—'}</TableCell>
            <TableCell className="text-sm text-gray-500">
              {JSON.stringify(col.options["dropdown_options"])}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );


}