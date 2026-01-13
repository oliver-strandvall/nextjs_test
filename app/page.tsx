"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<{ id: number; name: string; lat: number; lng: number }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    const res =  await fetch("/api/test/");
    console.log(res.status)
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
  }, []);

  if(error === "ERROR!") {
  return (
    <main className="bg-blue-950 font-san min-h-screen flex justify-center flex-col items-center gap-5">
      <h1 className="text-xl font-semibold">Saved Locations:</h1>
      <div className="bg-red-900 rounded-lg w-110 h-15 flex items-center justify-center">
        <h1 className="text-xl font-semibold">Error loading data</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-blue-900 p-4 rounded-lg m-5 w-50 h-50">
            <h1 className="text-xl font-semibold mb-20"></h1>
            <p></p>
            <p></p>
        </div>
        <div className="bg-blue-900 p-4 rounded-lg m-5 w-50 h-50">
          <h1 className="text-xl font-semibold mb-20"></h1>
          <p></p>
          <p></p>
        </div>
      </div>
      <p>Data from API-route</p>
    </main>
  );
  }

  return (
    <main className="bg-blue-950 font-san min-h-screen flex justify-center flex-col items-center gap-5">
      <h1 className="text-xl font-semibold">Saved Locations:</h1>
      <div className="flex items-center justify-center">
        <div className="bg-blue-900 p-4 rounded-lg m-5 w-50 h-50">
            <h1 className="text-xl font-semibold mb-20">{data ? data[0]?.name ?? "No data" : "Loading…"}</h1>
            <p>lat: {data ? data[0]?.lat ?? "No data" : "Loading…"}</p>
            <p>lng: {data ? data[0]?.lng ?? "No data" : "Loading…"}</p>
        </div>
        <div className="bg-blue-900 p-4 rounded-lg m-5 w-50 h-50">
          <h1 className="text-xl font-semibold mb-20">{data ? data[1]?.name ?? "No data" : "Loading…"}</h1>
          <p>lat: {data ? data[1]?.lat ?? "No data" : "Loading…"}</p>
          <p>lng: {data ? data[1]?.lng ?? "No data" : "Loading…"}</p>
        </div>
      </div>
      <p>Data from API-route</p>
    </main>
  );
}
