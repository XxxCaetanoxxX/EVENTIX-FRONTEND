// src/app/api/users/me/route.ts
import { nest } from '@/src/lib/axios/nest';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Token ausente' }, { status: 401 });
  }

  try {
    const response = await nest.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error.response?.data);
    return NextResponse.json(
      error.response?.data || { message: 'Erro inesperado' },
      { status: error.response?.status || 500 }
    );
  }
}
