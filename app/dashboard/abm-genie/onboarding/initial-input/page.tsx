'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { ArrowRight, Sparkles, Target, Upload } from 'lucide-react';

const formSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  abmGoal: z.enum(['lead-gen', 'brand', 'expansion'], { required_error: 'Please select a goal' }).optional(),
});

export default function Step1() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { companyName: '', website: '', linkedin: '', abmGoal: undefined },
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log(data)
     setTimeout(() => {

      // Simulate a delay for processing
     router.push('/dashboard/abm-genie/onboarding/processing')
     }, 3000);
  };
  

  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="relative w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white absolute" />
            <div className="w-6 h-6 border-t-2 border-l-2 border-white rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold">Account Based Marketing Genie</h1>
        </div>
        <p className="text-muted-foreground">
          Let's set up your marketing genie to achieve your business goals
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 text-purple-500 mr-2" />
            What's your business goal?
          </CardTitle>
          <CardDescription>
            Tell us what you're trying to achieve with your accounts. Be
            specific about metrics if possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company name"
                        {...field}
                        className="border-black/20 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="https://example.com/..."
                        type="url"
                        {...field}
                        className="border-black/20 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/company/..."
                        type="url"
                        {...field}
                        className="border-black/20 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="abmGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary ABM Goal</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="border-black/20 h-12">
                          <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="p-3">
                        <SelectItem value="lead-gen">
                          Lead Generation
                        </SelectItem>
                        <SelectItem value="brand">Brand Awareness</SelectItem>
                        <SelectItem value="expansion">
                          Account Expansion
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Upload Target Account List (CSV)</FormLabel>
                <div className="flex items-center space-x-2">
                  <Button asChild variant="outline">
                    <label htmlFor="file-upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </label>
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={onFileChange}
                  />
                  <span>{fileName || "No file selected"}</span>
                </div>
              </FormItem>
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          ABM Genie will analyze your business goal and create a personalized
          content strategy to help you achieve it.
        </p>
      </div>
    </div>
  );
}