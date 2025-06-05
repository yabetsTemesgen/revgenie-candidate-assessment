import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient()

    // Test basic table structure
    const { data: companies, error: companiesError } = await supabase
      .from("companies")
      .select("*")
      .limit(1);

    if (companiesError) {
      throw new Error(`Companies table error: ${companiesError.message}`);
    }

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .limit(1);

    if (profilesError) {
      throw new Error(`Profiles table error: ${profilesError.message}`);
    }

    const { data: onboarding, error: onboardingError } = await supabase
      .from("company_onboarding")
      .select("*")
      .limit(1);

    if (onboardingError) {
      throw new Error(`Onboarding table error: ${onboardingError.message}`);
    }

    return NextResponse.json({
      status: "success",
      message: "Database schema verified successfully",
      tables: {
        companies: "OK",
        profiles: "OK",
        company_onboarding: "OK",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database schema verification failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database schema verification failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}