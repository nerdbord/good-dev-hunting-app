import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { Prisma } from '@prisma/client';

const API_KEY = process.env.GDH_API_KEY;

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const apiKey = authHeader?.replace('Bearer ', '');

    if (!apiKey || apiKey !== API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { query } = await request.json();
        // Convert the query string to a Prisma SQL template
        const sqlQuery = Prisma.sql([query]);

        // Execute the raw SQL query
        const profiles = await prisma.$queryRaw(sqlQuery);

        console.log('Profiles:', profiles);

        return NextResponse.json(profiles);
    } catch (error) {
        console.error('Search profiles error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
