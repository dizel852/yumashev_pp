import { addDays } from "date-fns"
import { IconAlertTriangle, IconCalendar, IconCalendarTime } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { clientsWithLowDeliveries, getDeliveriesForDate, getDailyDeliveryCounts } from "@/data/deliveries"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function DeliveryList({ date, title }: { date: Date; title: string }) {
  const deliveries = getDeliveriesForDate(date)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconCalendarTime className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold">{title}</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {deliveries.length} deliveries
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="font-medium">{delivery.clientName}</TableCell>
              <TableCell className="text-right">{delivery.calories} kcal</TableCell>
              <TableCell className="text-right">
                <Link
                  to={`/clients/${delivery.clientId}`}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {deliveries.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                No deliveries scheduled
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}

function LowDeliveriesCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconAlertTriangle className="h-5 w-5 text-orange-500" />
          <h2 className="font-semibold">Low Deliveries Alert</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {clientsWithLowDeliveries.length} clients
        </span>
      </div>
      <div className="space-y-4">
        {clientsWithLowDeliveries.map((client) => (
          <div
            key={client.id}
            className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
          >
            <div className="space-y-1">
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-orange-500">
                {client.remainingDeliveries} deliveries remaining
              </p>
              {client.nextDeliveryDate && (
                <p className="text-sm text-muted-foreground">
                  Next delivery: {client.nextDeliveryDate.toLocaleDateString()}
                </p>
              )}
            </div>
            <Link
              to={`/clients/${client.id}`}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </Card>
  )
}

function DeliveryChart() {
  const data = getDailyDeliveryCounts(14)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconCalendar className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold">Delivery Statistics (Last 14 Days)</h2>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}`}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.5rem',
              }}
              formatter={(value: number) => [`${value} deliveries`, 'Count']}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export function Dashboard() {
  const today = new Date()
  const tomorrow = addDays(today, 1)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <DeliveryList date={today} title="Today's Deliveries" />
        <DeliveryList date={tomorrow} title="Tomorrow's Deliveries" />
      </div>
      <LowDeliveriesCard />
      <DeliveryChart />
    </div>
  )
}