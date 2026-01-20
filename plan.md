# Implementation Plan - MenuMatrix UI Revamp (Anti-Gravity Style)

This plan outlines the steps to transform MenuMatrix from a functional tool into a premium, educational, and visually stunning AI-powered platform, drawing inspiration from high-end "Anti-Gravity" design aesthetics.

## Phase 1: Foundation & Design System (`index.css`)
- **Tokens & Variables**: Define a sophisticated color palette (Deep Space Navy, Indigo Glow, Emerald/Rose/Amber/Blue accents for quadrants).
- **Global Styles**: Implement a smooth custom scrollbar, selection colors, and base typography (Inter/Outfit).
- **Animations**: Create custom keyframes for:
    - `float`: For elements that feel weightless.
    - `glow`: Pulse effects for "Stars" and CTA buttons.
    - `shine`: Subtle light sweeps over cards.
    - `reveal`: Smooth staggered entrance for sections.

## Phase 2: Landing Page Revamp
- **Hero Section**:
    - **Vibrant Headline**: "Engineering the Future of Menu Profitability."
    - **Sub-headline**: Educational context about the Kasavana & Smith Matrix.
    - **Visual Hook**: A floating 3D-like representation of the matrix (using CSS/Lucide icons).
- **Educational Explainer**:
    - "The 4 Quadrants" bento grid.
    - Interactive cards for **Stars** (High Profit, High Popularity), **Plowhorses** (Low Profit, High Popularity), etc.
    - "How it works" step-by-step visual bridge (Upload -> AI Analyze -> Optimize).

## Phase 3: FileUpload Component Refinement
- **Glassmorphism**: Update the card to use a rich `backdrop-blur` and thin `white/10` borders.
- **Interactive Dropzone**: Enhanced state transitions for dragging files.
- **"Magic" Demo Button**: Make the "Use Demo Data" button feel like an AI-powered activation with glow effects.

## Phase 4: Dashboard & Charts Polish
- **Stat Cards**: Standardize with the new "Anti-Gravity" card style.
- **Intelligence Layer**: Enhance the confidence score display.
- **Scatter Plot & Tables**: Refine colors to match the refined quadrant palette.

## Phase 5: Final Transitions & UX
- Smooth transitions between the Landing Page and the Dashboard.
- Responsive design audit for mobile and tablet views.
