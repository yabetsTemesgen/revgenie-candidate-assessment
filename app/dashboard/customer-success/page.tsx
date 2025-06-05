import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

export default function CustomerSuccessGenie() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Success Genie</h1>
        <p className="text-muted-foreground">
          Enhance customer satisfaction and reduce churn with AI-powered insights.
        </p>
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
            <h3 className="text-lg font-medium mb-2">We're building something amazing!</h3>
            <p className="text-muted-foreground">
              The Customer Success Genie is currently in development. Soon you'll be able to predict customer needs,
              automate support responses, and identify at-risk accounts before they churn.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
