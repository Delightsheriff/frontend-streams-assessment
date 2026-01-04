# AI Chatbot Dashboard - Frontend Assessment

This project is a high-fidelity implementation of an AI chatbot dashboard built with **Next.js**, as part of the Peppermint Frontend Assessment. The primary goal was to create a functional, responsive dashboard that adheres to the provided Figma designs, specifically focusing on the demographic reports and horizontal card interactions.

## Live Demo

**Vercel Deployment:** [https://frontend-streams-assessment.vercel.app/](https://frontend-streams-assessment.vercel.app/)

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data Handling:** Static JSON

## Approach & Implementation

1. **Horizontal Card Interaction**: Implemented the specific interaction logic for the section 2 cards as defined in the interactive prototype.
2. **Responsive UI**: Implemented a mobile-first sidebar using a Drawer/Sheet pattern for mobile views and a fixed sidebar for desktop.
3. **HTML Standards**: Resolved hydration mismatches by ensuring valid HTML nesting (replacing nested buttons with accessible `div` elements) to comply with SSR best practices.
4. **Stable Rendering**: Refactored component logic to avoid "component created during render" errors, ensuring a stable React state during user interaction.
5. **Prioritization**: Focused on the Demographic section first, including test metrics and the interactive location distribution map, as required by the brief.

### Assumptions Made

- **Scope**: Per the instructions, the navigation bar and filter buttons were ignored to focus on the core dashboard metrics and card interactions.
- **Data**: The dashboard is populated entirely using static JSON data to simulate the report environment and data will be fetched when apis are ready.

## Instructions for Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Delightsheriff/frontend-streams-assessment
   cd frontend-streams-assessment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application:** Navigate to http://localhost:3000 in your browser.

## Submission Requirements

- [x] Horizontal cards interaction functional
- [x] Mobile and Desktop responsive design
- [x] Dashboard demographic section implemented
- [x] Deployed to Vercel
