# RevGeni Onboarding Module

## 1. Overview

The Onboarding module is responsible for collecting essential initial information from new users to personalize their RevGeni experience. It guides users through a multi-step process, gathering data about their company, target audience, brand style, and business goals.

This module is designed to be a self-contained unit within the RevGeni modular monolith architecture, with the potential for future separation into a microservice if required.

## 2. Key Features

- **Multi-Step Form**: A guided, sequential flow to collect information in logical chunks.
  - Initial User/Company Information (`/onboarding`)
  - Company Overview (`/onboarding/company-overview`)
  - Target Audience & Markets (`/onboarding/audience`)
  - Brand Styles & Positioning (`/onboarding/brand-styles`)
  - Business Goals (`/onboarding/business-goals`)
- **Centralized State Management**: Utilizes a React Context (`OnboardingContext`) to manage and persist form data across all steps.
- **Client-Side Navigation**: Leverages Next.js routing for a smooth user experience without full page reloads between steps.
- **Data Validation**: Each step includes basic validation before proceeding.
- **Summary Page**: A final review page (`/onboarding/summary`) for users to verify all entered information before final submission.

## 3. Module Structure

- **Pages**: Located in `revgeni-saas/app/onboarding/[step]/page.tsx`. Each directory corresponds to a step in the onboarding flow.
- **Layout**: The global layout for the onboarding module is `revgeni-saas/app/onboarding/layout.tsx`, which provides the `OnboardingProvider`.
- **Contexts**: The core state management logic resides in `revgeni-saas/contexts/onboarding-context.tsx`. Individual step contexts (`company-overview-context.tsx`, `audience-context.tsx`, etc.) act as consumers and specialized providers that interface with the main `OnboardingContext`.
- **UI Components**:
  - Step-specific form components are located in `revgeni-saas/components/onboarding/` (e.g., `onboarding-form.tsx`, `company-overview-form.tsx`).
  - The summary view component is in `revgeni-saas/components/summary/summary-view.tsx`.

## 4. Technical Details

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS

## 5. How it Works

1.  The user navigates to `/onboarding`.
2.  `app/onboarding/layout.tsx` wraps the entire flow with `OnboardingProvider`, initializing the global state.
3.  Each step page (`page.tsx`) renders its specific form (often wrapped by its own specialized context provider that consumes `OnboardingContext`).
4.  User input updates the `OnboardingContext` via updater functions.
5.  Upon submitting each step, `handleStepSubmit` in `OnboardingContext` validates (if applicable at that level) and navigates the user to the next step.
6.  The `Summary` page fetches all data from `OnboardingContext` for display.
7.  The final submission on the summary page currently logs the complete data to the console. In a production environment, this would trigger an API call to save the data.

## 6. Future Considerations

- **API Integration**: Implement API calls to securely submit and store the collected onboarding data to a backend service.
- **Advanced Validation**: Enhance client-side and implement server-side validation for all fields.
- **Error Handling**: Improve error handling and user feedback mechanisms.
- **Internationalization (i18n)**: Prepare the module for multiple language support if needed.
