import { User } from "../types";

export const MOCK_DRIVER: User = {
  id: "DRV-001",
  valetId: "VA-2048",
  email: "ramesh.k@360valet.com",
  fullName: "Ramesh K.",
  role: "driver",
};

export const MOCK_LOCATION = {
  name: "JW Marriott Marquis",
  code: "JWMM-DXB",
};

export type QueueItem = {
  id: string;
  plate: string;
  car: string;
  detail: string;
  type: "return" | "park";
  time?: string;
  timeLabel?: string;
  zone?: string;
  slot?: string;
};

export const MOCK_QUEUE: QueueItem[] = [
  {
    id: "q1",
    plate: "DXB A 74126",
    car: "White Lexus LX",
    detail: "Return request · Zone B · Slot 42",
    type: "return",
    time: "08:32",
    timeLabel: "to arrive",
    zone: "B",
    slot: "42",
  },
  {
    id: "q2",
    plate: "DXB J 5580",
    car: "Black G63",
    detail: "To park · card 7204 active",
    type: "park",
  },
];

export type ReturnRequest = {
  id: string;
  guest: string;
  room: string;
  plate: string;
  car: string;
  zone: string;
  slot: string;
  cardNumber: string;
  requestedAt: string;
};

export const MOCK_RETURN_REQUEST: ReturnRequest = {
  id: "rr-001",
  guest: "Ahmed Al-Rashid",
  room: "Suite 1204",
  plate: "DXB A 74126",
  car: "White Lexus LX",
  zone: "B",
  slot: "42",
  cardNumber: "7204",
  requestedAt: "2 min ago",
};

export type PickupRequest = {
  id: string;
  guest: string;
  room: string;
  plate: string;
  car: string;
  zone: string;
  slot: string;
  cardNumber: string;
  status: "active" | "to_park" | "done";
  progress: number;
  timer?: string;
  timerLabel?: string;
  overdue?: boolean;
};

export const MOCK_PICKUP_REQUESTS: PickupRequest[] = [
  {
    id: "pr-001",
    guest: "Ahmed Al-Rashid",
    room: "Suite 1204",
    plate: "DXB A 74126",
    car: "White Lexus LX",
    zone: "B",
    slot: "42",
    cardNumber: "7204",
    status: "active",
    progress: 40,
    timer: "08:32",
    timerLabel: "to arrive",
  },
  {
    id: "pr-002",
    guest: "Sarah Johnson",
    room: "Room 812",
    plate: "DXB J 5580",
    car: "Black G63",
    zone: "A",
    slot: "18",
    cardNumber: "7205",
    status: "active",
    progress: 70,
    overdue: true,
  },
  {
    id: "pr-003",
    guest: "Omar Hassan",
    room: "Room 506",
    plate: "DXB B 12345",
    car: "Silver BMW 7",
    zone: "C",
    slot: "7",
    cardNumber: "7206",
    status: "to_park",
    progress: 0,
  },
  {
    id: "pr-004",
    guest: "Lisa Chen",
    room: "Suite 901",
    plate: "DXB C 99887",
    car: "Red Ferrari F8",
    zone: "A",
    slot: "3",
    cardNumber: "7207",
    status: "done",
    progress: 100,
  },
  {
    id: "pr-005",
    guest: "Mohammed Al-Farsi",
    room: "Room 304",
    plate: "DXB D 55667",
    car: "White Mercedes S",
    zone: "B",
    slot: "15",
    cardNumber: "7208",
    status: "done",
    progress: 100,
  },
];

export type HistoryItem = {
  id: string;
  plate: string;
  time: string;
  slot: string;
  period: "today" | "this_week" | "this_month";
};

export const MOCK_HISTORY: HistoryItem[] = [
  { id: "h1", plate: "DXB A 11223", time: "9:30 AM", slot: "A-14", period: "today" },
  { id: "h2", plate: "DXB B 44556", time: "10:15 AM", slot: "B-22", period: "today" },
  { id: "h3", plate: "DXB C 77889", time: "11:00 AM", slot: "C-08", period: "today" },
  { id: "h4", plate: "DXB D 11234", time: "2:45 PM", slot: "A-05", period: "today" },
  { id: "h5", plate: "DXB E 55678", time: "3:30 PM", slot: "B-11", period: "today" },
  { id: "h6", plate: "DXB A 99012", time: "Monday", slot: "C-19", period: "this_week" },
  { id: "h7", plate: "DXB B 33456", time: "Tuesday", slot: "A-07", period: "this_week" },
  { id: "h8", plate: "DXB C 66789", time: "Wednesday", slot: "B-16", period: "this_week" },
  { id: "h9", plate: "DXB D 22345", time: "Aug 1", slot: "C-03", period: "this_month" },
  { id: "h10", plate: "DXB E 66789", time: "Aug 3", slot: "A-21", period: "this_month" },
];

export type ProfileMenuItem = {
  label: string;
  hasToggle?: boolean;
  toggleDefault?: boolean;
};

export const MOCK_PROFILE_MENU: ProfileMenuItem[] = [
  { label: "Push notifications", hasToggle: true, toggleDefault: true },
  { label: "Location services", hasToggle: true, toggleDefault: true },
  { label: "Dark mode", hasToggle: true, toggleDefault: false },
  { label: "Change password" },
  { label: "Help & support" },
  { label: "Sign out" },
];
