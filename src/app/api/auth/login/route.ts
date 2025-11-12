import { api } from '@/src/lib/axios/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const response = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, { email, password });

    const { accessToken, refreshToken } = response.data;

    const res = NextResponse.json({ message: "Login realizado com sucesso." });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 min
    });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return res;
  } catch (error: any) {
    console.error('Erro no login:', error.response?.data);

    return NextResponse.json(
      error.response?.data || { message: 'Erro inesperado' },
      { status: error.response?.status || 500 }
    );
  }
}
