import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM user_tables');
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

export async function POST(request) {
    try {

        const { name } = await request.json();

        // Validate
        if (!name || name.trim() === '') {
            return NextResponse.json(
                { error: 'Table name is required' },
                { status: 400 }
            );
        }

        const result = await pool.query(`
            INSERT INTO user_tables (name) VALUES ($1) RETURNING * 
            `, [name]);
        return NextResponse.json(result.rows[0], { status: 201 });

    } catch(err) {
        return NextResponse.json({ 
        success: false, 
        error: err.message 
        }, { status: 500 });
    }
}

