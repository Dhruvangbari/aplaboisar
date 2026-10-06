import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { PaymentOrder } from '../../types';
import { paymentService } from '../../services/paymentService';
import { OFFICIAL_LOCATION } from '../../config/location';

interface InvoiceModalProps {
  order: PaymentOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const taxes = paymentService.calculateTaxes(order.amount);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs print:p-0 print:bg-white">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden print:border-none print:shadow-none print:max-w-none">
        {/* Top Action Bar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Tax Invoice &amp; Payment Receipt
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-red-600">आपलं Boisar</span>
                <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                  Verified Local Ecosystem
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                AaplaBoisar Digital Services Private Limited
              </p>
              <p className="text-xs text-slate-500">
                Station Road, Boisar West, Palghar, Maharashtra — PIN 401501
              </p>
              <p className="text-xs text-slate-500">
                GSTIN: 27AABCA1234F1Z8 (Maharashtra State Code: 27)
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 uppercase tracking-wider">
                {order.status}
              </span>
              <div className="text-xs text-slate-500 mt-2">
                Invoice No: <span className="font-mono font-bold text-slate-900">{order.invoiceNumber}</span>
              </div>
              <div className="text-xs text-slate-500">
                Date: <span className="font-medium text-slate-700">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Test Mode Banner */}
          {order.isTestMode && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-center text-amber-900 text-xs font-bold tracking-wide uppercase">
              ⚠️ TEST PAYMENT / DEMO TRANSACTION SIMULATION
            </div>
          )}

          {/* Customer & Merchant Bill-To */}
          <div className="grid grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Billed To (Customer / Business)
              </span>
              <div className="font-bold text-slate-900 text-sm">
                {order.customerDetails.businessName || order.customerDetails.name}
              </div>
              <div className="text-slate-600 mt-0.5">{order.customerDetails.name}</div>
              <div className="text-slate-600">{order.customerDetails.phone}</div>
              <div className="text-slate-600">{order.customerDetails.email}</div>
              {order.customerDetails.gstin && (
                <div className="text-slate-800 font-mono mt-1 font-bold">
                  GSTIN: {order.customerDetails.gstin}
                </div>
              )}
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Transaction Details
              </span>
              <div className="text-slate-600">
                Payment Gateway: <span className="font-semibold text-slate-800">Razorpay (India)</span>
              </div>
              <div className="text-slate-600 font-mono">
                Order ID: <span className="text-slate-800">{order.orderId}</span>
              </div>
              <div className="text-slate-600 font-mono">
                Payment ID: <span className="text-slate-800">{order.paymentId || 'pay_demo_verified'}</span>
              </div>
              <div className="text-slate-600">
                Place of Supply: <span className="font-semibold text-slate-800">Maharashtra (27)</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3">SAC Code</th>
                  <th className="p-3 text-right">Taxable Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{order.productName}</div>
                    <div className="text-[11px] text-slate-500">
                      Product Type: {order.productType}
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{taxes.sacCode}</td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    ₹{order.amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tax Breakdown */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{taxes.baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span>₹{taxes.cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span>₹{taxes.sgst.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Paid:</span>
                <span className="text-emerald-700">₹{taxes.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-500 space-y-1">
            <p className="font-medium text-slate-600">
              This is a computer-generated tax invoice verified on the AaplaBoisar ecosystem.
            </p>
            <p>
              For questions regarding billing or invoices, contact <span className="font-semibold">support@aplaboisar.in</span> or call customer desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
