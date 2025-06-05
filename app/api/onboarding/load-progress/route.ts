import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserServer } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  try {
    const { user } = await getCurrentUserServer();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // Get the most recent onboarding record for the user
    const { data: onboardingRecord, error } = await supabase
      .from("company_onboarding")
      .select(
        "current_step, partial_data, is_completed, ai_generated_data, final_data, created_by",
      )
      .eq("created_by", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("Error loading onboarding progress:", error);
      return NextResponse.json(
        {
          error: "Failed to load progress",
          details: error.message,
        },
        { status: 500 },
      );
    }

    if (!onboardingRecord) {
      return NextResponse.json({
        success: false,
        data: null,
        currentStep: null,
        message: "No onboarding record found",
      });
    }

    console.log('Onboarding record found:', {
      id: onboardingRecord.id,
      current_step: onboardingRecord.current_step,
      is_completed: onboardingRecord.is_completed,
      has_partial_data: !!onboardingRecord.partial_data,
      has_ai_generated_data: !!onboardingRecord.ai_generated_data,
      has_final_data: !!onboardingRecord.final_data,
      partial_data_type: typeof onboardingRecord.partial_data,
      ai_generated_data_type: typeof onboardingRecord.ai_generated_data,
      final_data_type: typeof onboardingRecord.final_data,
    });

    // Log the actual structure of final_data for debugging
    if (onboardingRecord.final_data) {
      console.log('final_data structure:', JSON.stringify(onboardingRecord.final_data, null, 2));
      console.log('final_data keys:', Object.keys(onboardingRecord.final_data));
    }

    // Only return final_data if onboarding is completed
    if (!onboardingRecord.is_completed || !onboardingRecord.final_data) {
      return NextResponse.json({
        success: false,
        data: null,
        currentStep: onboardingRecord.current_step,
        message: "Onboarding not completed - final_data not available",
        is_completed: false,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        final_data: onboardingRecord.final_data,
        is_completed: onboardingRecord.is_completed,
      },
      currentStep: onboardingRecord.current_step,
      message: "Final data loaded successfully",
    });
  } catch (error) {
    console.error("Error in load progress API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}