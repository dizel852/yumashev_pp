import { useParams, useNavigate } from "react-router-dom"
import {
  IconArrowLeft,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconCalendarStats,
  IconMail,
  IconPhone,
  IconUser,
  IconWeight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns"

import { clients } from "@/data/clients"
import { getPlannedDeliveryDates } from "@/data/deliveries"
import { useState } from "react"

function Calendar({ plannedDates }: { plannedDates: Date[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const isDeliveryDay = (date: Date) => {
    return plannedDates.some(plannedDate => isSameDay(plannedDate, date))
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 hover:bg-muted rounded-md"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 hover:bg-muted rounded-md"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isDelivery = isDeliveryDay(day)
          
          return (
            <div
              key={day.toISOString()}
              className={`
                aspect-square p-2 text-center text-sm
                ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50'}
                ${isDelivery ? 'bg-primary text-primary-foreground rounded-md' : ''}
              `}
            >
              {format(day, 'd')}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ClientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const client = clients.find((c) => c.id === Number(id))

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Client not found</h1>
        <button
          onClick={() => navigate("/clients")}
          className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back to Clients
        </button>
      </div>
    )
  }

  // Get planned delivery dates
  const plannedDates = getPlannedDeliveryDates(id!, client.numberOfRationDeliveries)

  return (
    <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/clients")}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
        >
          <IconArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold">Client Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <IconUser className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{client.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <IconMail className="h-5 w-5 text-muted-foreground" />
              <a href={`mailto:${client.email}`} className="text-blue-500 hover:underline">
                {client.email}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <IconPhone className="h-5 w-5 text-muted-foreground" />
              <a href={`tel:${client.telephone}`} className="text-blue-500 hover:underline">
                {client.telephone}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={`https://wa.me/${client.viber.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center space-x-2 text-muted-foreground hover:text-green-500"
              >
                <IconBrandWhatsapp className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://instagram.com/${client.instagram.substring(1)}`}
                className="inline-flex items-center space-x-2 text-muted-foreground hover:text-pink-500"
              >
                <IconBrandInstagram className="h-5 w-5" />
                <span>{client.instagram}</span>
              </a>
              <a
                href={`https://t.me/${client.telegram.substring(1)}`}
                className="inline-flex items-center space-x-2 text-muted-foreground hover:text-blue-500"
              >
                <IconBrandTelegram className="h-5 w-5" />
                <span>{client.telegram}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Meal Plan Information */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Meal Plan Details</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <IconWeight className="h-5 w-5 text-orange-500" />
                <span className="text-muted-foreground">Daily Calories Target</span>
              </div>
              <span className="font-medium">{client.calories} kcal</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <IconCalendarStats className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Total Deliveries</span>
              </div>
              <span className="font-medium">{client.numberOfRationDeliveries}</span>
            </div>
          </div>
        </div>

        {/* Planned Deliveries */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Planned Deliveries</h2>
            <span className="text-sm text-muted-foreground">
              {plannedDates.length} of {client.numberOfRationDeliveries} deliveries scheduled
            </span>
          </div>
          <Calendar plannedDates={plannedDates} />
        </div>

        {/* Delivery History */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Delivery History</h2>
          <div className="text-muted-foreground text-sm">
            Delivery history will be displayed here...
          </div>
        </div>
      </div>
    </div>
  )
}