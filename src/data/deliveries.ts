import { addDays, format, startOfDay } from "date-fns"

export interface Delivery {
  id: string
  clientId: string
  clientName: string
  date: Date
  calories: number
  status: 'scheduled' | 'delivered' | 'cancelled'
  address: string
}

export interface ClientDeliveryStatus {
  id: string
  name: string
  remainingDeliveries: number
  calories: number
  nextDeliveryDate?: Date
}

// Helper to generate dates for mock data
const today = startOfDay(new Date())

// Helper function to generate random number between min and max
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Past deliveries for chart data
export const pastDeliveries: Delivery[] = Array.from({ length: 60 }, (_, dayIndex) => {
  const deliveriesPerDay = getRandomInt(30, 70)
  return Array.from({ length: deliveriesPerDay }, (_, deliveryIndex) => ({
    id: `past-${dayIndex}-${deliveryIndex + 1}`,
    clientId: `${(deliveryIndex % 10) + 1}`,
    clientName: ["John Doe", "Emma Wilson", "Michael Brown", "Sarah Davis", "Alex Turner", "Lisa Chen", "Sophia Martinez", "James Wilson", "Olivia Thompson", "Ethan Anderson"][deliveryIndex % 10],
    date: addDays(today, -dayIndex),
    calories: 1800 + (Math.random() * 1000),
    status: 'delivered',
    address: "123 Sample St",
  }))
}).flat()

export const deliveries: Delivery[] = [
  // Today's deliveries
  {
    id: "1",
    clientId: "1",
    clientName: "John Doe",
    date: today,
    calories: 2000,
    status: 'scheduled',
    address: "123 Main St, Apt 4B",
  },
  {
    id: "2",
    clientId: "2",
    clientName: "Emma Wilson",
    date: today,
    calories: 1800,
    status: 'scheduled',
    address: "456 Oak Ave",
  },
  {
    id: "5",
    clientId: "5",
    clientName: "Alex Turner",
    date: today,
    calories: 2200,
    status: 'scheduled',
    address: "789 Maple Dr",
  },
  {
    id: "8",
    clientId: "8",
    clientName: "Sophia Martinez",
    date: today,
    calories: 1900,
    status: 'scheduled',
    address: "321 Cedar Ln",
  },
  {
    id: "9",
    clientId: "9",
    clientName: "James Wilson",
    date: today,
    calories: 2400,
    status: 'scheduled',
    address: "654 Birch Rd",
  },
  // Tomorrow's deliveries
  {
    id: "3",
    clientId: "3",
    clientName: "Michael Brown",
    date: addDays(today, 1),
    calories: 2500,
    status: 'scheduled',
    address: "789 Pine Rd",
  },
  {
    id: "4",
    clientId: "4",
    clientName: "Sarah Davis",
    date: addDays(today, 1),
    calories: 1600,
    status: 'scheduled',
    address: "321 Elm St",
  },
  {
    id: "6",
    clientId: "6",
    clientName: "Lisa Chen",
    date: addDays(today, 1),
    calories: 1900,
    status: 'scheduled',
    address: "987 Spruce Ave",
  },
  {
    id: "10",
    clientId: "10",
    clientName: "Olivia Thompson",
    date: addDays(today, 1),
    calories: 2100,
    status: 'scheduled',
    address: "147 Willow Way",
  },
  {
    id: "11",
    clientId: "11",
    clientName: "Ethan Anderson",
    date: addDays(today, 1),
    calories: 2300,
    status: 'scheduled',
    address: "258 Aspen Ct",
  },
  ...pastDeliveries,
]

export const clientsWithLowDeliveries: ClientDeliveryStatus[] = [
  {
    id: "5",
    name: "Alex Turner",
    remainingDeliveries: 1,
    calories: 2200,
    nextDeliveryDate: addDays(today, 3),
  },
  {
    id: "6",
    name: "Lisa Chen",
    remainingDeliveries: 2,
    calories: 1900,
    nextDeliveryDate: addDays(today, 2),
  },
  {
    id: "7",
    name: "David Park",
    remainingDeliveries: 0,
    calories: 2300,
  },
]

// Helper function to get deliveries for specific date
export function getDeliveriesForDate(date: Date): Delivery[] {
  const targetDate = startOfDay(date)
  return deliveries.filter(d => 
    startOfDay(d.date).getTime() === targetDate.getTime() && 
    d.status === 'scheduled'
  )
}

// Helper function to get daily delivery counts for chart
export function getDailyDeliveryCounts(days: number = 14): { date: string; count: number }[] {
  const counts = new Map<string, number>()
  
  // Initialize all dates with 0
  for (let i = 0; i < days; i++) {
    const date = format(addDays(today, -i), 'MMM d')
    counts.set(date, 0)
  }

  // Count deliveries
  deliveries.forEach(delivery => {
    const date = format(delivery.date, 'MMM d')
    if (counts.has(date)) {
      counts.set(date, (counts.get(date) || 0) + 1)
    }
  })

  return Array.from(counts.entries())
    .map(([date, count]) => ({ date, count }))
    .reverse()
}

// Helper function to get planned delivery dates for a client
export function getPlannedDeliveryDates(clientId: string, totalDeliveries: number): Date[] {
  const today = startOfDay(new Date())
  const dates: Date[] = []
  
  // Generate dates for the next 90 days to ensure we have enough dates for all deliveries
  for (let i = 0; i < 90 && dates.length < totalDeliveries; i++) {
    const date = addDays(today, i)
    // Only add dates that have deliveries scheduled
    if (getDeliveriesForDate(date).some(d => d.clientId === clientId)) {
      dates.push(date)
    }
  }
  
  // If we don't have enough dates, generate additional dates
  if (dates.length < totalDeliveries) {
    const remainingDeliveries = totalDeliveries - dates.length
    const lastDate = dates[dates.length - 1] || today
    
    for (let i = 0; i < remainingDeliveries; i++) {
      const date = addDays(lastDate, i + 1)
      dates.push(date)
    }
  }
  
  return dates
} 