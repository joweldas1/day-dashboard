/**
 * Browser Desktop Notifications helper.
 */

export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const result = await Notification.requestPermission();
    return result === 'granted';
  }
  return false;
}

export function sendBlockChangeNotification(block) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const title = `Now: ${block.title}`;
    const options = {
      body: `${block.start} - ${block.end}${block.note ? ` • ${block.note}` : ''}`,
      icon: '/favicon.svg',
      silent: true // Audio chime can handle sound separately
    };
    new Notification(title, options);
  } catch (e) {
    console.warn('Failed to send notification', e);
  }
}
