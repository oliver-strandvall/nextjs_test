"use client";

import React, { useCallback, useEffect, useState } from "react";
import { registerNotificationHandler } from "../../lib/notifications";

type Message = { id: number; type: "info" | "error"; text: string };

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const remove = useCallback((id: number) => {
    setMessages((m) => m.filter((x) => x.id !== id));
  }, []);

  const add = useCallback((payload: { type: "info" | "error"; text: string; duration?: number }) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setMessages((m) => [...m, { id, type: payload.type, text: payload.text }]);
    const d = payload.duration ?? (payload.type === "error" ? 4000 : 3000);
    setTimeout(() => remove(id), d);
  }, [remove]);

  useEffect(() => {
    registerNotificationHandler(add);
    return () => registerNotificationHandler(null);
  }, [add]);

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-sm w-full px-4 py-2 rounded shadow-lg text-white flex items-center gap-3 ${m.type === 'info' ? 'bg-green-600' : 'bg-red-600'}`}>
            <div className="flex-1">{m.text}</div>
            <button onClick={() => remove(m.id)} className="opacity-80 hover:opacity-100">✕</button>
          </div>
        ))}
      </div>
    </>
  );
}
