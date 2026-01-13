export async function GET() {
    return Response.json([ { "id": 1, "name": "School", "lat": 59.3, "lng": 18.1 }, { "id": 2, "name": "Library", "lat": 59.4, "lng": 18.05 } ]);
}