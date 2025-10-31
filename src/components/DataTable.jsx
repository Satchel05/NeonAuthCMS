import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tag } from '@/components/Tag';
import { NewRowDialog} from '@/components/NewRowDialog';

export default function DataTable({ schema, rows, columns}) {


    return (
        <div className="w-full max-w-4xl mx-auto p-8">  {/* Fixed width container */}
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                {schema.map(col => (
                    <TableHead key={col.column_name} className="font-semibold">
                        {col.column_name}
                    </TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={schema.length} className="h-24 text-center">
                    No data yet.
                    </TableCell>
                </TableRow>
                ) : (
                rows.map(row => (
                    <TableRow key={row.id} className="hover:bg-gray-50">
                    {schema.map(col => (
                        <TableCell key={col.column_name}>
                        {Array.isArray(row.data[col.column_name])
                            ? <Tag>{row.data[col.column_name].join(', ')}</Tag>
                            : <Tag>{row.data[col.column_name] ?? '—'}</Tag>}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                )}

                <NewRowDialog columns={columns}/>
            </TableBody>
            </Table>
        </div>
        </div>
    );
}