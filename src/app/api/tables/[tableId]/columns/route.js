import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request, {params}) {
    try {
        const { tableId } = params;
        const { column_name, column_type, is_required, options } = await request.json();

        // Validate
        if (!column_name || !column_type) {
            return NextResponse.json(
                { error: 'Column name and type are required' },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `
                INSERT INTO table_columns (table_id, column_name, column_type, is_required, options) VALUES ($1, $2, $3, $4, $5) RETURNING *
            `, [tableId, column_name, column_type, is_required || false, JSON.stringify(options || {})]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch(err) {
        return NextResponse.json({ 
        success: false, 
        error: err.message 
        }, { status: 500 });
    }
}

export async function GET(request, {params}) {
    try {
        const { tableId } = params;

        const result = await pool.query(
            `
               SELECT * FROM table_columns WHERE table_id = $1
            `, [tableId]
        );
        return NextResponse.json(result.rows);
    } catch(err) {
        return NextResponse.json({ 
        success: false, 
        error: err.message 
        }, { status: 500 });
    }
}