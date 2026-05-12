"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, Calendar, CreditCard, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Purchase, User } from "@/lib/types";
import { getUserPurchases } from "@/lib/services/userService";

interface PurchaseModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ user, isOpen, onClose }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setLoading(true);
      getUserPurchases(user._id).then((data) => {
        setPurchases(data);
        setLoading(false);
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="text-green-500" size={16} />;
      case "pending": return <Clock className="text-amber-500" size={16} />;
      case "failed": return <AlertCircle className="text-red-500" size={16} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h3 className="text-xl font-bold text-stone-900">Purchase History</h3>
            <p className="text-sm text-stone-500">{user?.name} ({user?.email})</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-10 h-10 border-4 border-stone-200 border-t-[#7c4a32] rounded-full animate-spin" />
              <p className="text-stone-500 text-sm font-medium">Fetching transactions...</p>
            </div>
          ) : purchases.length > 0 ? (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div 
                  key={purchase.id} 
                  className="group flex items-center justify-between p-4 rounded-2xl border border-stone-100 hover:border-[#7c4a32]/20 hover:bg-[#7c4a32]/[0.02] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-100 group-hover:bg-white rounded-xl flex items-center justify-center text-stone-600 group-hover:text-[#7c4a32] transition-colors">
                      <ShoppingBag size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 group-hover:text-[#7c4a32] transition-colors">{purchase.productName}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-stone-400">
                          <Calendar size={12} />
                          {new Date(purchase.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 uppercase tracking-wider">
                          {getStatusIcon(purchase.status)}
                          <span className="ml-1">{purchase.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-stone-900">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: purchase.currency }).format(purchase.amount)}
                    </p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                      <CreditCard size={10} />
                      ID: {purchase.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 mb-4">
                <ShoppingBag size={32} />
              </div>
              <p className="text-stone-500 font-medium">No purchases found for this user.</p>
              <p className="text-sm text-stone-400 mt-1">When the user makes a purchase, it will appear here.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stone-100 bg-stone-50/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-stone-900 text-white rounded-2xl text-sm font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
