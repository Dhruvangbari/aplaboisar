import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, FileText, Upload, Building } from 'lucide-react';
import { BusinessItem, BusinessClaimRequest } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface BusinessClaimModalProps {
  business: BusinessItem;
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessClaimModal: React.FC<BusinessClaimModalProps> = ({
  business,
  isOpen,
  onClose
}) => {
  const { showToast } = useAppContext();
  const [step, setStep] = useState<'form' | 'submitted'>('form');
  const [claimantName, setClaimantName] = useState('');
  const [claimantPhone, setClaimantPhone] = useState('');
  const [claimantEmail, setClaimantEmail] = useState('');
  const [relationship, setRelationship] = useState<BusinessClaimRequest['relationship']>('Owner');
  const [proofType, setProofType] = useState<BusinessClaimRequest['proofType']>('Shop Act / Gumasta');
  const [documentNumber, setDocumentNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName.trim() || !claimantPhone.trim()) {
      showToast('Please enter your full name and mobile number', 'error');
      return;
    }

    setIsSubmitting(true);

    const claimRequest: BusinessClaimRequest = {
      id: `claim-${Date.now()}`,
      businessId: business.id,
      businessName: business.name,
      claimantName,
      claimantPhone,
      claimantEmail,
      relationship,
      proofType,
      documentNumber,
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
      notes
    };

    // Store in localStorage for admin verification queue
    const existingClaims: BusinessClaimRequest[] = JSON.parse(
      localStorage.getItem('aplaboisar_business_claims') || '[]'
    );
    existingClaims.unshift(claimRequest);
    localStorage.setItem('aplaboisar_business_claims', JSON.stringify(existingClaims));

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('submitted');
      showToast('Claim application submitted! Admin team will verify within 24-48 hours.', 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-xl bg-white/20 backdrop-blur-xs">
              <ShieldCheck className="w-5 h-5 text-amber-200" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-amber-200">
              Listing Claim & Verification
            </span>
          </div>

          <h2 className="text-xl font-black">Is this your business?</h2>
          <p className="text-xs text-amber-100 mt-1">
            Claim <span className="font-bold underline">{business.name}</span> in Boisar to manage profile, respond to leads, run offers, and unlock business dashboard.
          </p>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Strict verification notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Zero-Fraud Policy: </span>
                To protect Boisar business owners, claims require phone and document verification before admin approval. Instant claiming without proof is prohibited.
              </div>
            </div>

            {/* Business info preview */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-slate-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs text-slate-900 truncate">{business.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{business.address} ({business.pinCode || '401501'})</div>
              </div>
            </div>

            {/* Claimant Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name (Owner / Partner) *
              </label>
              <input
                type="text"
                required
                value={claimantName}
                onChange={e => setClaimantName(e.target.value)}
                placeholder="e.g. Ramesh Vartak / Suresh Patil"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (+91) *
                </label>
                <input
                  type="tel"
                  required
                  value={claimantPhone}
                  onChange={e => setClaimantPhone(e.target.value)}
                  placeholder="+91 98230 XXXXX"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={claimantEmail}
                  onChange={e => setClaimantEmail(e.target.value)}
                  placeholder="owner@gmail.com"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Relationship */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Role
                </label>
                <select
                  value={relationship}
                  onChange={e => setRelationship(e.target.value as any)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-amber-500 outline-none"
                >
                  <option value="Owner">Business Owner / Proprietor</option>
                  <option value="Partner">Business Partner</option>
                  <option value="Manager">General Manager</option>
                  <option value="Authorized Representative">Authorized Representative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Verification Document
                </label>
                <select
                  value={proofType}
                  onChange={e => setProofType(e.target.value as any)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-amber-500 outline-none"
                >
                  <option value="Shop Act / Gumasta">Shop Act / Gumasta License</option>
                  <option value="GSTIN Certificate">GSTIN Certificate (27XXXXX)</option>
                  <option value="Electricity Bill">MSEB Electricity Bill</option>
                  <option value="Business Card">Visiting Card / Letterhead</option>
                  <option value="Phone OTP">Phone Number OTP Match</option>
                </select>
              </div>
            </div>

            {/* Document Number / Registration # */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Document / Registration Number (Optional)
              </label>
              <input
                type="text"
                value={documentNumber}
                onChange={e => setDocumentNumber(e.target.value)}
                placeholder="e.g. Shop Act Reg # or 27AAAAA0000A1Z5"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-amber-500 outline-none font-mono"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Verification Details / Message for Admin
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="Any additional details to expedite verification..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-amber-500 outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Claim...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Submit Claim for Verification
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Claim Request Submitted!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="font-bold text-slate-800">{claimantName}</span>. Your request to claim{' '}
              <span className="font-bold text-slate-800">{business.name}</span> has been routed to the AaplaBoisar Admin Verification Queue.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Listing:</span>
                <span className="font-bold text-slate-800">{business.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-bold text-slate-800">{claimantPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification SLA:</span>
                <span className="font-bold text-emerald-600">Within 24 Hours</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
