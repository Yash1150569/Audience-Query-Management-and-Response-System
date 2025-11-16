# Audience-Query-Management-and-Response-System
# Verity Response - Unified Audience Query Management & Response System

## 1. Overview

Verity Response is a modern, AI-powered Next.js application designed to streamline and unify audience query management. It provides a centralized dashboard for support agents to handle incoming questions, requests, and complaints from various sources like email, social media, and chat. The core of the application is its ability to leverage generative AI to automatically analyze, categorize, prioritize, and assign queries to the most appropriate team members, enabling support teams to work more efficiently and respond to users more effectively.

This project serves as a robust example of integrating Google's Genkit with a Next.js application, showcasing how to build AI-driven features in a modern web framework.

## 2. Tech Stack

The application is built with a curated set of modern technologies to ensure a high-quality, performant, and maintainable codebase.

-   **Framework**: **Next.js 15** (using the App Router)
-   **Language**: **TypeScript**
-   **UI Components**: **ShadCN UI** - A collection of beautifully designed, accessible, and customizable React components.
-   **Styling**: **Tailwind CSS** - For utility-first styling and a consistent design system.
-   **AI Integration**: **Genkit (with Google's Gemini models)** - For implementing all generative AI features, including query analysis and tagging.
-   **State Management**: **Zustand** - A small, fast, and scalable state-management solution.
-   **Forms**: **React Hook Form** & **Zod** - For building performant forms with robust, schema-based validation.
-   **Icons**: **Lucide React** - For clean and consistent icons.

## 3. Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or newer recommended)
-   An active Google Cloud project with the Gemini API enabled.

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <your-repository-url>
    cd verity-response
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the Development Server**
    You can run the Next.js app and the Genkit development server concurrently.

    -   To run the Next.js app:
        ```bash
        npm run dev
        ```
        The application will be available at `http://localhost:9002`.

    -   To run the Genkit development server (for inspecting AI flows):
        ```bash
        npm run genkit:dev
        ```
        The Genkit developer UI will be available at `http://localhost:4000`.

## 4. Key Features

-   **AI-Powered Query Analysis**: New queries are automatically processed by AI to determine their category (Question, Request, Complaint), priority (High, Medium, Low), and sentiment.
-   **Intelligent Auto-Assignment**: Based on the AI analysis, queries are automatically assigned to the most suitable team (e.g., high-priority complaints go to Support Leads).
-   **Unified Inbox**: A central dashboard (`/dashboard`) displays all incoming queries in a filterable and sortable table.
-   **Detailed Query View**: Clicking a query opens a side sheet with comprehensive details, including customer information, full content, AI-generated tags, and a complete history log.
-   **Analytics Dashboard**: The `/analytics` page provides data visualizations on query types, team performance, and key support metrics like average resolution time.
-   **Responsive Design**: The UI is fully responsive and works seamlessly on both desktop and mobile devices.
-   **Light & Dark Modes**: Users can toggle between light and dark themes from the settings page.
-   **User Profile Management**: Users can update their profile information, which is managed globally using Zustand.

## 5. AI & Genkit Integration

Generative AI is a cornerstone of this application, handled exclusively by **Genkit**.

### AI Flows

The AI logic is organized into "flows" located in `src/ai/flows/`.

1.  **`intelligent-query-tagging.ts`**:
    -   **Purpose**: This flow takes the raw text of a user's query and classifies it into one of three categories: `question`, `request`, or `complaint`.
    -   **Mechanism**: It uses a structured prompt with the Gemini model, constraining the output to a predefined enum to ensure reliable and consistent categorization.

2.  **`priority-detection-and-escalation.ts`**:
    -   **Purpose**: This flow analyzes the query to determine its priority, sentiment, and whether it requires escalation.
    -   **Mechanism**: It assesses urgency, impact, and tone, returning a JSON object with `priority`, `sentiment`, and a boolean `escalate` flag.

These flows are triggered in parallel within a Next.js Server Action (`src/app/actions.ts`) when a new query is created, ensuring a fast and efficient analysis before the query is saved and displayed in the UI.

## 6. Architectural Decisions

-   **Next.js App Router**: The App Router was chosen over the Pages Router for its improved support for layouts, server components, and granular caching. This allows for better performance and a more organized project structure.
-   **Server Components by Default**: Most components are implemented as React Server Components (RSCs) to minimize the amount of JavaScript sent to the client, leading to faster initial page loads. Client-side interactivity is opted into only where necessary with the `'use client'` directive.
-   **Server Actions for Mutations**: Data mutations (like creating a query or updating a profile) are handled using Next.js Server Actions. This eliminates the need to create separate API endpoints for these operations, simplifying the codebase and improving security.
-   **Zustand for Global State**: While RSCs and URL state handle most state management needs, Zustand is used for managing global client-side state that is shared across multiple components, such as the current user's information. It was chosen for its simplicity and minimal boilerplate.
-   **ShadCN UI for Components**: Instead of a traditional component library, ShadCN UI provides unstyled components that can be copied directly into the project and customized. This gives full control over the code and styling, avoiding dependency bloat and promoting a consistent design language built on Tailwind CSS.
-   **In-Memory Mock Data**: For demonstration purposes, the application uses an in-memory array (`src/lib/mock-data.ts`) to store queries and agent information. In a production environment, this would be replaced with a database like Firestore or PostgreSQL.
