# RevGenie Fullstack Developer Assessment (Frontend Focus)

## Overview
RevGenie is an AI-powered SaaS platform that provides specialized "genies" (AI agents) to help small and medium-sized B2B businesses automate their sales, marketing, and customer success operations. We're looking for a frontend-focused fullstack developer to join our team and help build the next generation of our platform.

## Assessment Goal
Build an onboarding flow for our **Account-Based Marketing (ABM) Genie** that demonstrates your technical skills, design thinking, and understanding of AI-first product development.

---

## Part 1: Analysis & Design (1-2 hours)

### What You'll Receive
- Access to our current codebase
- Video walkthrough of existing onboarding flows:
  - General platform onboarding
  - Content Manager Genie onboarding
- This detailed ABM Genie specification

### Deliverables
1. **Design Mockups** (Figma, Sketch, or similar)
   - 5-6 screen onboarding flow for ABM Genie
   - Show your understanding of our design system
   - Include AI interaction states (loading, reasoning, results)

2. **Technical Analysis Document** (1-2 pages)
   - Code quality assessment of current codebase
   - What you would reuse vs. rebuild and why
   - Architecture recommendations for AI-first features
   - Component structure proposal for ABM Genie
   - Data flow design for AI streaming/reasoning displays

---

## Part 2: Implementation (4-6 hours)

### Core Requirements
Build a **5-6 step ABM Genie onboarding flow** that follows this pattern:

#### Step 1: Initial Input (Minimal User Input)
- Company basics (name, website, LinkedIn)
- Primary ABM goal selection
- Upload capability for target account list (CSV)

#### Step 2: AI Processing (Show AI Working)
- "AI is analyzing your company and market..." 
- Streaming progress indicators
- Show what the AI is doing (research, analysis, etc.)

#### Step 3: Account Research Review (AI Generated, User Editable)
- Display AI-researched target accounts
- Show AI reasoning for each account selection
- Allow user to add/remove/edit accounts
- Account scoring and prioritization

#### Step 4: Campaign Strategy (AI Generated, User Editable)
- Recommended messaging frameworks per account
- Content type suggestions (emails, LinkedIn, ads)
- Channel recommendations with reasoning
- Timeline and sequence proposals

#### Step 5: Personalization Settings (AI Generated, User Editable)
- Tone and style preferences
- Brand voice guidelines
- Message templates
- Compliance and approval workflows

#### Step 6: Review & Launch
- Summary of complete ABM setup
- AI confidence scores for recommendations
- Launch campaign or save as draft

### Technical Requirements
- **Framework**: Next.js 14+ with App Router
- **Styling**: TailwindCSS + our design system (provided)
- **Components**: Reuse existing components where possible, extend when needed
- **TypeScript**: Strict typing for all interfaces
- **State Management**: Your choice (Context, Zustand, etc.)
- **Data**: Mock APIs with realistic delays and streaming simulation
- **Responsive**: Mobile-first design

### AI-First Features to Implement
1. **Streaming Text Animation**: Simulate AI generating text in real-time
2. **Progress Indicators**: Show AI processing different data sources
3. **Reasoning Display**: Show why AI made specific recommendations
4. **Confidence Scores**: Visual indicators of AI certainty
5. **Interactive Editing**: Users can modify AI suggestions
6. **Chat Interface**: Allow users to ask questions about recommendations

---

## ABM Genie Detailed Specification

### What is Account-Based Marketing (ABM)?
ABM is a strategic approach that focuses marketing efforts on specific high-value accounts rather than broad audiences. Our ABM Genie automates the research, personalization, and execution of ABM campaigns.

### Core ABM Genie Functions

#### 1. **Account Research & Selection**
- **User Provides**: Company data, ideal customer profile, target account list
- **Genie Returns**: Prioritized list of target accounts with detailed profiles, including:
  - Company details and key metrics
  - Fit and intent scores with explanations
  - Key decision makers and influencers
  - Recent news and relevant events
  - Identified pain points and opportunities

#### 2. **Personalized Campaign Creation**
- **User Provides**: Campaign goals, message preferences, target accounts
- **Genie Returns**: Complete campaign strategy, including:
  - Account-specific messaging frameworks
  - Recommended channels and content types
  - Optimal timing and sequence suggestions
  - Reasoning for each recommendation

#### 3. **Content Personalization**
- **User Provides**: Brand guidelines, compliance rules, approved campaign framework
- **Genie Returns**: Personalized content library, including:
  - Account-specific messaging templates
  - Customized outreach content for each channel
  - Personalization variables and dynamic content
  - Compliance-checked ready-to-use assets

#### 4. **Execution & Optimization**
- **User Provides**: Approved campaign content, timing preferences, success metrics
- **Genie Returns**: Campaign execution plan with:
  - Scheduled touchpoints across channels
  - Performance tracking dashboard
  - Real-time optimization suggestions
  - A/B testing recommendations

### Data Requirements

As part of this assessment, you'll need to design appropriate TypeScript interfaces for the ABM Genie onboarding flow. Your interfaces should support the following data requirements:

#### User Input Data
- Company information (name, website, industry, etc.)
- Campaign goals and metrics
- Target account list (CSV upload capability)
- Brand voice and tone preferences
- Approval workflow settings

#### AI-Generated Data
- Target account research results
- Account scoring and prioritization
- Recommended messaging frameworks
- Channel and content recommendations
- Campaign sequence suggestions
- Personalized content templates

#### AI Interaction Data
- Progress indicators
- Streaming text responses
- Confidence scores
- Reasoning explanations
- Alternative suggestions

Your solution should demonstrate thoughtful data modeling that supports the user experience requirements. We're interested in seeing how you approach data structure design based on the UI/UX needs.

### Mock AI Behaviors to Simulate

1. **Account Research Streaming**:
   ```
   "Researching Acme Corp..."
   "Found recent Series B funding announcement..."
   "Analyzing leadership team on LinkedIn..."
   "Identifying decision makers in marketing..."
   "Checking recent job postings for hiring intent..."
   "Scoring account fit: 85/100"
   ```

2. **Campaign Strategy Generation**:
   ```
   "Based on Acme Corp's recent expansion, I recommend..."
   "Their CEO's recent LinkedIn posts suggest..."
   "Industry trends indicate they likely need..."
   "Confidence level: High (87%)"
   ```

3. **Real-time Optimization Suggestions**:
   ```
   "I notice similar companies respond better to..."
   "Would you like me to adjust the messaging for..."
   "Based on industry data, consider adding..."
   ```

---

## Part 3: Presentation & Documentation (30 minutes)

### Deliverables
1. **Working Demo**
   - Deployed version (Vercel, Netlify, etc.) or local setup instructions
   - Walkthrough video (5-10 minutes) showing key features

2. **Technical Documentation**
   - Code architecture explanation
   - Component reusability approach
   - Integration points with existing codebase
   - AI streaming implementation details
   - What you would do differently with more time

3. **Recommendations Document**
   - Platform improvement suggestions
   - Technical debt observations
   - Architecture recommendations for scaling
   - Next development priorities if you were leading frontend

---

## Evaluation Criteria

### Design & UX (25%)
- Quality and consistency of Figma mockups
- Understanding of user experience principles
- Adherence to existing design system
- Innovation in AI interaction design

### Technical Implementation (40%)
- Code quality and best practices
- Component architecture and reusability
- TypeScript usage and type safety
- State management approach
- Error handling and edge cases
- Performance considerations

### AI-First Thinking (20%)
- Understanding of streaming interfaces
- Chat and conversation design
- AI feedback and reasoning presentation
- Real-time updates and loading states
- User control over AI suggestions

### Problem-Solving & Communication (15%)
- Quality of analysis and recommendations
- Clear reasoning behind technical decisions
- Ability to explain trade-offs
- Suggestions for platform improvements
- Documentation clarity

---

## Setup Instructions

Please refer to the [GETTING_STARTED.md](./GETTING_STARTED.md) file for detailed setup instructions.

---

## Resources Provided

- **Codebase**: Complete frontend codebase with existing patterns
- **Design System**: TailwindCSS configuration and component library
- **Video Tutorials**: Walkthroughs of existing onboarding flows
- **API Mocks**: Example endpoints and data structures
- **Documentation**: Technical architecture overview

---

## Submission Instructions

### Timeline
- **Total Time**: 6-8 hours (can be split over multiple days)
- **Deadline**: Within 5 days of receiving this assessment

### What to Submit
1. **GitHub Repository**: Your implementation with clear README
2. **Live Demo**: Deployed application or clear local setup instructions
3. **Design Files**: Figma/Sketch files or exported images
4. **Documentation**: Technical analysis and recommendations
5. **Video Walkthrough**: 5-10 minute demo of your implementation

### Submission Format
Email to: grant.crow@revgeni.ai
Subject: "RevGenie Fullstack Assessment - [Your Name]"

Include:
- Links to all deliverables
- Brief cover letter explaining your approach
- Any questions or assumptions you made
- Estimated time spent on each section

---

## Questions?

If you have questions during the assessment, please:
- Create an issue in this repository, or
- Email grant.crow@revgeni.ai

We'll respond within 24 hours on weekdays.

Good luck! We're excited to see your approach to building AI-first user experiences.

---

*This assessment is designed to simulate real work you'd be doing at RevGenie. We value your time and effort, and all submissions will receive detailed feedback regardless of outcome.*