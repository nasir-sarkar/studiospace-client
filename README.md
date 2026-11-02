# StudioSpace

**Peer-to-Peer Creative Workspace & Production Studio Sharing Platform**

**Live Website:** https://studiospace-nasir.vercel.app/

StudioSpace is a platform where creators can discover and book creative workspaces, while studio owners can list and manage their studios.

## Features

- **Discover Studios:** Browse studios by category and search, filter, and sort available listings.
- **Featured Studios:** View featured studio spaces displayed dynamically on the homepage.
- **Studio Details:** Explore studio information, images, amenities, host details, ratings, and reviews.
- **User Authentication:** Register and sign in using email/password or Google.
- **Studio Management:** Authenticated hosts can add, update, and delete their studio listings.
- **Booking Management:** Users can request bookings and view their booking status.
- **Booking Conflict Prevention:** Check confirmed bookings to prevent overlapping reservations.
- **Wishlist:** Save studios to a personal wishlist.
- **PDF Invoice:** Generate and download booking invoices.
- **Theme Customization:** Switch between light and dark themes.

## Technology Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Authentication:** Better Auth, MongoDB Adapter, JWT
- **Backend:** Node.js, Express.js, MongoDB
- **Additional Tools:** Swiper, Embla Carousel, Sonner, Lucide React, jsPDF, JOSE

## Local Setup

### Prerequisites

- Node.js and npm
- MongoDB database
- Google OAuth credentials
- ImgBB API key

### 1. Open the project folders

- Download or clone the client and server repositories.
- Open the `studiospace-server` folder in your code editor. Open a terminal directly in this folder.

### 2. Configure and run the backend

Run these commands in the terminal opened inside `studiospace-server`: 

```bash
npm install
```

Create a `.env` file in the backend root:

```env
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
PORT=8000
```

Start the backend:

```bash
npm run dev
```

### 3. Configure and run the frontend

- Open the `studiospace-client` folder in your code editor.
- Open a second terminal directly inside this folder.
- Run the following command in that terminal:

```bash
npm install
```

Create a `.env.local` file in the frontend root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Create the examiner account by running this command in the frontend terminal:

```bash
npm run seed:examiner
```

Start the frontend in the same terminal:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Examiner Test Credentials

- **Email:** examiner@studiospace.dev
- **Password:** Examiner@123
- **Account Name:** Examiner Host
