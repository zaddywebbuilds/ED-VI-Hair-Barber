import { businessConfig } from '../data/businessConfig';

export function useOpenStatus() {
  const now = new Date();
  const dayIndex = now.getDay(); // 0=Sun, 1=Mon, ...
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // maps JS day to config index
  const todayConfig = businessConfig.openingHours[dayMap[dayIndex]];

  if (!todayConfig || !todayConfig.open || !todayConfig.hours) {
    return { isOpen: false, todayHours: null, dayName: todayConfig?.day ?? '' };
  }

  const hours = todayConfig.hours.split('–').map((h: string) => h.trim());
  if (hours.length < 2) return { isOpen: false, todayHours: todayConfig.hours, dayName: todayConfig.day };

  const [openStr, closeStr] = hours;
  const toMinutes = (t: string) => {
    const [h, m] = t.replace('h', ':').split(':').map(Number);
    return h * 60 + (m || 0);
  };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMin = toMinutes(openStr);
  const closeMin = toMinutes(closeStr);

  return {
    isOpen: currentMinutes >= openMin && currentMinutes < closeMin,
    todayHours: todayConfig.hours,
    dayName: todayConfig.day,
  };
}
