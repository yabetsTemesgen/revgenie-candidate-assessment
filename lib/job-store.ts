import type { WebhookResponseItem } from '../contexts/Onboarding/onboarding-context';

export interface Job {
  id: string;
  status: 'pending' | 'success' | 'error';
  data?: WebhookResponseItem;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

// In-memory store (NOT suitable for production - data lost on server restart)
const jobs = new Map<string, Job>();

const JOB_TTL_MS = 15 * 60 * 1000; // 15 minutes Time-To-Live for jobs

function cleanupOldJobs() {
  const now = Date.now();
  for (const [jobId, job] of jobs.entries()) {
    if (now - job.createdAt > JOB_TTL_MS) {
      jobs.delete(jobId);
      console.log(`Job store: Cleaned up old job ${jobId}`);
    }
  }
}

// Periodically clean up old jobs (e.g., every 5 minutes)
// In a real app, this might be a cron job or a more sophisticated cleanup strategy
if (typeof setInterval !== 'undefined') { // Ensure it doesn't run during Next.js build phase if not careful
    setInterval(cleanupOldJobs, 5 * 60 * 1000);
}

export const jobStore = {
  createJob: (jobId: string): Job => {
    const now = Date.now();
    const newJob: Job = {
      id: jobId,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    jobs.set(jobId, newJob);
    console.log(`Job store: Created job ${jobId}`);
    return newJob;
  },

  getJob: (jobId: string): Job | undefined => {
    return jobs.get(jobId);
  },

  updateJob: (jobId: string, status: 'success' | 'error', resultData?: WebhookResponseItem, errorMessage?: string): Job | undefined => {
    const job = jobs.get(jobId);
    if (job) {
      job.status = status;
      job.updatedAt = Date.now();
      if (status === 'success' && resultData) {
        job.data = resultData;
        job.error = undefined;
      } else if (status === 'error') {
        job.error = errorMessage || 'Unknown error';
        job.data = undefined;
      }
      jobs.set(jobId, job);
      console.log(`Job store: Updated job ${jobId} to status ${status}`);
      return job;
    }
    console.warn(`Job store: Attempted to update non-existent job ${jobId}`);
    return undefined;
  },
};
