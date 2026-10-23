import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, QrCode, CreditCard, Building2, Wallet, CheckCircle, Sparkles, Download, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { Booking } from '../types';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    type: 'car' | 'guide' | 'activity' | 'artisan_workshop' | 'permit' | 'artisan_product';
    title: string;
    providerName: string;
    imageUrl?: string;
    price: number;
    priceUnit?: string;
  };
  userXp: number;
  userMobile?: string;
  onPaymentSuccess: (booking: Booking, xpDeducted: number) => void;
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  item,
  userXp,
  userMobile = '+91 98200 12345',
  onPaymentSuccess
}: PaymentGatewayModalProps) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM - 12:00 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [useXpDiscount, setUseXpDiscount] = useState(true);
  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');

  // Form states
  const [upiId, setUpiId] = useState('tourist@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8921 7734 9012');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('482');
  const [cardHolder, setCardHolder] = useState('Traveler Name');
  const [selectedBank, setSelectedBank] = useState('Bank of Maharashtra');

  // Processing & Confirmation State
  const [stage, setStage] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  // Calculation
  const baseRate = item.price;
  const isPerPerson = item.type === 'activity' || item.type === 'permit' || item.type === 'artisan_workshop';
  const subTotal = isPerPerson ? baseRate * guestsCount : baseRate;
  const gstAmount = Math.round(subTotal * 0.05); // 5% MTDC Tourism GST
  
  // XP Discount: up to 200 XP = ₹100 discount max (capped by user XP)
  const maxRedeemableXp = Math.min(userXp, 200);
  const xpDiscountInRupees = useXpDiscount ? Math.floor(maxRedeemableXp * 0.5) : 0;
  const finalTotal = Math.max(subTotal + gstAmount - xpDiscountInRupees, 10);

  const handlePayNow = () => {
    setStage('processing');

    setTimeout(() => {
      const pnr = `MH-BK-${Math.floor(10000 + Math.random() * 90000)}`;
      const newBooking: Booking = {
        id: pnr,
        serviceType: item.type,
        serviceId: item.id,
        serviceTitle: item.title,
        serviceImage: item.imageUrl,
        providerName: item.providerName,
        date: selectedDate,
        slotOrDuration: selectedSlot,
        guestCount: guestsCount,
        totalAmount: subTotal + gstAmount,
        discountXp: xpDiscountInRupees,
        finalPaidAmount: finalTotal,
        paymentMethod: paymentTab,
        paymentId: `PAY-${paymentTab.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
        bookingStatus: 'confirmed',
        bookedAt: new Date().toLocaleString(),
        qrCodeToken: `MTDC-VERIFIED-${pnr}-${item.id}`
      };

      setConfirmedBooking(newBooking);
      setStage('confirmed');
      onPaymentSuccess(newBooking, useXpDiscount ? maxRedeemableXp : 0);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#18130E] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-3.5 bg-[#201913] border-b border-[#2D231A] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                {stage === 'confirmed' ? 'Booking Confirmed!' : 'MTDC Secure Payment Gateway'}
              </h3>
              <p className="text-[9px] text-amber-200/60 font-mono">100% RBI & PCI-DSS 256-Bit Compliant</p>
            </div>
          </div>
          {stage !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {stage === 'details' && (
            <>
              {/* Item Card Banner */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex gap-3 items-center">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-700" />
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-bold">
                    {item.type.replace('_', ' ')}
                  </span>
                  <h4 className="font-bold text-white text-xs truncate mt-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{item.providerName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-amber-400">₹{item.price.toLocaleString()}</span>
                  <span className="block text-[8px] text-slate-500">{item.priceUnit || 'per unit'}</span>
                </div>
              </div>

              {/* Slot & Guest Selection */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Date of Service</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {isPerPerson && (
                  <div>
                    <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Guests / Seats</label>
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="px-3 py-2 text-slate-300 hover:bg-slate-800 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-white text-xs">{guestsCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.min(15, guestsCount + 1))}
                        className="px-3 py-2 text-slate-300 hover:bg-slate-800 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* XP Coins Discount Toggle */}
              {userXp >= 50 && (
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-amber-300 text-[11px] flex items-center gap-1.5">
                        <span>Redeem {maxRedeemableXp} MahaPassport XP</span>
                        <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                          -₹{Math.floor(maxRedeemableXp * 0.5)} OFF
                        </span>
                      </div>
                      <span className="text-[8px] text-amber-200/60">Current XP Balance: {userXp} XP</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={useXpDiscount}
                    onChange={(e) => setUseXpDiscount(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>
              )}

              {/* Payment Methods Tabs */}
              <div>
                <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1.5">Select Payment Mode</label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('upi')}
                    className={`py-1.5 text-[9px] font-bold uppercase rounded-lg flex flex-col items-center gap-1 transition cursor-pointer ${paymentTab === 'upi' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('card')}
                    className={`py-1.5 text-[9px] font-bold uppercase rounded-lg flex flex-col items-center gap-1 transition cursor-pointer ${paymentTab === 'card' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('netbanking')}
                    className={`py-1.5 text-[9px] font-bold uppercase rounded-lg flex flex-col items-center gap-1 transition cursor-pointer ${paymentTab === 'netbanking' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    NetBank
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('wallet')}
                    className={`py-1.5 text-[9px] font-bold uppercase rounded-lg flex flex-col items-center gap-1 transition cursor-pointer ${paymentTab === 'wallet' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    Wallet
                  </button>
                </div>
              </div>

              {/* Tab Form Views */}
              {paymentTab === 'upi' && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 bg-white p-1.5 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                      {/* Simulated high-fidelity QR */}
                      <div className="w-full h-full bg-slate-950 p-1 flex flex-col justify-between items-center rounded">
                        <div className="w-full flex justify-between">
                          <div className="w-4 h-4 bg-white" />
                          <div className="w-4 h-4 bg-white" />
                        </div>
                        <span className="text-[7px] text-amber-400 font-mono font-bold tracking-tighter">BHIM UPI</span>
                        <div className="w-full flex justify-between">
                          <div className="w-4 h-4 bg-white" />
                          <div className="w-2 h-2 bg-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-[8px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                        Scan QR with any UPI App
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                          <span key={app} className="text-[8px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                            {app}
                          </span>
                        ))}
                      </div>
                      <span className="text-[9px] text-slate-400 block mt-2 font-mono">UPI ID: {upiId}</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentTab === 'card' && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div>
                    <label className="text-[8px] text-slate-400 uppercase font-mono block mb-1">Card Number (Visa / RuPay / MC)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-white rounded p-1.5 font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[8px] text-slate-400 uppercase font-mono block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 text-white rounded p-1.5 font-mono text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 uppercase font-mono block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 text-white rounded p-1.5 font-mono text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentTab === 'netbanking' && (
                <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                  <label className="text-[8px] text-slate-400 uppercase font-mono block mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 text-white rounded p-2 text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Bank of Maharashtra">Bank of Maharashtra (Official Govt Partner)</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                  </select>
                </div>
              )}

              {paymentTab === 'wallet' && (
                <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="font-bold text-white text-xs block">MahaPassport Digital Tourist Wallet</span>
                      <span className="text-[9px] text-emerald-400 font-mono">Available Balance: ₹12,500</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                    Instant Debit
                  </span>
                </div>
              )}

              {/* Price Breakdown Bill */}
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5 text-[10px]">
                <div className="flex justify-between text-slate-400">
                  <span>Base Rate {isPerPerson ? `(₹${baseRate} × ${guestsCount})` : ''}</span>
                  <span className="font-mono text-white">₹{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>MTDC Tourism Promotion Cess (5%)</span>
                  <span className="font-mono text-white">₹{gstAmount}</span>
                </div>
                {xpDiscountInRupees > 0 && (
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span>MahaPassport XP Coin Discount</span>
                    <span className="font-mono">-₹{xpDiscountInRupees}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Total Payable:</span>
                  <span className="font-black text-amber-400 text-sm">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}

          {stage === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Securing Bank Authorization...</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[240px]">
                  Connecting to Reserve Bank of India payment gateway switch. Please do not refresh.
                </p>
              </div>
              <div className="text-[9px] text-amber-400/80 font-mono animate-pulse">
                ENCRYPTED AES-256 SESSION
              </div>
            </div>
          )}

          {stage === 'confirmed' && confirmedBooking && (
            <div className="space-y-4">
              {/* Success Badge */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 mb-2 shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-black text-white">Official Booking Confirmed!</h4>
                <p className="text-[10px] text-emerald-300 font-mono mt-0.5">
                  PNR: {confirmedBooking.id}
                </p>
              </div>

              {/* Digital Boarding Pass Voucher */}
              <div className="bg-[#120F0B] border border-amber-500/30 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-amber-500/20 pb-2">
                  <div>
                    <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest block">
                      MAHARASHTRA TOURISM PASS
                    </span>
                    <h5 className="font-bold text-white text-xs">{confirmedBooking.serviceTitle}</h5>
                    <span className="text-[9px] text-slate-400">{confirmedBooking.providerName}</span>
                  </div>
                  {/* Dynamic simulated QR */}
                  <div className="w-14 h-14 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-slate-950" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Date</span>
                    <span className="font-bold text-white">{confirmedBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Guests</span>
                    <span className="font-bold text-white">{confirmedBooking.guestCount} Person(s)</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Amount Paid</span>
                    <span className="font-bold text-emerald-400">₹{confirmedBooking.finalPaidAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Payment Ref</span>
                    <span className="font-mono text-[9px] text-slate-300">{confirmedBooking.paymentId}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[8px] text-slate-400 flex items-center justify-between">
                  <span>Show this QR code upon arrival.</span>
                  <span className="text-amber-400 font-bold">24x7 Help: 1800-22-9930</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#201913] border-t border-[#2D231A] flex justify-between items-center shrink-0">
          {stage === 'details' ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayNow}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95 shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <span>Authorize & Pay ₹{finalTotal.toLocaleString()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : stage === 'confirmed' ? (
            <div className="w-full flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-1 cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Done & View in My Bookings
              </button>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
