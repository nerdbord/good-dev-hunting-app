import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { type Prisma, PublishingState } from '@prisma/client';
import { includeObject } from '@/backend/profile/profile.service';
import { type JobSpecialization } from '@/app/[locale]/(profile)/profile.types';

const API_KEY = process.env.GDH_API_KEY;

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const apiKey = authHeader?.replace('Bearer ', '');

    if (!apiKey || apiKey !== API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { params } = await request.json();

        const whereConditions = buildSearchQuery(params);

        const profiles = await prisma.profile.findMany({
            where: whereConditions,
            include: includeObject.include,
        });

        return NextResponse.json(profiles);
    } catch (error) {
        console.error('Search profiles error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function buildSearchQuery(params: any): Prisma.ProfileWhereInput {
    const AND: Prisma.ProfileWhereInput[] = [];
    const conditions: Prisma.ProfileWhereInput = {
        state: PublishingState.APPROVED,
        AND
    };

    // Seniority filter
    if (params.seniority) {
        AND.push({
            seniority: params.seniority
        });
    }

    // Skills (techStack) filter
    if (params.techStack?.length) {
        AND.push({
            techStack: {
                some: {
                    name: { in: params.techStack }
                }
            }
        });
    }

    if (params.position) {
        AND.push({
            position: params.position as JobSpecialization
        });
    }


    return conditions;
}
