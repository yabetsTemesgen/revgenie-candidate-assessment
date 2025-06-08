'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter
} from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowRight, BrainCircuit, Pencil, Plus, Sparkles, Trash2Icon } from 'lucide-react';
import { TextStream } from '@/components/abm-genie/textStream';

const accountSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  industry: z.string().min(1, 'Industry is required'),
});

type Account = {
  id: number;
  name: string;
  industry: string;
  revenue: string;
  score: number;
  reasoning: string;
  priority: string;
};

export default function Step3() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([
      {
        id: 1,
        name: 'InnovateTech Solutions',
        industry: 'Software Development',
        revenue: '+$200M',
        score: 92,
        reasoning: 'This account is identified as a prime candidate due to its rapid growth in the SaaS sector, indicating a strong need for scalable operational efficiency solutions which Acme.corp specializes in. Their large employee base suggests complex internal processes that our platform can streamline.',
        priority: 'High'
      },
    {
        id: 2,
        name: 'Global Logistics Co.',
        industry: 'Transportation & Logistics',
        revenue: '+$300M',
        score: 88,
        reasoning: 'Global Logistics Co. is a strategic fit due to its operational complexity and reliance on diverse systems. Acme.corp\'s solutions can provide critical integration and data insights, addressing inefficiencies inherent in their large-scale, multi-faceted operations.',
        priority: 'Medium'
      },
    {
        id: 3,
        name: 'MediCare Innovations',
        industry: 'Healthcare Technology',
        revenue: '+$100M',
        score: 90,
        reasoning: 'MediCare Innovations is prioritized due to the healthcare industry\'s increasing digital transformation needs and strict compliance requirements. Acme.corp\'s secure and robust SaaS offering can directly support their regulatory adherence and enhance patient data management.',
        priority: 'Low'
      },
    {
        id: 4,
        name: 'Omni Retail Group',
        industry: 'E-commerce & Retail',
        revenue: '+$100M',
        score: 85,
        reasoning: 'Omni Retail Group presents significant opportunity due to its high transaction volumes and customer engagement focus. Acme.corp\'s platform can optimize their sales funnels and enhance customer journey analytics, directly impacting their bottom line and market reach.',
        priority: 'Medium'
      },
    {
        id: 5,
        name: 'FinServe Connect',
        industry: 'Financial Services',
        revenue: '+$100M',
        score: 95,
        reasoning: 'FinServe Connect is a high-value target given the financial sector\'s demand for advanced security, automation, and precise data management. Acme.corp\'s enterprise-grade SaaS is positioned to deliver substantial improvements in their risk management and client service operations.',
        priority: 'High'
      },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<number | null>(null);
  const [isSubmitting,setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: { id: undefined, name: '', industry: '' },
  });

  const onEdit = (account: Account) => {
    setEditingAccountId(account.id);
    form.setValue('id', account.id);
    form.setValue('name', account.name);
    form.setValue('industry', account.industry);
    setIsEditOpen(true);
  };

  const onSubmit = (data: z.infer<typeof accountSchema>) => {
    if (data.id) {
      setAccounts(
        accounts.map((account) =>
          account.id === data.id ? { ...account, name: data.name, industry: data.industry } : account,
        ),
      );
      setIsEditOpen(false);
    } else {
      setAccounts([
        ...accounts,
        {
          id: accounts.length + 1,
          name: data.name,
          industry: data.industry,
          revenue: '-',
          score: 50,
          reasoning: 'Manually added',
          priority: '-'
        },
      ]);
      setIsAddOpen(false);
    }
    form.reset();
  };

  const onRemove = (id: number) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };
  
  const handleBack = () => {
    router.push('/dashboard/abm-genie/onboarding/initial-input');
  };
  
  const handleClickNext = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/dashboard/abm-genie/onboarding/campaign-strategy')
    }, 3000);
  };
    
  return (
    <div className="w-full">
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between w-full">
          <CardTitle>Target Accounts</CardTitle>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Account</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Reasoning</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.industry}</TableCell>
                  <TableCell>{account.revenue}</TableCell>
                  <TableCell>
                    <Badge
                      variant={account.score > 90 ? "default" : "secondary"}
                    >
                      {account.score}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.priority}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost">
                            <Sparkles className="text-primary" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="h-auto w-96 bg-primary text-white rounded-lg">
                          <BrainCircuit className="w-4 h-4 text-white animate-pulse" />
                          <TextStream text={account.reasoning} />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="flex">
                    <Dialog
                      open={isEditOpen && editingAccountId === account.id}
                      onOpenChange={(open) => {
                        setIsEditOpen(open);
                        if (!open) setEditingAccountId(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" onClick={() => onEdit(account)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Account</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                          >
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="industry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Industry</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Save</Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost">
                          <Trash2Icon className="w-4 h-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove {account.name} from the
                            target accounts list.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onRemove(account.id)}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={handleClickNext}
            className="w-full h-12"
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