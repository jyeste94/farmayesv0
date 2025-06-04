// app/api/prestashop/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server';

const PRESTASHOP_BASE_URL = 'https://pharmayes.joseyeste.com';
const API_KEY = 'CKER67RSTRD6FF1DS25I6NR2KH17I135';

// Función principal que gestiona cualquier método HTTP
async function handleRequest(
    req: NextRequest,
    method: string,
    pathSegments: string[],
    body?: string
) {
    const endpoint = pathSegments.join('/');

    // Obtener los parámetros de la query y añadirlos a la URL de destino
    const searchParams = req.nextUrl.search;
    const url = `${PRESTASHOP_BASE_URL}/api/${endpoint}${searchParams}`;

    try {
        const prestashopRes = await fetch(url, {
            method,
            headers: {
                Authorization: `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: ['POST', 'PUT'].includes(method) ? body : undefined,
            next: { revalidate: 0 },
        });

        const contentType = prestashopRes.headers.get('content-type') || '';
        const raw = await prestashopRes.text();

        return new NextResponse(raw, {
            status: prestashopRes.status,
            headers: {
                'Content-Type': contentType,
            },
        });
    } catch (error: any) {
        console.error('Error en proxy PrestaShop:', error);
        return NextResponse.json(
            { error: 'Error en el proxy PrestaShop', message: error.message },
            { status: 500 }
        );
    }
}

// Métodos HTTP soportados
export async function GET(
    req: NextRequest,
    context: { params: { path: string[] } }
) {
    const pathSegments = context.params.path;
    return await handleRequest(req, 'GET', pathSegments);
}

export async function POST(req: NextRequest, context: { params: { path: string[] } }) {
    const body = await req.text();
    const pathSegments = context.params.path;
    return await handleRequest(req, 'POST', pathSegments, body);
}

export async function PUT(req: NextRequest, context: { params: { path: string[] } }) {
    const body = await req.text();
    const pathSegments = context.params.path;
    return await handleRequest(req, 'PUT', pathSegments, body);
}

export async function DELETE(req: NextRequest, context: { params: { path: string[] } }) {
    const pathSegments = context.params.path;
    return await handleRequest(req, 'DELETE', pathSegments);
}
