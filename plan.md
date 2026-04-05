# Plan for Patient Entry Form Implementation

## 1. Feature Breakdown
- **Patient Entry Form**: A comprehensive form based on the "Track Positives Client Registration Form" image.
- **Fields**: No., Date Tested, Testing Register Client Serial Number, Age, Sex, HTC Provider, Date enrolled to ART, Unique ART Number, Next appointment date, Remarks.
- **Validation**: Use Zod and React Hook Form for client-side validation.
- **UI/UX**: Responsive layout using Tailwind CSS and Shadcn/UI components. High-quality design with Framer Motion animations.

## 2. File Changes
- `src/types/registration.ts`: Define the Zod schema and TypeScript types for the registration form.
- `src/components/PatientEntryForm.tsx`: The core form component.
- `src/pages/Registration.tsx`: A new page to host the registration form.
- `src/App.tsx`: (Modified) Add the "Registration" tab to allow access to the new form.
- `src/pages/Patients.tsx`: (Modified) Update the "Register Patient" button to navigate to the new form or open the new component.

## 3. Component Structure
- **Form Layout**: Grid-based layout for better space utilization on desktop, stacking on mobile.
- **Input Components**: Use Shadcn/UI (Input, Select, Popover with Calendar for dates).
- **Feedback**: Use Sonner for toast notifications upon form submission.

## 4. Animation Approach
- **Page Transition**: Animate the form entrance using `framer-motion` (slide up and fade in).
- **Input Focus**: Subtle scale/border changes on focus.
- **Success State**: Animated checkmark or success message.

## 5. Implementation Notes
- The "No." field will be treated as an ID (automatic or manual entry).
- "HTC Provider" will have options like 'OPD 203', 'TB', 'VCT', etc.
- "Sex" will be a dropdown with 'Male' and 'Female'.
- Dates will use a date picker for better UX.
