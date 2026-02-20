import { cookies } from 'next/headers';

const USERS = [
    { username: 'user', password: 'user123', role: 'user' },
    { username: 'admin', password: 'admin123', role: 'admin' },
];

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const { userName, password } = await req.json();
    const match = USERS.find(u => u.username === userName && u.password === password);
    if (!match) return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    cookieStore.set('role', match.role, { httpOnly: true, path: '/', sameSite: 'lax' });
    return Response.json({ success: true, role: match.role }, { status: 200 });
}

//Tar bort cookies, när man logggar ut
export async function DELETE() {
    const cookieStore = await cookies()
    cookieStore.set('role', '', { httpOnly: true, path: '/', sameSite: 'lax', maxAge: 0 });
    return Response.json({ success: true });
}