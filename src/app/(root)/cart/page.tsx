"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  useMyCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/useCart";
import { ICartItem } from "@/types/cart.type";

const CartPage = () => {
  const { data, isLoading, error } = useMyCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: updateQuantity, isPending: isUpdating } =
    useUpdateCartQuantity();
  console.log(data);

  const cart = data?.data;
  const cartItems = cart?.cartItems || [];

  const totalPrice = cartItems.reduce(
    (acc: number, item: ICartItem) =>
      acc + (item.medicine.price || 0) * item.quantity,
    0,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-zinc-950">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
        <p className="text-zinc-500 font-medium animate-pulse">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-zinc-950 px-4">
        <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/20 text-center max-w-md">
          <p className="text-red-500 font-bold text-lg mb-2">
            Oops! Something went wrong.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Failed to load your cart. Please try again later.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="rounded-xl font-bold"
          >
            Retry Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <Link
                href="/medicines"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-600 transition-colors text-sm font-bold uppercase tracking-wider mb-6 group"
              >
                <ChevronLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to Shop
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                Shopping <span className="text-emerald-600">Cart</span>
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2 font-medium">
                You have{" "}
                <span className="text-emerald-600 font-bold">
                  {cartItems.length} items
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-12 md:p-20 text-center flex flex-col items-center shadow-sm">
              <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-8 border border-zinc-100 dark:border-zinc-800">
                <ShoppingBag
                  size={40}
                  className="text-zinc-300 dark:text-zinc-600"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
                Your cart is empty
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto font-medium">
                Looks like you have not added anything to your cart yet. Explore
                our wide range of medicines and healthcare products.
              </p>
              <Link href="/medicines">
                <Button className="py-6 px-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold group cursor-pointer">
                  Start Shopping
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Product List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {cartItems.map((item: ICartItem) => (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl p-3 md:p-4 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] dark:hover:shadow-none transition-all flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  >
                    {/* Item Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-800 shrink-0">
                      <Image
                        src={
                          item.medicine.photoUrl || "/assets/images/noImg.jpg"
                        }
                        alt={item.medicine.name || "Medicine"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-1 mb-3">
                        {item.medicine.company && (
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.15em]">
                            {item.medicine.company}
                          </span>
                        )}
                        <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 truncate tracking-tight">
                          {item.medicine.name}
                        </h3>
                        {item.medicine.strength && (
                          <span className="text-xs text-zinc-500 font-medium">
                            {item.medicine.strength}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter flex items-center gap-0.5">
                          <span>
                            <FaBangladeshiTakaSign size={18} />{" "}
                          </span>{" "}
                          {((item.medicine.price || 0) * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                            Tk {(item.medicine.price || 0).toFixed(2)} x {item.quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-2xl border border-zinc-100 dark:border-zinc-800 w-full sm:w-auto justify-between sm:justify-start">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-xl hover:bg-white dark:hover:bg-zinc-700 text-zinc-500 hover:text-emerald-600 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600 disabled:opacity-30 cursor-pointer"
                        onClick={() =>
                          updateQuantity({
                            cartItemId: item.id,
                            type: "decrement",
                          })
                        }
                        disabled={item.quantity <= 1 || isUpdating}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-8 text-center font-black text-zinc-900 dark:text-zinc-50 text-base tabular-nums">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-xl hover:bg-white dark:hover:bg-zinc-700 text-zinc-500 hover:text-emerald-600 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600 disabled:opacity-30 cursor-pointer"
                        onClick={() =>
                          updateQuantity({
                            cartItemId: item.id,
                            type: "increment",
                          })
                        }
                        disabled={isUpdating}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-11 w-11 rounded-2xl text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors shrink-0"
                      onClick={() => removeFromCart(item.id)}
                      disabled={isRemoving}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[5rem]" />

                  <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-8 tracking-tight">
                    Order Summary
                  </h2>

                  <div className="flex flex-col gap-5 mb-8">
                    <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400 font-medium">
                      <span>Subtotal</span>
                      <span className="text-zinc-900 dark:text-zinc-50 font-bold flex items-center gap-1">
                        <span>
                          <FaBangladeshiTakaSign />
                        </span>{" "}
                        {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400 font-medium">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-bold">Free</span>
                    </div>
                    <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full my-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Total
                      </span>
                      <span className="text-3xl font-black text-emerald-600 tracking-tighter">
                        Tk {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer">
                    Proceed to Checkout
                    <ArrowRight
                      size={20}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>

                  <p className="mt-6 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed px-4">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CartPage;
