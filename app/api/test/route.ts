import { NextRequest } from "next/server";

let map = [ { "id": 1, "name": "School", "lat": 59.3, "lng": 18.1 }, { "id": 2, "name": "Library", "lat": 59.4, "lng": 18.05 } ]
let nextId = 3;

export async function GET() {
    return Response.json(map);
}

export async function POST(req:Request) {
    const data = await req.json();
    const newData = {
        id: nextId++,
        name: data.name,  
        lat: data.lat,
        lng: data.lng
    };
    map.push(newData);
    return Response.json({msg: "Added location"});
}

export async function DELETE(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    console.log("Deleting id:", id);
    map = map.filter(item => item.id !== id);
    return Response.json({msg: "Deleted location"});
}

export async function PUT(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    const data = await req.json();
    map = map.map(item => {
        if(item.id === id) {
            return {
                ...item,
                name: data.name,
                lat: data.lat,
                lng: data.lng
            };
        }
        return item;
    });
    return Response.json({msg: "Updated location"});
}
