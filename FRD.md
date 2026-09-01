# Functional Requirements Document (FRD)
## Maharashtra Tourism Digital Passport System

### 1. Document Overview
This document specifies the functional requirements, design parameters, and technical architecture of the **Maharashtra Tourism Digital Passport** prototype. The passport acts as a gamified digital companion for travelers exploring Maharashtra's historic circuits, destinations, forts, and cultural sanctuaries.

---

### 2. Core Functional Requirements

#### 2.1 Brand Identity & Typography (Official Logo Standards)
*   **Emblem Fidelity**: The application uses the exact, official high-resolution graphic emblem of Maharashtra Tourism featuring the Gateway of India silhouette in orange-saffron overlaid with the white three-face Shiva Trimurti from Elephanta Caves.
*   **Emblem Isolation**: If requested by layout constraints, the bottom text from the logo image is programmatically cropped using accurate relative aspect-ratio boxes, maintaining the pure graphic emblem.
*   **Official Typography**: The text `"MAHARASHTRA TOURISM"` is rendered in uppercase using high-contrast display serif typography matching the official branding aspect ratios and letter-spacing (`tracking-[0.25em]` and `tracking-[0.42em]`).

#### 2.2 User Onboarding & Digital Passport Issuance
*   **Carousel Guide**: A screen-by-screen guided onboarding slider explaining Passport features (Explore, Verify Check-ins, Earn Badges).
*   **Dual-Mode Access Flow**:
    *   **New Passport Creation**: Standard registration requiring Name, Mobile Number, preferred Language (English/मराठी), Age Group, and District.
    *   **Sync / Restore Passport**: Option to retrieve existing travel history, checked-in stamps, collected badges, and XP points from other browsers, devices, or systems using a registered mobile number.
*   **OTP Demo Authentication**: A simulated OTP code sequence (`123456`) to securely finalize the passport registration/sync flow.

#### 2.3 Cross-Browser / Cross-Device State Syncing
*   **Local Persistence**: Client-side storage (`localStorage`) retains session variables for near-instant offline-capable boots on the primary browser.
*   **Durable Server-Side Syncing**:
    *   Every profile edit, check-in, or level-up is automatically transmitted via a background POST request to the Express backend (`/api/profile/save`).
    *   A robust filesystem JSON store (`profiles_db.json`) serves as a fast, scale-independent local database.
    *   Enables users to access their same progress, achievements, and statistics instantly by selecting the **Sync / Restore** option on any other device or browser.

#### 2.4 Destination Discover & Search Console
*   **Clean Search-First Interface**:
    *   To keep search queries central and readable, the logo, "Explore Maharashtra" title, and descriptions have been removed from the search/discover sub-view.
    *   The interface focus is entirely centered on search inputs, categories, and quick filters.
*   **Multilingual Support**: Supports fully-localized translation keys for English and Marathi languages dynamically changing based on the user's Passport settings.

---

### 3. System Architecture & API Specification

#### 3.1 Backend Routes (Express Server)
*   `GET /api/profiles`: Retrieves all registered profiles to populate the active console directory.
*   `GET /api/profile/:mobile`: Locates a specific traveler profile by mobile number to restore states.
*   `POST /api/profile/save`: Synchronizes traveler profiles, checked-in destination codes, earned badges, level stats, and XP points.

#### 3.2 Frontend Structure (React + Vite)
*   `src/components/MaharashtraLogo.tsx`: High-fidelity rendering module managing the official logo asset cropping and typography.
*   `src/components/Onboarding.tsx`: Registration wizard hosting both "New Passport" and "Sync / Restore" workflows.
*   `src/components/DiscoverTab.tsx`: Clutter-free destination catalog and search input panel.
