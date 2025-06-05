"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "./onboarding-context"; // WebhookResponseItem is implicitly imported via useOnboarding
import {
  initiateOnboardingProcessing,
  checkOnboardingStatus,
} from "../../lib/onboarding-api";

type LoadingStatus = "idle" | "pending" | "success" | "error";

interface LoadingProcessContextType {
  status: LoadingStatus;
  error: string | null;
  initiateFetchAndPrefill: () => void;
}

const LoadingProcessContext = createContext<
  LoadingProcessContextType | undefined
>(undefined);

// Configuration for polling
const POLLING_INTERVAL_MS = 3000; // Poll every 3 seconds
const MAX_POLL_ATTEMPTS = 30; // Max 30 attempts (30 * 3s = 90 seconds)
const OVERALL_TIMEOUT_MS = MAX_POLL_ATTEMPTS * POLLING_INTERVAL_MS + 5000; // A bit more than max attempts time

export const LoadingProcessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<LoadingStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const { formData, prefillOnboardingDataFromApi, updateTextInput } =
    useOnboarding();
  const router = useRouter();

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const overallTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const jobIdRef = useRef<string | null>(null);
  const pollAttemptsRef = useRef<number>(0);

  const clearTimeoutsAndIntervals = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      console.log("LoadingProcessContext: Polling interval cleared.");
    }
    if (overallTimeoutIdRef.current) {
      clearTimeout(overallTimeoutIdRef.current);
      overallTimeoutIdRef.current = null;
      console.log("LoadingProcessContext: Overall timeout cleared.");
    }
  }, []);

  const handlePollingError = useCallback(
    (errorMessage: string, logMessage?: string) => {
      clearTimeoutsAndIntervals();
      setError(errorMessage);
      setStatus("error");
      console.error(`LoadingProcessContext: ${logMessage || errorMessage}`);
    },
    [clearTimeoutsAndIntervals],
  );

  const initiateFetchAndPrefill = useCallback(async () => {
    clearTimeoutsAndIntervals();
    jobIdRef.current = null;
    pollAttemptsRef.current = 0;

    if (!formData.companyName || !formData.companyLinkedInUrl) {
      const msg = "Company name and LinkedIn URL are required for API call.";
      console.error(`LoadingProcessContext: ${msg}`);
      setError(msg);
      setStatus("error");
      // Potentially redirect, but for now, just setting error.
      // router.push('/onboarding');
      return;
    }

    setStatus("pending");
    setError(null);
    console.log("LoadingProcessContext: Initiating processing job...");

    try {
      const { jobId } = await initiateOnboardingProcessing(
        formData.companyName,
        formData.companyLinkedInUrl,
        formData.companyWebsiteUrl || "",
      );
      jobIdRef.current = jobId;
      console.log(
        `LoadingProcessContext: Processing job started with ID: ${jobId}. Starting polling.`,
      );

      // Store the jobId in the onboarding context for later use
      updateTextInput("jobId", jobId);

      // Set an overall timeout for the entire polling process
      overallTimeoutIdRef.current = setTimeout(() => {
        handlePollingError(
          `Polling timed out after ${OVERALL_TIMEOUT_MS / 1000} seconds.`,
          `Overall polling timeout reached for job ID: ${jobIdRef.current}.`,
        );
      }, OVERALL_TIMEOUT_MS);

      // Start polling
      intervalIdRef.current = setInterval(async () => {
        if (!jobIdRef.current) {
          handlePollingError(
            "Polling attempted without a job ID.",
            "Consistency error: Polling without job ID.",
          );
          return;
        }

        pollAttemptsRef.current += 1;
        console.log(
          `LoadingProcessContext: Polling attempt ${pollAttemptsRef.current}/${MAX_POLL_ATTEMPTS} for job ID: ${jobIdRef.current}`,
        );

        if (pollAttemptsRef.current > MAX_POLL_ATTEMPTS) {
          handlePollingError(
            `Maximum polling attempts (${MAX_POLL_ATTEMPTS}) reached.`,
            `Max polling attempts reached for job ID: ${jobIdRef.current}.`,
          );
          return;
        }

        try {
          const result = await checkOnboardingStatus(jobIdRef.current);
          console.log("LoadingProcessContext: Poll status result:", result);

          if (result.status === "success") {
            clearTimeoutsAndIntervals();
            if (!prefillOnboardingDataFromApi) {
              const msg =
                "'prefillOnboardingDataFromApi' is not available on OnboardingContext.";
              console.error(`LoadingProcessContext: ${msg}`);
              throw new Error(msg); // This will be caught by the outer catch
            }
            if (result.data) {
              await prefillOnboardingDataFromApi(result.data); // This can also throw
              setStatus("success");
              console.log(
                "LoadingProcessContext: Data prefilled successfully.",
              );
            } else {
              handlePollingError(
                "Polling successful but no data received.",
                `Polling success, no data for job ID: ${jobIdRef.current}.`,
              );
            }
          } else if (result.status === "error") {
            handlePollingError(
              result.error || "Polling returned an error.",
              `Polling error for job ID: ${jobIdRef.current}: ${result.error}`,
            );
          } else {
            // status === 'pending', continue polling
            console.log(
              `LoadingProcessContext: Job ${jobIdRef.current} still pending...`,
            );
          }
        } catch (pollingError) {
          // Catches errors from checkOnboardingStatus or prefillOnboardingDataFromApi
          handlePollingError(
            pollingError instanceof Error
              ? pollingError.message
              : "An unknown error occurred during polling.",
            `Error during polling/prefill for job ID: ${jobIdRef.current}: ${pollingError}`,
          );
        }
      }, POLLING_INTERVAL_MS);
    } catch (initError) {
      // Catches errors from initiateOnboardingProcessing
      handlePollingError(
        initError instanceof Error
          ? initError.message
          : "Failed to start processing job.",
        `Failed to initiate processing job: ${initError}`,
      );
    }
  }, [
    formData.companyName,
    formData.companyLinkedInUrl,
    formData.companyWebsiteUrl,
    prefillOnboardingDataFromApi,
    // router, // router is not directly used in this callback path anymore for error navigation
    clearTimeoutsAndIntervals,
    handlePollingError,
    updateTextInput,
  ]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      clearTimeoutsAndIntervals();
    };
  }, [clearTimeoutsAndIntervals]);

  return (
    <LoadingProcessContext.Provider
      value={{ status, error, initiateFetchAndPrefill }}
    >
      {children}
    </LoadingProcessContext.Provider>
  );
};

export const useLoadingProcess = (): LoadingProcessContextType => {
  const context = useContext(LoadingProcessContext);
  if (context === undefined) {
    throw new Error(
      "useLoadingProcess must be used within a LoadingProcessProvider",
    );
  }
  return context;
};
