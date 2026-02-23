"use client";

import Link from "next/link";
import {
  Package,
  Calendar,
  Clock,
  ArrowRight,
  Loader2,
  MapPin,
  Circle,
} from "lucide-react";
import { useMyOrders } from "@/hooks/useOrder";
import { Badge } from "@/components/ui/badge";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { OrderStatus } from "@/types/order.type";
import { Button } from "@/components/ui/button";

const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
  PENDING: { color: "text-orange-500 bg-orange-500/10", label: "Pending" },
  CONFIRMED: { color: "text-blue-500 bg-blue-500/10", label: "Confirmed" },
  PACKAGING: { color: "text-indigo-500 bg-indigo-500/10", label: "Packaging" },
  ON_THE_WAY: {
    color: "text-purple-500 bg-purple-500/10",
    label: "On The Way",
  },
  DELIVERED: { color: "text-green-500 bg-green-500/10", label: "Delivered" },
  CANCELED: { color: "text-red-500 bg-red-500/10", label: "Canceled" },
};

const OrdersPage = () => {
  const { data, isLoading } = useMyOrders();
  const orders = data?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
        <p className="text-zinc-500 font-medium animate-pulse">
          Fetching your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
            My <span className="text-emerald-600">Orders</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            Manage and track all your medicine deliveries
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] p-12 md:p-20 text-center flex flex-col items-center border border-zinc-100 dark:border-zinc-800">
            <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Package size={32} className="text-zinc-300" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">
              No orders yet
            </h2>
            <p className="text-zinc-500 font-medium max-w-xs mx-auto mb-8">
              You have not placed any orders yet. Start exploring our medicines!
            </p>
            <Link href="/medicines">
              <Button className="rounded-xl px-10 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-zinc-900/5 transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Left Side: Basic Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-600 transition-colors">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">
                          Order Number
                        </p>
                        <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                          #{order.orderNo}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Calendar size={14} />
                        <span className="text-xs font-bold text-zinc-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border-none ${
                            statusConfig[order.status].color
                          }`}
                        >
                          <Circle size={8} className="mr-1 fill-current" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Items Summary */}
                  <div className="flex-1 max-w-md">
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock size={12} className="text-zinc-400" />
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                          Items Detail
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.orderItems.slice(0, 2).map((item) => (
                          <p
                            key={item.id}
                            className="text-xs font-bold text-zinc-600 dark:text-zinc-400 flex justify-between"
                          >
                            <span>
                              {item.medicine.name} × {item.quantity}
                            </span>
                            <span>
                              Tk {(item.unitPrice * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        ))}
                        {order.orderItems.length > 2 && (
                          <p className="text-[10px] text-emerald-600 font-bold">
                            + {order.orderItems.length - 2} more items
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Price & Total */}
                  <div className="flex flex-col items-end justify-between min-w-37.5">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                        Total Amount
                      </p>
                      <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter flex items-center justify-end gap-0.5">
                        <FaBangladeshiTakaSign
                          size={18}
                          className="text-emerald-600"
                        />
                        {order.totalAmount.toFixed(2)}
                      </div>
                    </div>

                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button
                        variant="ghost"
                        className="group/btn h-10 px-4 rounded-xl text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 font-black text-[10px] uppercase tracking-widest transition-all"
                      >
                        View Receipt
                        <ArrowRight
                          size={14}
                          className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                        />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Footer Expand: Address */}
                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3 text-zinc-500">
                  <MapPin size={14} className="text-emerald-600" />
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight truncate max-w-md">
                    Deliver to: {order.shippingAddress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
