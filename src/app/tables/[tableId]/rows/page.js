import DataTable from '@/components/DataTable'

export default async function rowsPage({ params }) {

    const { tableId } = await params;

    const [rowDataRes, columnDataRes] = await Promise.all([
        fetch(`http://localhost:3000/api/tables/${tableId}/rows`, { cache: 'no-store' }),
        fetch(`http://localhost:3000/api/tables/${tableId}/columns`, { cache: 'no-store' }),
    ]);

    const [rowData, columnData] = await Promise.all([rowDataRes.json(), columnDataRes.json()]);

    return <DataTable schema={rowData.schema} rows={rowData.rows} columns={columnData} />
}