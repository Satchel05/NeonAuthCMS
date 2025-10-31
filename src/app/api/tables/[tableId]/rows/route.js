import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request, {params}) {
    try {
        const { tableId } = params;
        const rowData = await request.json();

        // get required columns to cross check against rows
        const schema = await pool.query(
            `
                SELECT column_name, is_required FROM table_columns WHERE table_id = $1
            `, [tableId]
        );

        // validate based on schema
        for (const col of schema.rows) {
            if (col.is_required && !(col.column_name in rowData)) {
                return NextResponse.json(
                    { error: `Missing required field: ${col.column_name}` },
                    { status: 400 }
                );
            }
        }

        const result = await pool.query(
            `
                INSERT INTO table_rows (table_id, data) VALUES ($1, $2) RETURNING *
            `, [tableId, rowData]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch(err) {
        return NextResponse.json({ 
        success: false, 
        error: err.message 
        }, { status: 500 });
    }
}
