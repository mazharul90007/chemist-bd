"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  User as UserIcon,
  MapPin,
  Phone,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IOrder, OrderStatus } from "@/types/order.type";
import { useUpdateOrderStatus } from "@/hooks/useOrder";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface OrderListTableProps {
  orders: IOrder[];
}

const statusConfig: Record<
  OrderStatus,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { label: string; color: string; icon: any }
> = {
  PENDING: {
    label: "Pending",
    color:
      "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30",
    icon: Clock,
  },
  CONFIRMED: {
    label: "Confirmed",
    color:
      "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30",
    icon: CheckCircle2,
  },
  PACKAGING: {
    label: "Packaging",
    color:
      "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-900/30",
    icon: Package,
  },
  ON_THE_WAY: {
    label: "On The Way",
    color:
      "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    color:
      "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30",
    icon: CheckCircle2,
  },
  CANCELED: {
    label: "Canceled",
    color:
      "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30",
    icon: XCircle,
  },
};

const OrderListTable = ({ orders }: OrderListTableProps) => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  const toggleExpand = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const handleStatusUpdate = (orderId: string, status: OrderStatus) => {
    updateStatus({ id: orderId, status });
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center shadow-2xl shadow-zinc-200/20 dark:shadow-none">
        <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-ping" />
          <Package
            size={48}
            className="text-zinc-200 dark:text-zinc-700 relative z-10"
          />
        </div>
        <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          No Orders Yet
        </h3>
        <p className="text-zinc-500 max-w-sm leading-relaxed">
          Your order history is currently empty. When customers purchase your
          medicines, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-2xl shadow-zinc-200/20 dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-50 dark:border-zinc-800/50">
              <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                Order Info
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                Customer
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                Amount
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                Status
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/20">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const isExpanded = expandedOrders.has(order.id);

              return (
                <React.Fragment key={order.id}>
                  <tr
                    className={cn(
                      "group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all",
                      isExpanded && "bg-zinc-50/30 dark:bg-zinc-800/10",
                    )}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/30">
                          <Package className="text-emerald-600" size={20} />
                        </div>
                        <div>
                          <p className="font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none mb-1.5 uppercase">
                            #{order.orderNo}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            <Calendar size={12} />
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                          <UserIcon size={18} className="text-zinc-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-1">
                            {order.customer?.name}
                          </p>
                          <p className="text-xs font-medium text-zinc-400 truncate max-w-37.5">
                            {order.customer?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none mb-1">
                          {order.totalAmount}{" "}
                          <span className="text-[10px] text-zinc-400 font-bold uppercase ml-0.5">
                            TK
                          </span>
                        </p>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em]">
                          {order.paymentStatus}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all",
                          status.color,
                        )}
                      >
                        <status.icon size={12} />
                        {status.label}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <div className="relative group/status">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 rounded-xl px-4 border-zinc-200 dark:border-zinc-800 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                          >
                            Status
                            <ChevronDown
                              size={14}
                              className="ml-2 opacity-50"
                            />
                          </Button>
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 py-2 hidden group-hover/status:block z-20 animate-in fade-in zoom-in-95 duration-200">
                            {(Object.keys(statusConfig) as OrderStatus[]).map(
                              (s) => (
                                <button
                                  key={s}
                                  onClick={() =>
                                    handleStatusUpdate(order.id, s)
                                  }
                                  className={cn(
                                    "w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800",
                                    order.status === s
                                      ? "text-emerald-600"
                                      : "text-zinc-400",
                                  )}
                                >
                                  {statusConfig[s].label}
                                </button>
                              ),
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleExpand(order.id)}
                          className={cn(
                            "h-10 w-10 rounded-xl transition-all cursor-pointer",
                            isExpanded
                              ? "bg-zinc-900 text-white hover:bg-zinc-800"
                              : "bg-zinc-50 dark:bg-zinc-800 text-zinc-400",
                          )}
                        >
                          {isExpanded ? (
                            <ChevronUp size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <tr className="bg-zinc-50/20 dark:bg-zinc-950/20 transition-all">
                      <td colSpan={5} className="px-8 py-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div className="space-y-8">
                            <div>
                              <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Package
                                  size={14}
                                  className="text-emerald-500"
                                />
                                Order Items ({order.orderItems.length})
                              </h4>
                              <div className="space-y-4">
                                {order.orderItems.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm"
                                  >
                                    <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
                                        <Package
                                          size={18}
                                          className="text-zinc-400"
                                        />
                                      </div>
                                      <div>
                                        <p className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-1">
                                          {item.medicine.name}
                                        </p>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                          QTY: {item.quantity} x{" "}
                                          {item.unitPrice} TK
                                        </p>
                                      </div>
                                    </div>
                                    <p className="font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                                      {item.quantity * item.unitPrice} TK
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-8">
                            <div>
                              <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Truck size={14} className="text-emerald-500" />
                                Delivery Details
                              </h4>
                              <div className="space-y-6 bg-white dark:bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                <div className="flex gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/30">
                                    <MapPin
                                      size={18}
                                      className="text-emerald-600"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">
                                      Shipping Address
                                    </p>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 leading-relaxed max-w-xs">
                                      {order.shippingAddress}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/30">
                                    <Phone
                                      size={18}
                                      className="text-emerald-600"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">
                                      Contact Number
                                    </p>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-wider leading-relaxed">
                                      {order.contactNumber}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListTable;
