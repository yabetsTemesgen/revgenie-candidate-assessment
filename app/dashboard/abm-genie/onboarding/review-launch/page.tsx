'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle, Save } from 'lucide-react';

export default function Step6() {
const router = useRouter();

  // Dummy data for demonstration purposes, in a real application this would come
  // from a shared state, context, or API calls from previous steps.
  const abmSetupSummary = {
    companyName: 'Acme.corp',
    abmGoal: 'Increase enterprise client acquisition by 25% in Q3',
    targetAccounts: [
      { name: 'InnovateTech Solutions', score: 92, aiReasoning: 'Rapid growth in SaaS sector, high need for operational efficiency.' },
      { name: 'Global Logistics Co.', score: 88, aiReasoning: 'Complex operations, reliance on diverse systems benefits from integration.' },
      { name: 'MediCare Innovations', score: 90, aiReasoning: 'Healthcare industry\'s digital transformation and compliance needs.' },
      { name: 'Omni Retail Group', score: 85, aiReasoning: 'High transaction volumes, focus on customer engagement.' },
      { name: 'FinServe Connect', score: 95, aiReasoning: 'Financial sector demand for advanced security, automation, and data management.' },
    ],
    campaignStrategies: [
      { channel: 'LinkedIn', contentType: 'Personalized Message', account: 'InnovateTech Solutions' },
      { channel: 'Email', contentType: 'Direct Email', account: 'InnovateTech Solutions' },
      { channel: 'Slack', contentType: 'Casual Message', account: 'InnovateTech Solutions' },
      { channel: 'WhatsApp', contentType: 'Informal Outreach', account: 'InnovateTech Solutions' },
      { channel: 'Telegram', contentType: 'Concise Pitch', account: 'InnovateTech Solutions' },
    ],
    tonePreference: 'Professional',
    brandVoiceHighlights: `Authoritative & Knowledgeable, Client-Centric, Innovative, Clear & Concise, Trustworthy & Reliable.`,
    messageTemplate: `Subject: Elevating Your [Industry] Operations with Acme.corp...`, // Truncated for summary
    autoApprovalEnabled: false,
    aiConfidence: {
      overall: 89,
      targetAccounts: 95,
      campaignStrategy: 88,
      personalization: 85,
    },
  };

  const handleLaunchCampaign = () => {
    console.log('Campaign Launched!', abmSetupSummary);
    alert('Campaign launched successfully! Check the console for details.');
  };

  const handleSaveDraft = () => {
    console.log('Campaign Saved as Draft:', abmSetupSummary);
    alert('Campaign saved as draft! You can continue later.');
  };

  const handleBack = () => {
    router.push('/dashboard/abm-genie/onboarding/personalization');
  };

  return (
    <div>
       <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

    <Card className="rounded-xl shadow-lg">
      <CardHeader className="bg-gray-50 p-6 rounded-t-xl">
        <CardTitle className="text-2xl text-gray-800 flex items-center">
          Review & Launch
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="step1" className="border-b">
            <AccordionTrigger className="text-gray-700 hover:bg-gray-50 rounded-t-md p-4">Company Basics</AccordionTrigger>
            <AccordionContent className="p-4 bg-white border-t border-gray-200 rounded-b-md">
              <div className="text-gray-800">
                <p><span className="font-medium">Company Name:</span> {abmSetupSummary.companyName}</p>
                <p><span className="font-medium">Primary ABM Goal:</span> {abmSetupSummary.abmGoal}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step3" className="border-b">
            <AccordionTrigger className=" text-gray-700 hover:bg-gray-50 p-4">Target Accounts</AccordionTrigger>
            <AccordionContent className="p-4 bg-white border-t border-gray-200 rounded-b-md">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Account Name</TableHead>
                    <TableHead className="py-2 px-4 text-left text-sm font-semibold text-gray-700">AI Confidence</TableHead>
                    <TableHead className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Reasoning Highlight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {abmSetupSummary.targetAccounts.map((account) => (
                    <TableRow key={account.name} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="py-2 px-4 text-gray-800">{account.name}</TableCell>
                      <TableCell className="py-2 px-4">
                        <Progress value={account.score} className="w-[100px] h-2 bg-blue-200" indicatorClassName="bg-primary" />
                        <span className="text-xs text-gray-600 ml-2">{account.score}%</span>
                      </TableCell>
                      <TableCell className="py-2 px-4 text-gray-600 text-sm italic">{account.aiReasoning.substring(0, 70)}...</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="text-gray-600 text-sm mt-4 italic">Overall AI Confidence for Target Accounts: <Progress value={abmSetupSummary.aiConfidence.targetAccounts} className="inline-flex w-24 h-2 ml-2" indicatorClassName="bg-primary" /> {abmSetupSummary.aiConfidence.targetAccounts}%</div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step4" className="border-b">
            <AccordionTrigger className=" text-gray-700 hover:bg-gray-50 p-4">Campaign Strategy</AccordionTrigger>
            <AccordionContent className="p-4 bg-white border-t border-gray-200 rounded-b-md">
              <p className="text-gray-800"><span className="font-medium">Channels in Use:</span> {abmSetupSummary.campaignStrategies.map(s => s.channel).join(', ')}</p>
              <p className="text-gray-800"><span className="font-medium">Total Strategies Configured:</span> {abmSetupSummary.campaignStrategies.length}</p>
              <div className="text-gray-600 text-sm mt-2 italic">Overall AI Confidence for Campaign Strategy: <Progress value={abmSetupSummary.aiConfidence.campaignStrategy} className="inline-flex w-24 h-2 ml-2" indicatorClassName="bg-primary" /> {abmSetupSummary.aiConfidence.campaignStrategy}%</div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step5" className="border-b">
            <AccordionTrigger className="text-gray-700 hover:bg-gray-50 p-4">Personalization Settings</AccordionTrigger>
            <AccordionContent className="p-4 bg-white border-t border-gray-200 rounded-b-md">
              <div className="text-gray-800">
                <p><span className="font-medium">Tone Preference:</span> {abmSetupSummary.tonePreference}</p>
                <p><span className="font-medium">Brand Voice Highlights:</span> {abmSetupSummary.brandVoiceHighlights}</p>
                <p><span className="font-medium">Auto-Approval Enabled:</span> {abmSetupSummary.autoApprovalEnabled ? 'Yes' : 'No'}</p>
                <div className="text-gray-600 text-sm mt-2 italic">Overall AI Confidence for Personalization: <Progress value={abmSetupSummary.aiConfidence.personalization} className="inline-flex w-24 h-2 ml-2" indicatorClassName="bg-primary" /> {abmSetupSummary.aiConfidence.personalization}%</div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Alert className="mt-6 border-green-200 bg-green-50 text-black text-sm rounded-lg flex items-center">
          <AlertTitle className="flex items-center">
            <CheckCircle className="mr-3 h-4 w-4 text-black" /> Ready to Launch!
          </AlertTitle>

        </Alert>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4 p-6 bg-gray-50 rounded-b-xl">
        <Button variant="secondary" onClick={handleSaveDraft} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none transition-colors duration-200 flex items-center">
          <Save className="mr-2 h-5 w-5" /> Save as Draft
        </Button>
        <Button onClick={handleLaunchCampaign} className="px-6 py-2 rounded-lg text-white bg-primary focus:outline-none transition-colors duration-200 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" /> Launch Campaign
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}
