<h1 align="center">🦷 AIvory – Your Smile's Smartest Companion 🦷</h1>

<p align="center">
  <strong>Modern dental appointment booking platform with AI-powered voice assistant and location-based dentist discovery</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
</p>

---

## ✨ Features

### 🏠 **Landing & Authentication**
- Modern landing page with gradients, animations, and responsive design
- Authentication via Clerk (Google, GitHub, Email & Password)
- Email verification with 6-digit code
- User profile management with Clerk integration

### 📍 **Location-Based Dentist Discovery**
- **Real dentist data** from OpenStreetMap (no fake listings!)
- Location-based search showing dentists within 10km radius
- Interactive map view using Leaflet.js (FREE, no Google Maps API needed)
- List view toggle for easy browsing
- Detailed dentist information: address, phone, opening hours, speciality, distance
- **Completely FREE booking** - no charges, no hidden fees

### � **Appointment Management**
- 3-step booking flow:
  1. Select dentist (map or list view)
  2. Choose date, time, and appointment type
  3. Confirm booking
- Appointment types: Regular Checkup, Teeth Cleaning, Consultation, Emergency Visit
- View upcoming and past appointments
- Cancel appointments functionality
- **Calendar integration**: Download .ics files for Google/Outlook/Apple Calendar
- Email confirmations via Resend API

### 🗣️ **AI Voice Assistant (Premium)**
- Voice-powered dental assistant using Vapi AI
- Available for AI Basic and AI Pro subscribers
- Real-time voice conversations with Riley (AI dental assistant)
- Dental health guidance and pain relief advice
- Appointment scheduling assistance
- Admin gets full access for testing

### 💳 **Subscription Plans**
- **Free Plan**: Book appointments, view dentist details
- **AI Basic ($9/month)**: Voice assistant access
- **AI Pro ($19/month)**: Premium voice features
- Managed through Clerk billing integration
- Admin access bypasses all plan restrictions

### 👨‍⚡ **Admin Dashboard**
- Dedicated admin panel at `/admin`
- Restricted to admin email (musicniteshagarwal@gmail.com)
- Manage doctors and appointments
- View statistics and recent appointments
- Full access to all premium features
- Auto-redirect from `/dashboard` to `/admin` for admin users

### 🎨 **UI/UX**
- Beautiful Tailwind CSS v4 styling
- Shadcn UI component library
- Custom animations (glow-pulse, float, shimmer)
- Dark mode support
- Responsive design for mobile, tablet, desktop
- Custom scrollbars and rounded corners
- Loading states and skeleton loaders

### �️ **Database & Backend**
- PostgreSQL with Neon (serverless)
- Prisma ORM for type-safe database queries
- Auto-generated Prisma Client
- Server actions for data mutations
- TanStack Query for client-side data fetching and caching
- Foreign key relationships and data integrity

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15.5, React 19, TypeScript 5.0 |
| **Styling** | Tailwind CSS 4.0, Shadcn UI |
| **Authentication** | Clerk v6.32.2 (with billing) |
| **Database** | PostgreSQL (Neon), Prisma ORM 6.16.2 |
| **Maps** | Leaflet.js, React-Leaflet, OpenStreetMap |
| **AI Voice** | Vapi AI v2.3.9 |
| **Email** | Resend v6.1.0 |
| **State Management** | TanStack Query v5.89.0 |
| **Calendar** | ICS file generation |
| **Icons** | Lucide React |
| **Deployment** | Vercel/Sevalla compatible |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- Clerk account for authentication
- Vapi AI account (optional, for voice features)
- Resend account for emails

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Niteshagarwal01/AIvory--Your-Smile-s-Smartest-Companion.git
cd AIvory--Your-Smile-s-Smartest-Companion
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Vapi AI (Voice Assistant)
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key

# Admin Email (for admin dashboard access)
ADMIN_EMAIL=your_admin_email@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email@gmail.com

# Resend (Email Service)
RESEND_API_KEY=your_resend_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up database**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
AIvory--Your-Smile-s-Smartest-Companion/
├── prisma/
│   └── schema.prisma              # Database schema
├── public/                        # Static assets
├── src/
│   ├── app/                       # Next.js app directory
│   │   ├── admin/                 # Admin dashboard
│   │   ├── appointments/          # Booking page
│   │   ├── my-appointments/       # User appointments
│   │   ├── voice/                 # AI voice assistant
│   │   ├── pro/                   # Pricing page
│   │   ├── dashboard/             # User dashboard
│   │   └── api/                   # API routes
│   ├── components/                # React components
│   │   ├── admin/                 # Admin components
│   │   ├── appointments/          # Booking flow components
│   │   ├── dashboard/             # Dashboard components
│   │   ├── landing/               # Landing page components
│   │   ├── voice/                 # Voice assistant components
│   │   └── ui/                    # Shadcn UI components
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utilities and configs
│   │   ├── actions/               # Server actions
│   │   ├── auth-utils.ts          # Admin access helpers
│   │   ├── prisma.ts              # Prisma client
│   │   ├── vapi.ts                # Vapi client
│   │   └── utils.ts               # Utility functions
│   └── middleware.ts              # Next.js middleware
├── .env                           # Environment variables
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
└── package.json                   # Dependencies
```

---

## 🔑 Key Features Explained

### Location-Based Dentist Search
- Uses OpenStreetMap Overpass API (FREE, no API key needed)
- Fetches real dentist data based on user's location
- Haversine formula for accurate distance calculation
- Automatic fallback to sample data if no dentists found
- Creates doctor records in database when selected for booking

### Appointment Booking Flow
1. **Dentist Selection**: Browse map/list, view details, select dentist
2. **Time Selection**: Pick date, time slot, and appointment type
3. **Confirmation**: Review details and confirm (FREE booking)
4. **Post-Booking**: Email confirmation + calendar download

### Admin Features
- Admin email gets full pro access automatically
- Redirected to `/admin` instead of `/dashboard`
- Navbar shows "Admin" with shield icon
- All premium features unlocked for testing
- Manage doctors and view appointment statistics

### Voice Assistant Integration
- Vapi AI provides natural voice conversations
- "Riley" assistant with dental expertise prompt
- Real-time transcription and speech synthesis
- Error handling for API failures
- Premium feature with free tier message

---

## 🔐 Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key for client-side | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key for server-side | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | Vapi assistant ID for voice | ⚠️ Optional |
| `NEXT_PUBLIC_VAPI_API_KEY` | Vapi API key | ⚠️ Optional |
| `ADMIN_EMAIL` | Admin user email for dashboard access | ✅ |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Public admin email for client checks | ✅ |
| `RESEND_API_KEY` | Resend API key for emails | ✅ |
| `NEXT_PUBLIC_APP_URL` | Application URL | ✅ |

---

## 📝 Database Schema

### Models
- **User**: Clerk-synced user data
- **Doctor**: Dentist information (from OpenStreetMap or manual)
- **Appointment**: Booking records with status tracking

### Appointment Statuses
- `PENDING`: Awaiting confirmation
- `CONFIRMED`: Confirmed and scheduled
- `COMPLETED`: Past appointment
- `CANCELLED`: Cancelled by user

---

## 🎯 Roadmap

- [ ] SMS notifications for appointments
- [ ] Patient medical history tracking
- [ ] Prescription management
- [ ] Video consultation feature
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Dark mode improvements
- [ ] Mobile app (React Native)
- [ ] Dentist onboarding portal

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Nitesh Agarwal**
- Email: techniteshgamer@gmail.com / musicniteshagarwal@gmail.com
- GitHub: [@Niteshagarwal01](https://github.com/Niteshagarwal01)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.dev/) - Authentication & billing
- [Vapi AI](https://vapi.ai/) - Voice assistant platform
- [OpenStreetMap](https://www.openstreetmap.org/) - Free map data
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Neon](https://neon.tech/) - Serverless PostgreSQL

---

<p align="center">Made with ❤️ and ☕ by Nitesh Agarwal</p>
<p align="center">⭐ Star this repo if you find it helpful!</p>
