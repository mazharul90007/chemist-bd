"use client";

import React from "react";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useAdmin";
import UserListTable from "@/components/dashboard/admin/UserListTable";

const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("");

  // Debounce search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useUsers({
    searchTerm: debouncedSearch || undefined,
    role: role || undefined,
    status: status || undefined,
  });

  const users = usersData?.data || [];

  const resetFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setRole("");
    setStatus("");
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
            Manage <span className="text-emerald-600">Users</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            Monitor system activity and manage user access permissions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
          {/* Search Input */}
          <div className="relative group w-full md:w-64">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-600 transition-colors"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name or email..."
              className="h-14 w-full pl-12 pr-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 transition-all font-bold text-sm shadow-sm"
            />
          </div>

          {/* Role Filter */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-14 px-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 transition-all font-bold text-sm shadow-sm cursor-pointer appearance-none min-w-35"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="SELLER">Seller</option>
            <option value="CUSTOMER">Customer</option>
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-14 px-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 transition-all font-bold text-sm shadow-sm cursor-pointer appearance-none min-w-35"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="BLOCKED">Blocked</option>
          </select>

          <div className="flex items-center gap-3">
            {(searchTerm || role || status) && (
              <Button
                onClick={resetFilters}
                variant="ghost"
                className="h-14 px-6 rounded-2xl font-bold text-zinc-500 hover:text-rose-600 transition-colors"
              >
                Reset
              </Button>
            )}
            <Button
              onClick={() => refetch()}
              className="w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all hover:rotate-180 duration-500 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <RefreshCw size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="min-h-100 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] flex items-center justify-center shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="animate-spin text-emerald-600" size={32} />
            <p className="text-zinc-500 font-black text-[10px] uppercase tracking-widest animate-pulse">
              Filtering directory...
            </p>
          </div>
        </div>
      ) : (
        <UserListTable users={users} />
      )}
    </div>
  );
};

export default AdminUsersPage;
