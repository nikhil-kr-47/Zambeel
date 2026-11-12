# Zambeel Portal Frontend Clone

Pixel-perfect, responsive React frontend clone of the **[Zambeel Portal](https://portal.myzambeel.com/)** dropshipping and sourcing platform.

## 🚀 Features Implemented

1. **Top Urgent Alert Notice Banner**:
   - Bright yellow warning bar with alert icons and live tracking text regarding KSA/UAE logistics.
   - Dismissible and animated ticker.

2. **Top Navigation Bar**:
   - Stylized **Zambeel Logo** with brand accents.
   - Language selector dropdown (`اللغة` / Arabic & English toggle).
   - Notification bell with unread badge & drop-down alerts.
   - User account avatar and dropdown menu.

3. **Dark Indigo/Purple Sidebar**:
   - Merchant / Agency role segment switch.
   - Navigation links with active indicators and yellow accent pill:
     - **Get Started** (Country selection & onboarding)
     - **Dashboard** (GCC regional metrics, top performing markets, revenue graphs)
     - **Orders** (Matching screenshot)
     - **Orders Analytics**
     - **Gold Subscription**
     - **My Invoice** (Matching screenshot)
     - **Bank Accounts**
     - **Settings** (`/settings` page)
   - Bottom **Zambeel WhatsApp Support** widget with direct "Chat with Us" action.

4. **Pages Included**:
   - **Get Started (`/get-started`)**:
     - "Welcome to Zambeel" gradient banner.
     - "Why Choose Zambeel?" with 4 feature cards (9 countries, dedicated account manager, 80% delivery ratio on COD, weekly guaranteed payments).
     - "Select Country Where You Want To Start" with all 9 country cards: Pakistan 🇵🇰, UAE 🇦🇪, KSA 🇸🇦, Iraq 🇮🇶, Qatar 🇶🇦, Kuwait 🇰🇼, Oman 🇴🇲, Bahrain 🇧🇭, and USA 🇺🇸.
     - Interactive modal for each country detailing available services (COD fulfillment, last-mile delivery, customs clearance, etc.).
   - **Orders (`/orders`)**:
     - Exact empty state from reference screenshot ("Orders with Zambeel", "0 Orders", "No Orders Found", 9 table columns, pagination).
     - Switchable **Populated Demo Data** toggle with status badges, country filters, search bar, and CSV export.
   - **My Invoices (`/my-invoices`)**:
     - Exact empty state from reference screenshot ("Invoices", "Select Store" dropdown, dollar voucher icon, "No Invoices Found").
     - Populated remittance statements when a store is chosen, with itemized breakdown modal (Gross COD, product sourcing costs, courier fees, net payout to bank).
   - **Settings (`/settings`)**:
     - Profile & Business information.
     - Store integrations (Shopify, Salla, WooCommerce, Zid).
     - Payout bank details (Emirates NBD IBAN, weekly remittance schedule).
     - Automated COD dispatch and WhatsApp customer verification settings.

## 🛠️ Tech Stack

- **React 19**
- **Vite 6**
- **Tailwind CSS 3**
- **Lucide React** (featherweight, crisp SVG icons)

## 💻 How to Run

1. Navigate to the project directory:
   ```bash
   cd /Users/nikhilkumarkushwaha/Documents/NikswebD/zambeel-portal
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open in your browser:
   ```
   http://localhost:5173/
   ```
