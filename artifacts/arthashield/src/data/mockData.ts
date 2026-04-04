export const HUBS = [
  { id: 1, name: "Zepto Koramangala", city: "Bangalore", riskLevel: "HIGH", multiplier: 1.4, premium: 49, lat: 12.9352, lng: 77.6245 },
  { id: 2, name: "Zepto HSR Layout", city: "Bangalore", riskLevel: "MEDIUM", multiplier: 1.2, premium: 42, lat: 12.9116, lng: 77.6473 },
  { id: 3, name: "Zepto Whitefield", city: "Bangalore", riskLevel: "LOW", multiplier: 0.8, premium: 28, lat: 12.9698, lng: 77.7500 },
  { id: 4, name: "Blinkit Kurla", city: "Mumbai", riskLevel: "EXTREME", multiplier: 2.2, premium: 77, lat: 19.0728, lng: 72.8826 },
  { id: 5, name: "Zepto Andheri", city: "Mumbai", riskLevel: "MEDIUM", multiplier: 1.1, premium: 38, lat: 19.1136, lng: 72.8697 },
];

export const PLAN_TIERS = {
  BASIC: { name: "Basic", multiplier: 0.6, maxDay: 150, maxWeek: 450 },
  STANDARD: { name: "Standard", multiplier: 1.0, maxDay: 300, maxWeek: 900 },
  FULL: { name: "Full Cover", multiplier: 1.6, maxDay: 500, maxWeek: 1500 },
};

export const DEMO_CLAIMS = [
  { id: 1, type: "RAINFALL", emoji: "🌧️", label: "Rain disruption", zone: "Koramangala", amount: 120, fraudScore: 0.12, status: "PAID", time: "Today 3:02 PM" },
  { id: 2, type: "AQI", emoji: "🌫️", label: "AQI spike", zone: "Koramangala", amount: 60, fraudScore: 0.08, status: "PAID", time: "Yesterday 11:15 AM" },
  { id: 3, type: "ROUTE_BLOCK", emoji: "🚧", label: "Route blockage", zone: "Koramangala", amount: 180, fraudScore: 0.15, status: "PAID", time: "3 days ago" },
  { id: 4, type: "HUB_CLOSURE", emoji: "🏪", label: "Hub closure", zone: "Koramangala", amount: 180, fraudScore: 0.61, status: "SOFT_HOLD", time: "5 days ago" },
];

export const ADMIN_CLAIMS = [
  { id: 1, worker: "RK-0091", zone: "Koramangala", trigger: "Rainfall", amount: 120, fraudScore: 0.12, status: "PAID" },
  { id: 2, worker: "NG-0045", zone: "HSR Layout", trigger: "AQI", amount: 60, fraudScore: 0.09, status: "PAID" },
  { id: 3, worker: "VK-0233", zone: "Kurla", trigger: "Curfew", amount: 240, fraudScore: 0.71, status: "MANUAL_REVIEW" },
  { id: 4, worker: "AM-0189", zone: "Whitefield", trigger: "Rainfall", amount: 120, fraudScore: 0.58, status: "SOFT_HOLD" },
  { id: 5, worker: "RS-0312", zone: "Andheri", trigger: "Hub Closure", amount: 180, fraudScore: 0.11, status: "PAID" },
  { id: 6, worker: "PD-0078", zone: "Koramangala", trigger: "Route Block", amount: 180, fraudScore: 0.68, status: "MANUAL_REVIEW" },
  { id: 7, worker: "SK-0445", zone: "Kurla", trigger: "AQI", amount: 60, fraudScore: 0.14, status: "PAID" },
  { id: 8, worker: "MK-0567", zone: "HSR Layout", trigger: "Rainfall", amount: 120, fraudScore: 0.22, status: "PAID" },
];