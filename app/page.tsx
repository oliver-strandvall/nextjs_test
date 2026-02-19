"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<{ id: number; name: string; lat: number; lng: number }[] | null>(null);
  const [error, setError] = useState<boolean | null>(false);
  
  const [name, setName] = useState("");
  const [lat, setLat] = useState("0");
  const [lng, setLng] = useState("0");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [update, setUpdate] = useState(false);

  const [addInfo, setAddInfo] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  async function getData() {
    const res =  await fetch("/api/test/");
    if(res.status === 200) {
      setData(await res.json());
      setError(false);
    } else {
      setError(true);
    }
  }

  console.log(data);

  useEffect(() => {
      getData();
  }, [update]);

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    if(name && lat && lng && !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))) {
      const res =  await fetch("/api/test/", {
        method: "POST",
        body: JSON.stringify({ name, lat, lng }),
      })
      const data = await res.json();
      setUpdate(!update);
      setAddInfo("Successfully added location");
      setTimeout(() => setAddInfo(""), 2500);
    } else {
      setAddInfo("Location incorrectly formatted");
          setTimeout(() => setAddInfo(""), 2500);
    }
  };

  async function handleLogin(e:React.FormEvent) {
    e.preventDefault();
    if(userName && password && email) {
      setLoggedIn(true);
    }
  }

  if(loggedIn) {
  if(error) {
  return (
    <main className="bg-blue-950 font-san min-h-screen flex justify-center flex-col items-center gap-5">
      <h1 className="text-xl font-semibold">Saved Locations:</h1>
      <div className="bg-red-600 rounded-lg w-110 h-15 flex items-center justify-center">
        <h1 className="text-xl font-semibold">Error loading data</h1>
      </div>
      <p>Failed to fetch data from API-route</p>
    </main>
  );
  }

  return (
    <main className="bg-blue-950 font-san flex justify-center flex-col items-center gap-5 min-h-screen p-25">
      <h1  className="text-xl font-semibold">Saved Locations:</h1>
      <div className="flex items-center justify-center flex-auto flex-wrap">
      {data?.map((location) => (
        <Card key={location.id} location={location} onChange={() => setUpdate(!update)} setAddInfo={setAddInfo} />
      ))}
      </div>
      <div className = {`${addInfo ? "bg-blue-600" : "bg-transparent"} rounded-lg w-80 h-15 flex items-center justify-center`}>
        <p>{addInfo}</p>
      </div>
      <form onSubmit={handleSubmit} id="add-form" name="add-form">
        <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
        <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className="m-2 p-2 mb-10 rounded-lg bg-blue-900 w-80 lg:w-60"/>
        <input onChange={(e)=>setLat(e.target.value)} type="text" placeholder="Latitude" className="m-2 p-2 mb-10 rounded-lg bg-blue-900 w-80 lg:w-60"/>
        <input onChange={(e)=>setLng(e.target.value)} type="text" placeholder="Longitude" className="m-2 p-2 mb-10 rounded-lg bg-blue-900 w-80 lg:w-60"/>
        </div>
        <button className="bg-blue-600 p-5 rounded-lg hover:bg-blue-700 active:bg-blue-800 block m-auto w-80 lg:w-60">Add Location</button>
      </form>
      <p>Data from API-route</p>
    </main>
  );
} else {
  return (
      <main className="bg-blue-950 font-san min-h-screen flex justify-center flex-col items-center">
        <div className="bg-blue-900 p-5 rounded-lg m-2 w-80 h-80 flex flex-col items-center justify-self-center">
          <div className="flex flex-wrap items-center h-40 gap-2">
            <input onChange={(e)=>setUserName(e.target.value)} value={name} type="text" placeholder="Username" className="p-2 rounded-lg bg-blue-950 w-70 h-8"/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="p-2 rounded-lg bg-blue-950 w-70 h-8"/>
          </div>
        <div className="flex flex-wrap items-center h-40 gap-2">
          <button type="submit" className="bg-blue-600 p-5 rounded-lg hover:bg-blue-700 active:bg-blue-800 block m-auto w-70">Login</button>
        </div>
        </div>
      </main>
  );
}

function Card({
  location,
  onChange,
  setAddInfo,
}: {
  location: { id: number; name: string; lat: number; lng: number }, 
  onChange: () => void,
  setAddInfo: (info: string) => void
}) { 
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState(location.name);
  const [lat, setLat] = useState(location.lat + "");
  const [lng, setLng] = useState(location.lng + "");

  const [info, setInfo] = useState("");

  async function handleDelete(id:number) {
    const res = await fetch("/api/test?id=" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setAddInfo("Successfully deleted location");
    setTimeout(() => setAddInfo(""), 2500);
    onChange()  
  }

  async function handleEdit(id:number) {
    setEditing(true);
    onChange();
  }

  async function confirmEdit(id:number) {
    if(name && lat && lng && !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))) {
    setEditing(false);
    const res = await fetch("/api/test?id=" + id, {
      method: "PUT",
      body: JSON.stringify({ name: name, lat: lat, lng: lng }),
    });
    const data = await res.json();
    onChange();
    setInfo("Successfully edited location");
    setTimeout(() => setInfo(""), 2500);
    } else {
    setInfo("Edit incorrectly formatted");
    setTimeout(() => setInfo(""), 2500);
    }
  }

  async function handleCancel(id:number) {
    setEditing(false);
    onChange();
  }

  if(editing) {
    return (
      <div key ={location.id} className="bg-blue-900 p-5 rounded-lg m-2 w-80 h-80 flex flex-col items-center gap-5 justify-self-center">
        <div className="flex flex-wrap items-center h-30 gap-2">
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name" className="p-2 rounded-lg bg-blue-950 w-70 h-8"/>
          <input onChange={(e)=>setLat(e.target.value)} value={lat} type="text" placeholder="Latitude" className="p-2 rounded-lg bg-blue-950 w-70 h-8"/>
          <input onChange={(e)=>setLng(e.target.value)} value={lng} type="text" placeholder="Longitude" className="p-2 rounded-lg bg-blue-950 w-70 h-8"/>
        </div>
        <div className="flex flex-wrap items-center h-30 gap-2">
          <div className={`${info ? "bg-blue-950" : "bg-transparent"} w-70 rounded-lg h-10 flex items-center justify-center`}>
            <p>{info}</p>
          </div>
          <button onClick={() => confirmEdit(location.id)} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 w-70">Confirm</button>
          <button onClick={() => handleCancel(location.id)} className="bg-red-600 p-2 rounded-lg hover:bg-red-700 active:bg-red-800 w-70">Cancel</button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-blue-900 p-5 rounded-lg m-2 w-80 h-80 flex flex-col items-center gap-5 justify-self-center">
      <div className="flex flex-wrap items-center h-30 gap-2">
        <div className="w-70">
          <h1 className="text-xl font-semibold">{location.name}</h1>
        </div>
        <div className="w-70">
          <p>Latitude: {location.lat}</p>
        </div>
        <div className="w-70">
          <p>Longitude: {location.lng}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center h-30 gap-2">
        <div className={`${info ? "bg-blue-950" : "bg-transparent"} w-70 rounded-lg h-10 flex items-center justify-center`}>
          <p>{info}</p>
        </div>
      <button onClick={() => handleEdit(location.id)} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 w-70">Edit</button>
      <button onClick={() => handleDelete(location.id)} className="bg-red-600 p-2 rounded-lg hover:bg-red-700 active:bg-red-800 w-70">Delete</button>
      </div>
    </div>
  )
}
}