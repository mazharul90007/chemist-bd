"use client";

import AdminOverview from "@/components/dashboard/overview/AdminOverview";
import CustomerOverview from "@/components/dashboard/overview/CustomerOverview";
import SellerOverview from "@/components/dashboard/overview/SellerOverview";
import { authClient } from "@/lib/auth-client";

const DashboardPage = () => {
  const { data: session } = authClient.useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRole = (session?.user as any)?.role as string;

  return (
    <div>
      {userRole === "CUSTOMER" && <CustomerOverview />}
      {userRole === "SELLER" && <SellerOverview />}
      {userRole === "ADMIN" && <AdminOverview />}
    </div>
  );
};

export default DashboardPage;
