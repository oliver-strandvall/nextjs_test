import { conn } from '@/lib/db';

export async function GET() {
    const db = await conn()
    const [rows] = await db.query("SELECT * FROM users");
    return Response.json(rows);
}

export async function POST(req:Request) {
    const body = await req.json()
    const db = await conn()
    const data = await db.query("INSERT INTO citat(name) VALUES(?)",[body.name])
    return Response.json(data)
}