// src/app/api/users/me/route.ts
import { api } from '@/src/lib/axios/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Token ausente' }, { status: 401 });
  }

  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
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
