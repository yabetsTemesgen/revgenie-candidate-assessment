-- Enable RLS (Row Level Security)
-- Note: JWT secrets are managed automatically by Supabase

-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'organization_owner');

-- Create enum for research status
CREATE TYPE research_status AS ENUM ('not_started', 'pending', 'in_progress', 'completed', 'failed');

-- Create companies table
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  employee_range VARCHAR(50),
  description TEXT,
  linkedin_url VARCHAR(500),
  website_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Extend the default profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  full_name VARCHAR(255),
  role VARCHAR(255),
  user_role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comprehensive company_onboarding table with AI data tracking
CREATE TABLE company_onboarding (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Initial input data
  initial_company_name VARCHAR(255),
  initial_linkedin_url VARCHAR(500),
  initial_website_url VARCHAR(500),
  initial_resources TEXT[], -- Array of additional URLs

  -- AI generated data (stored for comparison)
  ai_generated_data JSONB,
  ai_generated_at TIMESTAMP WITH TIME ZONE,

  -- Final user-approved data
  final_data JSONB,

  -- Onboarding progress tracking
  completed_steps TEXT[] DEFAULT '{}',
  current_step VARCHAR(100) DEFAULT 'initial',

  -- Research status
  research_status research_status DEFAULT 'pending',
  research_data JSONB,

  -- External job tracking
  job_id VARCHAR(255), -- For n8n or other external job tracking

  -- Completion status
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one onboarding per company
  UNIQUE(company_id)
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_onboarding_updated_at BEFORE UPDATE ON company_onboarding
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Disable RLS on company_onboarding for now to avoid policy issues
ALTER TABLE company_onboarding DISABLE ROW LEVEL SECURITY;

-- RLS Policies for companies (simplified for onboarding flow)
CREATE POLICY "Authenticated users can insert companies" ON companies
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own company" ON companies
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND (
            -- User has a profile linked to this company
            id IN (
                SELECT company_id FROM profiles 
                WHERE id = auth.uid()
            )
            -- OR user created this company (for onboarding flow)
            OR id IN (
                SELECT company_id FROM company_onboarding 
                WHERE created_by = auth.uid()
            )
        )
    );

CREATE POLICY "Users can update their own company" ON companies
    FOR UPDATE USING (
        auth.uid() IS NOT NULL AND (
            -- User has a profile linked to this company
            id IN (
                SELECT company_id FROM profiles 
                WHERE id = auth.uid()
            )
            -- OR user created this company (for onboarding flow)
            OR id IN (
                SELECT company_id FROM company_onboarding 
                WHERE created_by = auth.uid()
            )
        )
    );

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_profiles_company_id ON profiles(company_id);
CREATE INDEX idx_company_onboarding_company_id ON company_onboarding(company_id);
CREATE INDEX idx_company_onboarding_created_by ON company_onboarding(created_by);
CREATE INDEX idx_company_onboarding_job_id ON company_onboarding(job_id);
CREATE INDEX idx_company_onboarding_research_status ON company_onboarding(research_status);

-- Debug function to check auth context
CREATE OR REPLACE FUNCTION debug_auth_context()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'auth_uid', auth.uid(),
    'auth_jwt', auth.jwt(),
    'current_user', current_user,
    'session_user', session_user,
    'current_setting_jwt_claims', current_setting('request.jwt.claims', true)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to test company insert with detailed logging
CREATE OR REPLACE FUNCTION test_company_insert(company_name TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
  company_id UUID;
BEGIN
  -- Log the auth context
  RAISE LOG 'Auth context: %', debug_auth_context();

  -- Try to insert
  INSERT INTO companies (name, industry) 
  VALUES (company_name, 'Test Industry')
  RETURNING id INTO company_id;

  result := json_build_object(
    'success', true,
    'company_id', company_id,
    'auth_context', debug_auth_context()
  );

  RETURN result;
EXCEPTION WHEN OTHERS THEN
  result := json_build_object(
    'success', false,
    'error', SQLERRM,
    'auth_context', debug_auth_context()
  );
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;