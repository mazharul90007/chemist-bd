<p align="center">
  <a href="https://res.cloudinary.com/dp6urj3gj/image/upload/v1771919199/chemistBD_ltbdsg.png" target="blank"><img src="https://res.cloudinary.com/dp6urj3gj/image/upload/v1771919199/chemistBD_ltbdsg.png" width="240" alt="Express Logo" /></a>
</p>

  <p align="center">A professional pharmacy and medicine e-commerce scalable application.</p>

# CHEMIST BD CLIENT

**CHEMIST BD CLIENT** is a modern, responsive e-commerce frontend designed for pharmacies. It provides a seamless experience for customers to browse medicines, manage their cart, and place orders, while offering powerful dashboards for sellers and administrators.

🌐 **Frontend Live URL:** [https://chemistbd-client.vercel.app](https://chemistbd-client.vercel.app)  
🌐 **Backend Live URL:** [https://chemist-bd-server.onrender.com](https://chemist-bd-server.onrender.com)  
🌐 **Backend Github URL:** [https://github.com/mazharul90007/chemist-bd-server](https://github.com/mazharul90007/chemist-bd-server)

---

## ✨ Features

### 👤 Customer Experience

- **Dynamic Homepage**: Browse featured categories and recommended medicines.
- **Advanced Search**: Filter medicines by name, category, and availability.
- **Persistent Cart**: Manage items across sessions with real-time updates.
- **Order Tracking**: View order status and history.
- **Profile Management**: Secure account updates and email verification.

### 🏪 Seller Dashboard

- **Inventory Management**: Add, update, and remove medicine listings.
- **Order Management**: Track sales and update order fulfillment status.
- **Sales Analytics**: Overview of selling performance (Overview).

### 🛠️ Admin Dashboard

- **User Management**: Monitor all users and manage account statuses.
- **Category Control**: Create and manage pharmacy categories.
- **System Overview**: High-level statistics of platform activity.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16.1.6)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Radix UI & Shadcn/UI
- **Authentication**: [Better-Auth](https://www.better-auth.com/)
- **API Client**: Axios with interceptors
- **Icons**: Lucide React & React Icons

---

## 📋 Prerequisites

- **Node.js** (v20 or higher)
- **pnpm** or **npm**
- **Backend API Access** (Local or Remote)

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mazharul90007/chemistbd-client.git
cd chemistbd-client
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL="https://chemist-bd-server.onrender.com/api/v1"
```

### 4. Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 📜 Project Structure

- `src/app`: Next.js App Router and page layouts.
- `src/components`: Reusable UI components.
- `src/hooks`: Custom React hooks for data fetching and state.
- `src/lib`: Utility functions and third-party library configurations.
- `src/store`: Zustand store definitions.

---

## 👤 Author

**Mazharul Islam Sourabh**

---

## 📝 License

ISC
