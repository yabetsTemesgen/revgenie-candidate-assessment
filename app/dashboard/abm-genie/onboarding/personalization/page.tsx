"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  tone: z.enum(
    ["professional", "casual", "formal", "authoritative", "friendly"],
    { required_error: "Please select a tone" }
  ),
  brandVoice: z.string().min(1, "Brand voice is required"),
  template: z.string().min(1, "Template is required"),
  autoApproval: z.boolean(),
});

export default function Personalization() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tone: "professional",
      brandVoice: `Acme.corp's brand voice is:
1. Authoritative & Knowledgeable: Position us as experts in B2B SaaS solutions.
2. Client-Centric: Emphasize benefits and solutions for the client's specific needs.
3. Innovative: Highlight our cutting-edge technology and forward-thinking approach.`,
      template: `Subject: Elevating Your [Industry] Operations with Acme.corp

Dear [Contact Name],

We've been closely following [Company Name]'s impressive work in the [Company Industry] sector, particularly your focus on [Specific Area of Interest/Challenge].

At Acme.corp, we specialize in providing [mention 1-2 core benefits of Acme.corp's solution, e.g., 'scalable operational efficiency' or 'unified data insights'] for companies like yours. We believe our [Specific Feature/Approach] could significantly impact your [Relevant KPI/Goal].

Would you be open to a brief, 15-minute discussion to explore how Acme.corp can support [Company Name]'s strategic objectives?

Best regards,

[Your Name]
[Your Title]
Acme.corp`,
      autoApproval: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Data:", data);
  };
  const handleBack = () => {
    router.push("/dashboard/abm-genie/onboarding/campaign-strategy");
  };

  const handleClickNext = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard/abm-genie/onboarding/review-launch");
    }, 3000);
  };
  return (
    <div>
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="rounded-xl shadow-lg">
        <CardHeader className="bg-gray-50 p-6 rounded-t-xl">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Personalization Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {" "}
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      Tone Preference
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="authoritative">
                          Authoritative
                        </SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <p className="text-gray-600 text-sm mt-2 italic">
                      AI suggests a 'Professional' tone for B2B communications,
                      ensuring credibility and clear value proposition. This can
                      be adjusted based on specific campaign goals.
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandVoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      Brand Voice Guidelines
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter brand voice guidelines..."
                        className="min-h-[100px] border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-400 overflow-y-auto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-gray-600 text-sm mt-2 italic">
                      AI-generated guidelines based on Acme.corp's stated
                      mission and industry presence from Step 1. These define
                      the overarching personality of your communications.
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      Message Template
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter message template..."
                        className="min-h-[100px] border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-gray-600 text-sm mt-2 italic">
                      This template incorporates best practices for ABM
                      outreach, including personalization placeholders for easy
                      adaptation.
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autoApproval"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormLabel>Enable Auto-Approval</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Button
            onClick={handleClickNext}
            className="w-full h-12 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
