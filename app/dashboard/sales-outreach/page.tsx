import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

export default function SalesOutreachGenie() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Outreach Genie</h1>
        <p className="text-muted-foreground">Automate and optimize your sales outreach campaigns.</p>
      </div>

      <Card className="border-dashed border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-muted-foreground">
            <Construction className="h-6 w-6 mr-2" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center max-w-md">
            <h3 className="text-lg font-medium mb-2">We're working on something special!</h3>
            <p className="text-muted-foreground">
              The Sales Outreach Genie is currently in development. Soon you'll be able to create personalized outreach
              campaigns, automate follow-ups, and track engagement - all powered by AI.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
