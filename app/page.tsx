"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<{ id: number; name: string; lat: number; lng: number }[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [update, setUpdate] = useState(false);
  async function getData() {
    const res =  await fetch("/api/test/");
    if(res.status === 200) {
      setData(await res.json());
    }
    if(res.status !== 200){
      setError("ERROR!");
    }
  }

  console.log(data);

  useEffect(() => {
      getData();
  }, [update]);

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    if(name && lat && lng && lat == Number(lat) && lng == Number(lng)) {
      const res =  await fetch("/api/test/", {
        method: "POST",
        body: JSON.stringify({ name, lat, lng }),
      })
      const data = await res.json();
      setUpdate(!update);
      console.log("Successfully added location");
    } else {
      console.log("Location incorrectly formatted");
    }
  };

  if(error === "ERROR!") {
  return (
    <main className="bg-blue-950 font-san min-h-screen flex justify-center flex-col items-center gap-5">
      <h1 className="text-xl font-semibold">Saved Locations:</h1>
      <div className="bg-red-900 rounded-lg w-110 h-15 flex items-center justify-center">
        <h1 className="text-xl font-semibold">Error loading data</h1>
      </div>
      <p>Failed to fetch data from API-route</p>
    </main>
  );
  }

  return (
    <main className="bg-blue-950 font-san flex justify-center flex-col items-center gap-5 min-h-screen p-25">
      <h1 className="text-xl font-semibold">Saved Locations:</h1>
      <div className="flex items-center justify-center flex-auto flex-wrap">
      {data?.map((location) => (
      <div key ={location.id} className="bg-blue-900 p-5 rounded-lg m-2 w-50 h-50">
        <h1 className="text-xl font-semibold mb-20">{location.name}</h1>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lng}</p>
      </div>
      ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className="m-2 p-2 mb-10 rounded-lg bg-blue-900"/>
        <input onChange={(e)=>setLat(Number(e.target.value))} type="text" placeholder="Latitude" className="m-2 p-2 mb-10 rounded-lg bg-blue-900"/>
        <input onChange={(e)=>setLng(Number(e.target.value))} type="text" placeholder="Longitude" className="m-2 p-2 mb-10 rounded-lg bg-blue-900"/>
        <button className="bg-blue-600 p-5 rounded-lg hover:bg-blue-700 active:bg-blue-800 block m-auto">Add Loacation</button>
      </form>
      <p>Data from API-route</p>
    </main>
  );
}
