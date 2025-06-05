import { AuthForm } from "@/components/auth";
import { AuthProvider } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthTest } from "@/components/auth-test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthTestPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <AuthProvider>
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Authentication Test</h1>
              <p className="text-muted-foreground mt-2">
                Test the authentication system with different UI components
              </p>
            </div>
            
            <Tabs defaultValue="styled" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="styled">Styled Components</TabsTrigger>
                <TabsTrigger value="test">Test Interface</TabsTrigger>
              </TabsList>
              
              <TabsContent value="styled" className="mt-6">
                <div className="flex justify-center">
                  <AuthForm />
                </div>
              </TabsContent>
              
              <TabsContent value="test" className="mt-6">
                <AuthTest />
              </TabsContent>
            </Tabs>
          </div>
        </AuthProvider>
      </div>
    </div>
  );
}
