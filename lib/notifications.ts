type MessageHandler = (payload: { type: 'info' | 'error'; text: string; duration?: number }) => void;

let handler: MessageHandler | null = null;

export function registerNotificationHandler(h: MessageHandler | null) {
  handler = h;
}

export function notify(type: 'info' | 'error', text: string, duration = 3000) {
  if (handler) handler({ type, text, duration });
}

export function info(text: string, duration = 3000) {
  notify('info', text, duration);
}

export function error(text: string, duration = 4000) {
  notify('error', text, duration);
}

export default { registerNotificationHandler, notify, info, error };
