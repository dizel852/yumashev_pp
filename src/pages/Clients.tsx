import { useNavigate } from "react-router-dom"
import { IconBrandInstagram, IconBrandTelegram, IconBrandWhatsapp, IconCalendarStats, IconMail, IconPhone, IconUser, IconWeight } from "@tabler/icons-react"
import { clients } from "@/data/clients"

export function Clients() {
  const navigate = useNavigate()

  return (
    <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Add Client
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconUser className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">{client.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <IconWeight className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{client.calories} kcal</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <IconMail className="h-4 w-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <IconPhone className="h-4 w-4" />
                  <span>{client.telephone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href={`https://wa.me/${client.viber.replace(/[^0-9]/g, '')}`}
                    className="text-muted-foreground hover:text-green-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconBrandWhatsapp className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://instagram.com/${client.instagram.substring(1)}`}
                    className="text-muted-foreground hover:text-pink-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconBrandInstagram className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://t.me/${client.telegram.substring(1)}`}
                    className="text-muted-foreground hover:text-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconBrandTelegram className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <IconCalendarStats className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.numberOfRationDeliveries} deliveries</span>
                </div>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add menu functionality here
                  }}
                >
                  •••
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}