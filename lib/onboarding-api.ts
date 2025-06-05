import type { WebhookResponseItem } from '../contexts/Onboarding/onboarding-context';

// --- Environment Variable for Mocking ---
const USE_MOCK_API = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

// Debug logging for environment variable
if (typeof window !== 'undefined') {
  console.log('DEBUG ENV:', { 
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
    USE_MOCK_API: USE_MOCK_API,
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL 
  });
  console.log(USE_MOCK_API ? "Using MOCK API for onboarding" : "Using REAL API for onboarding");
}

// --- Mock API Implementation ---
const MOCK_API_RESPONSE: WebhookResponseItem = {
  company_name: "Sample Company",
  employee_range: "1-10",
  industry: "Technology",
  company_description: "A sample company description for testing purposes.",
  target_audience: "Sample target audience description.",
  geographic_markets: ["North America"],
  brand_voice: ["professional"],
  competitors: ["Competitor 1"],
  differentiator: "Sample differentiator.",
  key_marketing_messages: ["Sample message"],
  objectives: [
    { objective: "increase_leads", description: "Sample objective description." }
  ]
};

let mockJobStatus: 'pending' | 'success' | 'error' = 'pending';
let mockJobStartTime = 0;
let currentMockJobId: string | null = null;

async function mockInitiateOnboardingProcessing(
  companyName: string,
  linkedInUrl: string,
  websiteUrl: string
): Promise<{ jobId: string }> {
  console.log(`MOCK API: Initiating processing for ${companyName}`);
  currentMockJobId = `mockJob_${Date.now()}`;
  mockJobStatus = 'pending';
  mockJobStartTime = Date.now();
  console.log(`MOCK API: New job ${currentMockJobId} started. Status: pending.`);
  await new Promise(resolve => setTimeout(resolve, 100));
  return { jobId: currentMockJobId };
}

async function mockCheckOnboardingStatus(
  jobId: string
): Promise<{ status: 'pending' | 'success' | 'error'; data?: WebhookResponseItem; error?: string }> {
  console.log(`MOCK API: Checking status for mock job ${jobId}`);
  if (jobId !== currentMockJobId) {
    console.error(`MOCK API: Error - Unknown Mock Job ID: ${jobId}. Current job is ${currentMockJobId}`);
    return { status: 'error', error: 'Unknown or outdated Mock Job ID' };
  }
  if (mockJobStatus === 'pending') {
    const elapsedTime = Date.now() - mockJobStartTime;
    if (elapsedTime < 5000) {
      console.log(`MOCK API: Mock job ${jobId} still pending. Elapsed: ${elapsedTime}ms`);
      return { status: 'pending' };
    } else {
      console.log(`MOCK API: Mock job ${jobId} completed successfully after 5 seconds.`);
      mockJobStatus = 'success'; 
      return { status: 'success', data: MOCK_API_RESPONSE };
    }
  } else if (mockJobStatus === 'success') {
    console.log(`MOCK API: Mock job ${jobId} already completed. Returning success.`);
    return { status: 'success', data: MOCK_API_RESPONSE };
  } else { 
    console.error(`MOCK API: Mock job ${jobId} is in an error state.`);
    return { status: 'error', error: 'Mock job encountered an unhandled error state.' };
  }
}

export function resetMockJobStateForTesting() {
  currentMockJobId = null;
  mockJobStatus = 'pending';
  mockJobStartTime = 0;
  console.log("MOCK API: Job state has been reset for testing.");
}

// --- Real API Implementation (Calls Next.js API Routes) ---
async function realInitiateOnboardingProcessing(
  companyName: string,
  linkedInUrl: string,
  websiteUrl: string
): Promise<{ jobId: string }> {
  console.log(`REAL API: Initiating processing via /api/onboarding/initiate for ${companyName}`);
  const response = await fetch('/api/onboarding/initiate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ companyName, linkedInUrl, websiteUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response from initiate API' }));
    console.error('REAL API: Error initiating processing:', response.status, errorData);
    throw new Error(errorData.error || `Failed to initiate onboarding processing: ${response.statusText}`);
  }

  const result = await response.json();
  console.log('REAL API: Job initiation successful, jobId:', result.jobId);
  return { jobId: result.jobId };
}

async function realCheckOnboardingStatus(
  jobId: string
): Promise<{ status: 'pending' | 'success' | 'error'; data?: WebhookResponseItem; error?: string }> {
  console.log(`REAL API: Checking status via /api/onboarding/status for job ${jobId}`);
  const response = await fetch(`/api/onboarding/status?jobId=${encodeURIComponent(jobId)}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response from status API' }));
    console.error('REAL API: Error checking job status:', response.status, errorData);
    // For polling, we might not want to throw an error immediately on a failed status check,
    // as the loading-process-context handles retries. Instead, return an error status.
    return { 
        status: 'error', 
        error: errorData.error || `Failed to check job status: ${response.statusText}` 
    };
  }

  const result = await response.json();
  console.log(`REAL API: Job status for ${jobId}:`, result.status);
  return {
    status: result.status,
    data: result.data,
    error: result.error,
  };
}


// --- Exported API Functions (Router) ---
export async function initiateOnboardingProcessing(
  companyName: string,
  linkedInUrl: string,
  websiteUrl: string
): Promise<{ jobId: string }> {
  if (USE_MOCK_API) {
    return mockInitiateOnboardingProcessing(companyName, linkedInUrl, websiteUrl);
  } else {
    return realInitiateOnboardingProcessing(companyName, linkedInUrl, websiteUrl);
  }
}

export async function checkOnboardingStatus(
  jobId: string
): Promise<{ status: 'pending' | 'success' | 'error'; data?: WebhookResponseItem; error?: string }> {
  if (USE_MOCK_API) {
    if (jobId !== currentMockJobId && currentMockJobId !== null) {
        console.warn(`MOCK API: checkOnboardingStatus called with jobId ${jobId} but currentMockJobId is ${currentMockJobId}. Proceeding with ${jobId}`);
    }
    return mockCheckOnboardingStatus(jobId);
  } else {
    return realCheckOnboardingStatus(jobId);
  }
}