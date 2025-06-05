"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LoadingProcessProvider, useLoadingProcess } from "../../../contexts/Onboarding/loading-process-context";

// The actual UI content of the loading page
function LoadingPageContent() {
  const router = useRouter();
  const { status, error, initiateFetchAndPrefill } = useLoadingProcess();
  const apiCallMade = useRef(false);

  useEffect(() => {
    // Initiate the API call when the component mounts and only if not already called
    if (!apiCallMade.current) {
      initiateFetchAndPrefill();
      apiCallMade.current = true;
    }
  }, [initiateFetchAndPrefill]);

  useEffect(() => {
    if (status === 'success') {
      console.log("LoadingPage: API success, navigating to company-overview...");
      router.push("/onboarding/company-overview");
    } else if (status === 'error') {
      console.error("LoadingPage: API error, navigating back to onboarding initial page. Error:", error);
      // Optionally, show an alert or a more user-friendly error message before redirecting
      alert(`Error fetching company data: ${error || 'Unknown error'}. Please try again.`);
      router.push("/onboarding");
    }
  }, [status, router, error]);

  let statusText = "Initializing...";
  if (status === 'pending') {
    statusText = "Fetching your company data, please wait...";
  } else if (status === 'error') {
    statusText = "An error occurred. Redirecting...";
  }
  // No specific text for 'success' as it redirects quickly
  // 'idle' will quickly transition to 'pending'

  return (
    <div className="min-h-screen bg-[#5a17d6] text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        {(status === 'pending' || status === 'idle') && (
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-16 h-16 bg-[#3a0a96] rounded-full flex items-center justify-center">
              <div className="w-10 h-10 border-t-4 border-l-4 border-white rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold text-center mb-8">
          {status === 'pending' || status === 'idle' ? "RevGeni is working on your data" : 
           status === 'error' ? "Problem Fetching Data" : 
           "Processing Complete"}
        </h1>

        <div className="mb-4 text-center text-xl font-medium text-purple-200">{statusText}</div>

        {(status === 'pending' || status === 'idle') && (
          <div className="w-full bg-[#3a0a96] rounded-full h-4 mb-8">
            {/* Indeterminate progress bar or spinner might be better here as we don't have fine-grained progress anymore */}
            <div
              className="bg-white h-4 rounded-full animate-pulse"
              style={{ width: `100%` }} // Or a style that indicates indeterminate loading
            ></div>
          </div>
        )}

        <p className="text-center text-purple-200">
          {status === 'pending' || status === 'idle' ? 
            "Please wait while we analyze your company resources and prepare your personalized onboarding experience." : 
            status === 'error' ? 
            `You will be redirected shortly. Error: ${error || 'Please check your inputs and try again.'}` : 
            "Redirecting..." }
        </p>
      </div>
    </div>
  );
}

// Default export that wraps the content with the Provider
export default function LoadingPage() {
  return (
    <LoadingProcessProvider>
      <LoadingPageContent />
    </LoadingProcessProvider>
  );
}
