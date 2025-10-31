import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request, { params }) {
    try {

        const { tableId } = await params;

        const result = await pool.query(`SELECT * FROM user_tables WHERE id = $1`, [tableId]);
        return NextResponse.json({
            success: true,
            result: result.rows,
        })

    } catch(err) {
        return NextResponse.json({ 
        success: false, 
        error: err.message 
        }, { status: 500 });
    }
}