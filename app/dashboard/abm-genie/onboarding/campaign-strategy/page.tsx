'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, ArrowRight, BrainCircuit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { TextStream } from '@/components/abm-genie/textStream';

// Define the type for a campaign strategy element
type Strategy = {
  id: number;
  accountId: number;
  accountName: string;
  messaging: string;
  contentType: string;
  channel: string;
  timeline: string;
  reasoning: string;
};

export default function Step4() {
  const router = useRouter();

  // Populated strategies array with AI-generated messages and channel recommendations
  const strategies: Strategy[] = [
    {
      id: 1,
      accountId: 1,
      accountName: 'InnovateTech Solutions',
      messaging: "Hi [Contact Name], Noticed InnovateTech's impressive growth! For scaling SaaS companies like yours, operational bottlenecks can be a major challenge. Acme.corp specializes in unifying disparate systems to unlock next-level efficiency. Would you be open to a quick chat about how we're helping peers?",
      contentType: 'Personalized Message',
      channel: 'LinkedIn',
      timeline: '2025-06-10',
      reasoning: 'LinkedIn is ideal for professional, value-driven outreach. The message highlights their growth and a common pain point (bottlenecks) for their industry, immediately positioning Acme.corp as a relevant solution. It\'s direct but non-intrusive, focusing on a problem-solution narrative suitable for the platform\'s professional context.'
    },
    {
      id: 2,
      accountId: 1,
      accountName: 'Global Logistics Co.',
      messaging: "Dear [Contact Name],\n\nAt Acme.corp, we've observed that high-growth software firms often grapple with fragmented data and manual processes hindering true scalability. Our platform helps companies like Global Logistics Co. centralize operations, automate workflows, and gain a unified view of their business.\n\nWe believe we could significantly accelerate your growth trajectory. Would you be available for a brief discovery call next week to explore how?\n\nBest regards,\n[Your Name]",
      contentType: 'Direct Email',
      channel: 'Email',
      timeline: '2025-06-12',
      reasoning: 'Email allows for a more detailed value proposition and a formal tone. The subject line is personalized and benefit-oriented. The body elaborates on the core problem and how Acme.corp\'s solution directly addresses it for a company in their growth stage, offering a clear call to action and space for deeper explanation.'
    },
    {
      id: 3,
      accountId: 1,
      accountName: 'MediCare Innovations',
      messaging: "Hi [Contact Name], Quick thought: Given MediCare Innovations Solutions' focus on development, are you finding it challenging to get real-time visibility across all your project management systems? Acme.corp's integrations could offer a streamlined view. Let me know if that resonates!",
      contentType: 'Casual Message',
      channel: 'Slack',
      timeline: '2025-06-13',
      reasoning: 'Slack is for informal, direct communication, often implying some existing relationship or warm lead. The message is concise, asks a pertinent question related to their likely challenges (project visibility), and directly links their challenge to Acme.corp\'s core offering. It\'s designed for quick, casual engagement.'
    },
    {
      id: 4,
      accountId: 1,
      accountName: 'Omni Retail Group',
      messaging: "Hey [Contact Name]! Hope you're well. Heard Omni Retail Group is looking to streamline their dev ops. Acme.corp has some interesting insights on achieving end-to-end visibility. Would you be open to a 10-min chat? Or perhaps connect me with the right person?",
      contentType: 'Informal Outreach',
      channel: 'WhatsApp',
      timeline: '2025-06-15',
      reasoning: 'WhatsApp implies a more personal or referral-based connection. The tone is friendly and conversational, mentioning a specific challenge relevant to their industry (dev ops streamlining) and offering a low-commitment next step. It leverages the immediacy and personal nature of the platform.'
    },
    {
      id: 5,
      accountId: 1,
      accountName: 'FinServe Connect',
      messaging: "Hi [Contact Name], For software innovators like FinServe Connect, secure and compliant data management and seamless integration across tools are paramount. Acme.corp offers a robust solution designed to meet stringent industry standards while enhancing operational efficiency. Interested in a brief overview?",
      contentType: 'Concise Pitch',
      channel: 'Telegram',
      timeline: '2025-06-16',
      reasoning: 'Telegram can be effective for direct, professional messages if it\'s a preferred channel for the target. The message immediately addresses critical concerns for a software development company (security, compliance, integration) and positions Acme.corp as a relevant, industry-aware provider, suitable for a quick, impactful message.'
    },
  ];

  const handleBack = () => {
    router.push('/dashboard/abm-genie/onboarding/account-research');
  }
  const [showBadge, setShowBadge] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

                  useEffect(() => {
                    const timer = setTimeout(() => setShowBadge(true), 10000);
                    return () => clearTimeout(timer);
                  }, []);

  const handleClickNext = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/dashboard/abm-genie/onboarding/personalization')
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
          <CardTitle className="text-2xl text-gray-800">
            Campaign Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="messaging" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-12 bg-gray-100 rounded-lg">
              <TabsTrigger
                value="messaging"
                className=" data-[state=active]:bg-primary data-[state=active]:text-white rounded-md"
              >
                Messaging
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className=" data-[state=active]:bg-primary data-[state=active]:text-white rounded-md"
              >
                Content Types
              </TabsTrigger>
              <TabsTrigger
                value="channels"
                className=" data-[state=active]:bg-primary data-[state=active]:text-white rounded-md"
              >
                Channels
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className=" data-[state=active]:bg-primary data-[state=active]:text-white rounded-md"
              >
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="messaging" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                {strategies.map((strategy) => (
                  <AccordionItem
                    key={strategy.id}
                    value={`item-${strategy.id}`}
                    className="border-b"
                  >
                    <AccordionTrigger className="flex justify-between items-center py-4 px-4 hover:bg-gray-50 transition-colors duration-200  text-gray-700 rounded-t-md">
                      <span>{strategy.accountName}</span>{" "}
                      <span className={`flex gap-2`}>{strategy.channel}</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white border-t border-gray-200 rounded-b-md">
                      <h4 className="font-semibold mb-2">
                        Recommended Message:
                      </h4>
                      <Textarea
                        defaultValue={strategy.messaging}
                        className="min-h-[100px] border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-400"
                      />
                      <h4 className="font-semibold mt-4 mb-2 flex">
                        {" "}
                        <BrainCircuit className="animate-pulse w-4 h-4" />
                        AI Reasoning:
                      </h4>
                      <TextStream text={strategy.reasoning} />
                      {showBadge && (
                        <div className="mt-3">
                          <Badge
                            className="border-green-400 bg-green-100"
                            variant="outline"
                          >
                            confidence: 96%
                          </Badge>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">
                      Account
                    </TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                      Content Type
                    </TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 rounded-tr-lg">
                      Channel
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strategies.map((strategy) => (
                    <TableRow
                      key={strategy.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.accountName}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.contentType}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.channel}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="channels" className="mt-6">
              <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">
                      Account
                    </TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                      Channel
                    </TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 rounded-tr-lg">
                      Messaging Type
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strategies.map((strategy) => (
                    <TableRow
                      key={strategy.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.accountName}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.channel}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.contentType}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="timeline" className="mt-6">
              <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">
                      Date
                    </TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                      Account
                    </TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                      Action
                    </TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 rounded-tr-lg">
                      Channel
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strategies.map((strategy) => (
                    <TableRow
                      key={strategy.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.timeline}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.accountName}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-800">
                        Send {strategy.contentType}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-800">
                        {strategy.channel}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
          <Button
            onClick={handleClickNext}
            className="w-full h-12 mt-3"
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