import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { Prisma, EmploymentType, PublishingState, Currency } from '@prisma/client';
import { includeObject } from '@/backend/profile/profile.service';
import { JobSpecialization } from '@/app/[locale]/(profile)/profile.types';

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
    if (params.seniority?.length) {
        AND.push({
            seniority: { in: params.seniority }
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

    // Employment types filter
    if (params.employmentTypes?.length) {
        AND.push({
            employmentTypes: {
                hasSome: params.employmentTypes as EmploymentType[]
            }
        });
    }

    // Remote work filter
    if (typeof params.remoteOnly === 'boolean') {
        AND.push({
            remoteOnly: params.remoteOnly
        });
    }

    // Open for work filter
    if (typeof params.isOpenForWork === 'boolean') {
        AND.push({
            isOpenForWork: params.isOpenForWork
        });
    }

    // Relocation filters
    if (params.openForCountryRelocation) {
        AND.push({
            openForCountryRelocation: params.openForCountryRelocation
        });
    }

    if (params.openForCityRelocation) {
        AND.push({
            openForCityRelocation: params.openForCityRelocation
        });
    }

    // Country filter
    if (params.country?.name) {
        AND.push({
            country: {
                name: params.country.name
            }
        });
    }

    // City filter
    if (params.city?.name) {
        AND.push({
            city: {
                name: params.city.name
            }
        });
    }

    // Hourly rate filter
    if (params.hourlyRateMin !== undefined || params.hourlyRateMax !== undefined) {
        AND.push({
            AND: [
                params.hourlyRateMin !== undefined
                    ? { hourlyRateMin: { gte: params.hourlyRateMin } }
                    : {},
                params.hourlyRateMax !== undefined
                    ? { hourlyRateMax: { lte: params.hourlyRateMax } }
                    : {}
            ]
        });
    }

    if (params.position) {
        AND.push({
            position: params.position as JobSpecialization
        });
    }

    // Currency filter
    if (params.currency) {
        AND.push({
            currency: params.currency as Currency
        });
    }

    // Language filter
    if (params.language?.length) {
        AND.push({
            language: {
                some: {
                    name: { in: params.language }
                }
            }
        });
    }

    return conditions;
}
