# SporeKart Frontend Design System

## Production UI/UX Skills, Visual Language & Implementation Specification

**Document:** `SPOREKART_FRONTEND_DESIGN_SYSTEM.md`\
**Product:** SporeKart\
**Purpose:** Single source of truth for frontend visual design,
interaction design, accessibility, responsive behavior, typography,
color, components, cards, buttons, forms, navigation, ecommerce UI,
training UI, dashboards, motion and visual quality.

------------------------------------------------------------------------

## 1. Design Direction

SporeKart should feel like a **premium Indian mushroom + cultivation
commerce platform**, not a generic agriculture template.

### Core visual principles

1.  **Natural**
    -   Mushroom, mycelium, soil, roots, farm, grain and cultivation
        inspiration.
    -   Avoid artificial neon agriculture visuals.
2.  **Premium**
    -   Strong typography, restrained colors, generous spacing and
        refined surfaces.
3.  **Trustworthy**
    -   Clear pricing, product information, delivery status, training
        information and business identity.
4.  **Conversion-first**
    -   Every product and training screen should have an obvious next
        action.
5.  **Mobile-first**
    -   Optimized for Indian mobile users, including tier-2/tier-3
        networks and smaller screens.
6.  **Human**
    -   Use real cultivation/product imagery whenever possible.
    -   Avoid excessive AI-generated imagery and unrealistic mushrooms.
7.  **Functional**
    -   Motion must explain hierarchy or state, never distract from
        purchasing.
8.  **Accessible**
    -   Keyboard accessible, readable contrast, visible focus states and
        touch-friendly controls.

### Brand personality

**Keywords:** Natural · Premium · Scientific · Trustworthy · Local ·
Modern · Practical

Avoid:

-   Generic green agriculture templates
-   Excessive gradients
-   Glassmorphism everywhere
-   Neon green
-   Overly rounded cartoon UI
-   Excessive 3D
-   Decorative animation with no UX purpose
-   Tiny text
-   Low-contrast gray text
-   Fake-looking farm imagery

------------------------------------------------------------------------

# 2. Visual Foundation

## 2.1 Color System

Use semantic tokens rather than hard-coding colors throughout
components.

### Brand colors

  Token                      Value       Usage
  -------------------------- ----------- ----------------------------
  `--brand-primary`          `#234D3C`   Primary brand / CTA
  `--brand-primary-hover`    `#1B3D30`   Hover
  `--brand-primary-active`   `#153127`   Pressed
  `--brand-secondary`        `#7A8F5A`   Secondary natural accent
  `--brand-earth`            `#8A6246`   Earth / cultivation accent
  `--brand-gold`             `#C89B3C`   Premium highlights
  `--brand-cream`            `#F6F1E7`   Warm brand background

### Light theme

  Token                 Value
  --------------------- -----------
  `--bg-page`           `#FAFAF7`
  `--bg-surface`        `#FFFFFF`
  `--bg-surface-soft`   `#F4F4EF`
  `--bg-muted`          `#ECEDE7`
  `--text-primary`      `#17231D`
  `--text-secondary`    `#536057`
  `--text-muted`        `#7A847D`
  `--border-default`    `#DDE2DC`
  `--border-strong`     `#C8D0C9`

### Dark theme

Use dark mode selectively. It should remain warm and premium rather than
pure black.

  Token                       Value
  --------------------------- -----------
  `--dark-bg`                 `#111713`
  `--dark-surface`            `#182019`
  `--dark-surface-elevated`   `#202A21`
  `--dark-text-primary`       `#F5F7F2`
  `--dark-text-secondary`     `#C2CCC4`
  `--dark-border`             `#344137`

### Semantic colors

  Token              Value       Meaning
  ------------------ ----------- ---------------------
  `--success`        `#2E7D50`   Successful state
  `--success-soft`   `#E8F4EC`   Success background
  `--warning`        `#B7791F`   Warning
  `--warning-soft`   `#FFF4DD`   Warning background
  `--danger`         `#C44747`   Error / destructive
  `--danger-soft`    `#FCEBEC`   Error background
  `--info`           `#3C6E91`   Informational
  `--info-soft`      `#EAF3F8`   Info background

### Color rules

-   Primary CTA should normally use `--brand-primary`.
-   Gold is an accent, **not a default button color**.
-   Red is reserved for destructive/error states.
-   Do not use more than 1 primary accent + 1 supporting accent in a
    single component.
-   Never rely on color alone to communicate status.

------------------------------------------------------------------------

# 3. Gradients

Gradients must be subtle.

### Approved examples

``` css
--gradient-hero:
  linear-gradient(135deg, #F6F1E7 0%, #FAFAF7 55%, #EEF3EA 100%);

--gradient-brand:
  linear-gradient(135deg, #234D3C 0%, #315F4B 100%);

--gradient-premium:
  linear-gradient(135deg, #234D3C 0%, #7A8F5A 100%);
```

### Rules

-   Prefer gradients for hero backgrounds and special promotional
    sections.
-   Do not use gradients on every card.
-   Avoid rainbow gradients.
-   Avoid bright green-to-yellow gradients.
-   Product photography should remain the visual hero.

------------------------------------------------------------------------

# 4. Typography

## Primary font

**Inter**

Use for:

-   UI
-   Navigation
-   Buttons
-   Forms
-   Product information
-   Dashboard
-   Tables

Recommended weights:

-   400 Regular
-   500 Medium
-   600 SemiBold
-   700 Bold

## Display font

**DM Serif Display** may be used sparingly for premium editorial
headings.

Use only for:

-   Hero statements
-   Major campaign headings
-   Brand storytelling

Do not use it for:

-   Buttons
-   Tables
-   Forms
-   Product metadata
-   Dense dashboard UI

### Type scale

  Style              Size   Weight   Line height
  ------------ ---------- -------- -------------
  Display XL         56px      700          1.05
  Display L          48px      700          1.08
  H1                 40px      700           1.1
  H2                 32px      700          1.15
  H3                 26px      700           1.2
  H4                 22px      600          1.25
  H5                 18px      600           1.3
  Body L             18px      400           1.6
  Body               16px      400          1.55
  Body Small         14px      400           1.5
  Caption            12px      500           1.4
  Button         14--16px      600             1
  Price          22--32px      700             1

### Responsive typography

Desktop:

-   Hero: 48--64px
-   H1: 40px
-   H2: 32px

Mobile:

-   Hero: 32--40px
-   H1: 30--34px
-   H2: 26--28px
-   Body: 15--16px

Never allow headings to create horizontal scrolling.

------------------------------------------------------------------------

# 5. Spacing System

Use a 4px base unit.

``` text
4   = xs
8   = sm
12  = md-small
16  = md
20  = md-large
24  = lg
32  = xl
40  = 2xl
48  = 3xl
64  = 4xl
80  = 5xl
96  = 6xl
128 = section spacing
```

### Component spacing

-   Card internal padding: 20--24px
-   Compact card: 16px
-   Button horizontal padding: 16--20px
-   Form field gap: 16px
-   Section gap: 48--96px
-   Mobile section gap: 40--64px

------------------------------------------------------------------------

# 6. Border Radius

Use a restrained radius system.

  Token               Radius Usage
  ----------------- -------- -----------------
  `--radius-xs`          6px Small controls
  `--radius-sm`          8px Inputs
  `--radius-md`         12px Buttons/cards
  `--radius-lg`         16px Product cards
  `--radius-xl`         20px Feature panels
  `--radius-2xl`        28px Hero containers
  `--radius-pill`      999px Pills/tags

Avoid making every component excessively rounded.

------------------------------------------------------------------------

# 7. Shadows

Shadows should communicate elevation.

``` css
--shadow-xs:
  0 1px 2px rgba(23, 35, 29, 0.05);

--shadow-sm:
  0 2px 8px rgba(23, 35, 29, 0.07);

--shadow-md:
  0 8px 24px rgba(23, 35, 29, 0.10);

--shadow-lg:
  0 16px 40px rgba(23, 35, 29, 0.14);
```

Rules:

-   Default cards: `shadow-xs` or border only.
-   Hover: `shadow-sm` / `shadow-md`.
-   Modal: `shadow-lg`.
-   Avoid heavy floating shadows on every card.

------------------------------------------------------------------------

# 8. Buttons

## Primary button

Purpose: main conversion action.

Examples:

-   Buy Now
-   Add to Cart
-   Register for Training
-   Proceed to Checkout
-   Confirm Order

Design:

``` text
Height: 44–48px
Radius: 10–12px
Horizontal padding: 18–22px
Font: 14–16px / 600
```

States:

-   Default
-   Hover
-   Active
-   Focus
-   Disabled
-   Loading

### Secondary button

Transparent or light surface with brand border.

Use for:

-   View Details
-   Learn More
-   Continue Shopping

### Ghost button

No background and minimal border.

Use sparingly.

### Destructive button

Only for:

-   Delete
-   Cancel order
-   Remove address
-   Destructive admin operations

Never use destructive styling for normal cancellation/navigation.

### Icon buttons

Minimum interactive target:

**44 × 44px**

Examples:

-   Cart
-   Search
-   Wishlist
-   Menu
-   Close
-   Quantity controls

------------------------------------------------------------------------

# 9. Button Micro-interactions

Recommended:

``` css
transition:
  transform 160ms ease,
  background-color 160ms ease,
  border-color 160ms ease,
  box-shadow 160ms ease;
```

Hover:

-   Slight elevation
-   Slight color change
-   Optional `translateY(-1px)`

Active:

-   `translateY(0)`
-   Reduced shadow

Never use:

-   Large bouncing
-   Continuous pulsing
-   Long delays
-   Excessive glow

------------------------------------------------------------------------

# 10. Cards

## Product Card

Structure:

``` text
┌──────────────────────────┐
│                          │
│       Product Image      │
│                          │
├──────────────────────────┤
│ Category / badge         │
│ Product name             │
│ Short descriptor         │
│ ★ Rating                 │
│                          │
│ ₹ Price     ₹MRP         │
│                          │
│ [ Add to Cart ]          │
└──────────────────────────┘
```

Rules:

-   Image is the visual priority.
-   Product name should be readable without truncating excessively.
-   Price must be visually dominant.
-   CTA must remain obvious.
-   Keep card heights consistent in grids.
-   Avoid excessive badges.

### Product image

Recommended ratio:

**4:3** or **1:1**

Use object-fit:

``` css
object-fit: cover;
```

for photography.

------------------------------------------------------------------------

# 11. Product Detail Page

Required hierarchy:

1.  Breadcrumb
2.  Product image gallery
3.  Product name
4.  Rating/reviews
5.  Price
6.  Offer / savings
7.  Availability
8.  Product quantity
9.  Add to Cart
10. Buy Now
11. Delivery information
12. Product details
13. Cultivation/use information
14. FAQs
15. Related products

### Price design

Current selling price:

-   Large
-   Bold
-   High contrast

MRP:

-   Smaller
-   Muted
-   Struck through

Savings:

-   Semantic success color

------------------------------------------------------------------------

# 12. Cart UI

Cart should clearly show:

-   Product image
-   Name
-   Variant/weight
-   Unit price
-   Quantity control
-   Item subtotal
-   Remove
-   Estimated delivery

Order summary:

``` text
Subtotal
Discount
Delivery
Taxes
----------------
Total
[ Proceed to Checkout ]
```

On mobile, use a sticky bottom checkout action.

------------------------------------------------------------------------

# 13. Quantity Controls

Use:

``` text
[ − ]  2  [ + ]
```

Rules:

-   Minimum target: 40--44px
-   Disable minus at minimum quantity.
-   Disable plus at inventory maximum.
-   Update totals immediately.
-   Provide accessible labels.

------------------------------------------------------------------------

# 14. Forms

## Input

Height:

-   Desktop: 44--48px
-   Mobile: 48px

Style:

-   White/light surface
-   1px border
-   8--12px radius
-   Clear focus ring

### Focus

``` css
outline: 2px solid rgba(35, 77, 60, 0.25);
border-color: #234D3C;
```

### Form labels

Always visible.

Never depend on placeholder text as the only label.

### Error

Show:

-   Error icon where useful
-   Short explanation
-   Field-level message

Example:

> Please enter a valid mobile number.

Avoid vague:

> Invalid input.

------------------------------------------------------------------------

# 15. OTP / Authentication UX

For checkout OTP:

-   Show phone number being verified.
-   6-digit OTP input.
-   Auto-advance between digits.
-   Paste support.
-   Countdown.
-   Resend action.
-   Clear error state.
-   Loading state.
-   Success confirmation.

Recommended flow:

``` text
Phone number
     ↓
Send OTP
     ↓
Verify OTP
     ↓
Existing user → autofill profile
New user → create profile
     ↓
Address
     ↓
Payment
```

Do not force account creation before the customer understands why
authentication is needed.

------------------------------------------------------------------------

# 16. Navigation

## Desktop header

Recommended:

``` text
Logo | Shop | Mushrooms | Spawn | Kits | Training | About | Search | Account | Cart
```

Keep the most important actions visible.

## Mobile header

``` text
☰   SporeKart       Search   Cart
```

Use a bottom navigation only if it materially improves frequent
navigation.

Possible mobile navigation:

-   Home
-   Shop
-   Training
-   Orders
-   Account

------------------------------------------------------------------------

# 17. Hero Section

Hero should communicate the product value within seconds.

Recommended structure:

``` text
Eyebrow
Strong headline
One-sentence value proposition

[ Shop Products ] [ Explore Training ]

Trust indicators / supporting information

Real mushroom / cultivation imagery
```

Example direction:

> **Grow Better. Harvest Smarter.**

Supporting copy:

> Quality mushroom products, spawn, growing kits and practical
> cultivation training from SporeKart.

Avoid generic:

> Welcome to our agriculture website.

------------------------------------------------------------------------

# 18. Homepage Sections

Recommended order:

1.  Hero
2.  Trust / proof strip
3.  Featured products
4.  Mushroom categories
5.  Why SporeKart
6.  Cultivation kits
7.  Training
8.  How it works
9.  Testimonials
10. Educational content
11. FAQ
12. Final CTA
13. Footer

------------------------------------------------------------------------

# 19. Training UI

Training should not look like a normal ecommerce product.

Training card should show:

-   Training title
-   Skill level
-   Duration
-   Mode
-   Date/batch
-   Seats
-   Trainer
-   Location/online
-   Price
-   Register CTA

Example:

``` text
Mushroom Cultivation — Beginner

Duration     2 Days
Mode         Practical
Batch        24 Aug
Seats        12 remaining

₹2,499

[ Register Now ]
```

------------------------------------------------------------------------

# 20. Training Batch Dashboard

Admin needs:

-   Batch list
-   Capacity
-   Registered
-   Remaining seats
-   Date
-   Trainer
-   Status
-   Registrations
-   Attendance
-   Export

Use tables on desktop and stacked cards on mobile.

------------------------------------------------------------------------

# 21. Admin Dashboard

Admin UI should prioritize information density while remaining clean.

Primary dashboard sections:

-   Orders
-   Revenue
-   Products
-   Inventory
-   Training
-   Customers
-   Growers
-   Leads
-   Payments
-   Fulfillment
-   Content
-   Reports
-   Settings

### KPI cards

``` text
Revenue
₹1,24,500
+12.4% this month
```

Do not use huge decorative numbers with no context.

------------------------------------------------------------------------

# 22. Seller Architecture UI

Current model is single-seller.

Design the UI so future marketplace support can be added without
redesigning the entire component system.

Future seller-aware product metadata may include:

``` text
Seller
Seller rating
Fulfillment
Seller location
```

Do not expose marketplace terminology unnecessarily in the current
single-seller experience.

------------------------------------------------------------------------

# 23. Status Badges

Approved statuses:

### Orders

-   Pending
-   Confirmed
-   Processing
-   Packed
-   Shipped
-   Delivered
-   Cancelled
-   Refunded

### Training

-   Upcoming
-   Open
-   Almost Full
-   Full
-   Completed
-   Cancelled

### Inventory

-   In Stock
-   Low Stock
-   Out of Stock

Badges should use:

-   Short labels
-   Semantic colors
-   Optional icons

------------------------------------------------------------------------

# 24. Tables

Desktop:

-   Sticky header where useful
-   Row hover
-   Consistent alignment
-   Numeric columns right-aligned
-   Actions at far right

Mobile:

Do not force huge horizontal tables.

Convert important records into:

``` text
Order #SK1024
₹2,499
Delivered
24 Aug

[View]
```

------------------------------------------------------------------------

# 25. Modals

Use modals only for focused tasks.

Examples:

-   Confirm cancellation
-   Delete item
-   Edit address
-   View order details
-   Admin quick edit

Modal structure:

``` text
Title
Short explanation

Content

[Cancel] [Confirm]
```

Never hide critical information inside nested modal chains.

------------------------------------------------------------------------

# 26. Toast Notifications

Use for lightweight confirmation.

Examples:

> Added to cart.

> Address saved.

> Training registration successful.

Do not use toast notifications for critical errors requiring user
action.

------------------------------------------------------------------------

# 27. Empty States

Every major data view needs an intentional empty state.

Example cart:

``` text
Your cart is waiting for something good.

Explore mushrooms, spawn and cultivation kits.

[ Continue Shopping ]
```

Example orders:

``` text
No orders yet.

Your next harvest could start here.

[ Explore Products ]
```

------------------------------------------------------------------------

# 28. Loading States

Use skeleton loaders instead of blank screens.

### Product skeleton

``` text
Image skeleton
Title skeleton
Price skeleton
CTA skeleton
```

Avoid:

-   Full-page spinners for normal navigation
-   Long blocking loaders
-   Layout jumping after data loads

For slow networks:

-   Render shell immediately.
-   Prioritize critical content.
-   Lazy-load secondary images.
-   Show meaningful progress when operations take time.

------------------------------------------------------------------------

# 29. Error States

Error pages should explain:

1.  What happened
2.  What the user can do
3.  How to continue

Example:

> Something went wrong while loading your orders.

> Please try again. Your previous orders are not affected.

`[ Try Again ]`

------------------------------------------------------------------------

# 30. Responsive Design

## Breakpoints

Recommended:

``` text
xs: 0–479
sm: 480–639
md: 640–767
lg: 768–1023
xl: 1024–1279
2xl: 1280+
```

Do not design exclusively around device names.

Use content-driven breakpoints.

### Mobile rules

-   Minimum tap target: 44px
-   Avoid tiny controls.
-   Keep primary CTA within thumb reach.
-   Use sticky checkout CTA where appropriate.
-   Avoid horizontal scrolling except intentional carousels.
-   Use compressed navigation.
-   Reduce decorative motion.
-   Preserve readable text.

------------------------------------------------------------------------

# 31. Mobile Commerce UX

Mobile checkout should be:

``` text
Cart
 ↓
Contact / OTP
 ↓
Address
 ↓
Delivery
 ↓
Payment
 ↓
Confirmation
```

Avoid unnecessary steps.

Use sticky bottom CTA:

``` text
Total ₹2,499     [ Continue ]
```

------------------------------------------------------------------------

# 32. Imagery

Preferred visual hierarchy:

1.  Real SporeKart product photography
2.  Real cultivation photography
3.  High-quality mushroom photography
4.  Carefully art-directed illustrations
5.  AI-generated imagery only where realistic photography is unavailable

### Mushroom imagery rules

Mushrooms should look:

-   Naturally cultivated
-   Anatomically realistic
-   Correctly colored
-   Properly textured
-   Fresh
-   Indian-market relevant

Avoid:

-   Oversaturated mushrooms
-   Floating mushrooms
-   Impossible shapes
-   Plastic-looking textures
-   Fantasy agriculture imagery

------------------------------------------------------------------------

# 33. Iconography

Use one consistent icon family.

Recommended:

**Lucide Icons**

Style:

-   1.5--2px stroke
-   Simple
-   Rounded where appropriate
-   No mixed icon families

Avoid mixing:

-   Filled icons
-   Outline icons
-   Emoji
-   3D icons

unless deliberately used for a specific marketing section.

------------------------------------------------------------------------

# 34. Badges

Good:

``` text
Best Seller
New
Low Stock
10% OFF
Beginner
Upcoming
```

Bad:

``` text
SUPER AMAZING!!!
HOT!!!
BEST EVER!!!
```

Keep badges short and factual.

------------------------------------------------------------------------

# 35. Search UX

Search should support:

-   Products
-   Spawn
-   Mushroom types
-   Growing kits
-   Training
-   Educational content

Search states:

``` text
Idle
Focused
Typing
Loading
Results
No results
Error
```

No-result state should suggest alternatives.

------------------------------------------------------------------------

# 36. Product Filtering

Desktop:

-   Sidebar filters

Mobile:

-   Filter button
-   Bottom sheet / drawer

Useful filters:

-   Category
-   Product type
-   Price
-   Availability
-   Weight
-   Training level where relevant

Do not expose irrelevant filters.

------------------------------------------------------------------------

# 37. SEO / GEO / AEO UI Considerations

Frontend content should support machine-readable, user-readable
information.

Every important product page should have:

-   Clear H1
-   Product name
-   Product category
-   Description
-   Price
-   Availability
-   Weight
-   FAQs
-   Shipping information
-   Cultivation/use information

Use semantic HTML:

``` html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Do not replace semantic structure with generic `<div>` elements
everywhere.

------------------------------------------------------------------------

# 38. Accessibility

Target:

**WCAG 2.2 AA**

Requirements:

-   Keyboard navigation
-   Visible focus
-   Semantic HTML
-   Form labels
-   Alt text
-   Accessible buttons
-   Accessible dialogs
-   Sufficient contrast
-   Reduced-motion support
-   No color-only status communication

### Reduced motion

Respect:

``` css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

------------------------------------------------------------------------

# 39. Motion Design

Motion should communicate:

-   Navigation
-   State change
-   Hierarchy
-   Feedback

Recommended durations:

``` text
Micro interaction: 120–180ms
Component transition: 180–260ms
Panel transition: 240–360ms
Page transition: 300–500ms
```

Use easing such as:

``` text
ease-out
ease-in-out
```

Avoid:

-   Infinite decorative animations
-   Excessive parallax
-   Heavy particle effects
-   Long intro animations
-   Motion that blocks shopping

------------------------------------------------------------------------

# 40. Scroll / 3D Effects

SporeKart may use Three.js or WebGL for premium storytelling.

Use only where it adds value.

Good:

-   Mycelium growth story
-   Mushroom lifecycle
-   Product reveal
-   Cultivation journey

Bad:

-   3D product cards everywhere
-   Heavy WebGL on checkout
-   Animated backgrounds on admin
-   Large assets that delay first content

Always provide a lightweight fallback.

------------------------------------------------------------------------

# 41. Glass / Blur Effects

Use sparingly.

Approved:

-   Floating navigation over hero
-   Search overlay
-   Special marketing panels

Avoid:

-   Glassmorphism on every card
-   Low-contrast text over blur
-   Heavy backdrop filters on mobile

------------------------------------------------------------------------

# 42. Product Grid

Desktop:

``` text
4 columns
```

Tablet:

``` text
2–3 columns
```

Mobile:

``` text
2 columns
```

For very information-heavy products:

``` text
1 column
```

Maintain consistent card height.

------------------------------------------------------------------------

# 43. Section Headers

Pattern:

``` text
Eyebrow
Section title
Supporting sentence
Optional action
```

Example:

``` text
SHOP SPOREKART

Products built around your cultivation journey.

[ View All ]
```

------------------------------------------------------------------------

# 44. Footer

Footer should include:

### Company

-   About SporeKart
-   Shriyap Enterprise
-   Contact

### Shop

-   Fresh Mushrooms
-   Dry Mushrooms
-   Spawn
-   Growing Kits

### Training

-   Cultivation Training
-   Upcoming Batches
-   Support

### Support

-   Contact
-   Shipping
-   Returns
-   FAQs

### Trust

-   Terms
-   Privacy
-   Refund Policy

Include business identity and location information where appropriate.

------------------------------------------------------------------------

# 45. Design Tokens

Use CSS variables.

Example:

``` css
:root {
  --color-primary: #234D3C;
  --color-primary-hover: #1B3D30;
  --color-secondary: #7A8F5A;
  --color-accent: #C89B3C;

  --color-bg: #FAFAF7;
  --color-surface: #FFFFFF;
  --color-text: #17231D;
  --color-text-secondary: #536057;
  --color-border: #DDE2DC;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  --shadow-sm: 0 2px 8px rgba(23, 35, 29, 0.07);
  --shadow-md: 0 8px 24px rgba(23, 35, 29, 0.10);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

------------------------------------------------------------------------

# 46. Component Architecture

Recommended component layers:

``` text
UI Primitives
├── Button
├── Input
├── Select
├── Badge
├── IconButton
├── Spinner
├── Skeleton
├── Modal
├── Toast
└── Tooltip

Commerce Components
├── ProductCard
├── ProductGallery
├── PriceDisplay
├── QuantitySelector
├── CartItem
├── OrderSummary
├── AddressCard
└── CheckoutStep

Training Components
├── TrainingCard
├── TrainingBatchCard
├── TrainingRegistration
├── SeatIndicator
└── TrainingStatus

Admin Components
├── KPICard
├── DataTable
├── FilterBar
├── StatusBadge
├── ActivityFeed
└── DashboardPanel

Layout
├── Header
├── Footer
├── PageContainer
├── Section
├── Sidebar
├── Drawer
└── BottomNavigation
```

------------------------------------------------------------------------

# 47. Component Quality Rules

Every reusable component must define:

-   Default state
-   Hover state
-   Focus state
-   Active state
-   Disabled state
-   Loading state
-   Error state where relevant
-   Empty state where relevant
-   Mobile behavior
-   Accessibility behavior

Do not consider a component complete because the default state looks
good.

------------------------------------------------------------------------

# 48. Design QA Checklist

Before accepting any frontend screen:

### Visual

-   [ ] Typography hierarchy is obvious
-   [ ] Spacing follows the system
-   [ ] Colors use semantic tokens
-   [ ] Cards have consistent treatment
-   [ ] Buttons have consistent sizing
-   [ ] No unnecessary gradients
-   [ ] No visual clutter

### UX

-   [ ] Primary action is obvious
-   [ ] User knows what happens next
-   [ ] Loading state exists
-   [ ] Error state exists
-   [ ] Empty state exists
-   [ ] Forms provide clear validation

### Mobile

-   [ ] Tested at 360px width
-   [ ] Tested at 390px width
-   [ ] Tested at 430px width
-   [ ] No horizontal overflow
-   [ ] Buttons are touch-friendly
-   [ ] Checkout is easy to complete
-   [ ] Images do not dominate the viewport

### Accessibility

-   [ ] Keyboard navigation
-   [ ] Visible focus
-   [ ] Semantic headings
-   [ ] Alt text
-   [ ] Labels
-   [ ] Contrast
-   [ ] Reduced motion

### Performance

-   [ ] Images optimized
-   [ ] Lazy loading where appropriate
-   [ ] No unnecessary WebGL
-   [ ] No blocking animations
-   [ ] Critical content renders quickly
-   [ ] Mobile network behavior tested

------------------------------------------------------------------------

# 49. Anti-Patterns

Never introduce:

-   Generic Bootstrap-looking UI
-   Excessive rounded rectangles
-   Random font combinations
-   Neon green agriculture branding
-   Excessive black backgrounds
-   Excessive gold
-   Huge shadows
-   Excessive gradients
-   AI-looking mushroom imagery
-   Unnecessary animations
-   Tiny buttons
-   Text embedded inside images
-   Fake review counts
-   Fake scarcity
-   Dark patterns
-   Forced login before necessary
-   Full-screen loaders for simple requests
-   Desktop-only layouts
-   Unstructured admin dashboards

------------------------------------------------------------------------

# 50. Definition of Done

A SporeKart frontend feature is **design-complete** only when:

``` text
Visual design
      +
Responsive behavior
      +
Interaction states
      +
Loading states
      +
Error states
      +
Empty states
      +
Accessibility
      +
Performance
      +
Real-data behavior
      +
Mobile QA
      =
Production-ready UI
```

------------------------------------------------------------------------

# 51. Agent Implementation Rules

When an AI coding agent modifies the frontend:

1.  Read this file before modifying UI.
2.  Reuse existing design tokens before creating new ones.
3.  Reuse existing components before creating duplicates.
4.  Do not introduce a new color without justification.
5.  Do not introduce a new font without explicit approval.
6.  Do not introduce a new border-radius scale.
7.  Do not redesign unrelated pages during a bug fix.
8.  Preserve working business logic.
9.  Separate visual changes from API/business logic changes where
    possible.
10. Test desktop and mobile.
11. Test loading/error/empty states.
12. Run the application locally after changes.
13. Verify the browser console has no new errors.
14. Verify API failures produce usable UI.
15. Verify checkout and authentication flows remain functional.
16. Verify admin routes remain protected.
17. Verify public pages remain accessible without unnecessary login.
18. Do not expose secrets in frontend code.
19. Do not ship debug links or internal admin links in public
    navigation.
20. Document significant design-system changes.

------------------------------------------------------------------------

# 52. Final Design Principle

SporeKart should look like:

> **A modern Indian mushroom company that understands cultivation,
> ecommerce and its customers.**

It should not look like:

> **A generic AI-generated agriculture website.**

Every visual decision should answer at least one question:

**Does this improve trust, clarity, conversion, usability or brand
recognition?**

If not, remove it.
