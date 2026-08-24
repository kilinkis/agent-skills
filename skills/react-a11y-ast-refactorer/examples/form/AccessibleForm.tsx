import React, { useState, useId } from 'react';

/**
 * ✅ AFTER: WCAG 2.2 Accessible Form with useId(), aria-describedby, and live errors
 * 
 * ✨ Key Accessibility Features Implemented:
 * 1. useId() Hook: Guarantees collision-proof htmlFor/id linkage across SSR & hydration.
 * 2. aria-invalid: Announces input validation status to assistive tech.
 * 3. aria-describedby: Explicitly connects error message and helper text to the input.
 * 4. role="alert" & aria-live="polite": Dynamically announces validation errors when triggered.
 */
export const AccessibleForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailInputId = useId();
  const emailHelpId = useId();
  const emailErrorId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address with an @ symbol.');
      setIsSubmitted(false);
    } else {
      setError('');
      setIsSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-sm">
      <div>
        <label htmlFor={emailInputId} className="block text-sm font-semibold text-slate-800">
          Email Address <span className="text-red-500" aria-hidden="true">*</span>
        </label>

        <p id={emailHelpId} className="text-xs text-slate-500 mt-0.5">
          We will send your weekly newsletter here.
        </p>

        <input
          id={emailInputId}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${emailHelpId} ${emailErrorId}` : emailHelpId}
          placeholder="you@example.com"
          className={`mt-1.5 block w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
              : 'border-slate-300 focus:ring-blue-500 bg-white'
          }`}
        />

        {error && (
          <p id={emailErrorId} role="alert" aria-live="polite" className="text-xs font-semibold text-red-600 mt-1.5 flex items-center gap-1">
            <span aria-hidden="true">⚠️</span> {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
      >
        Subscribe to Updates
      </button>

      {isSubmitted && (
        <div role="status" aria-live="polite" className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
          ✓ Successfully subscribed! Check your inbox.
        </div>
      )}
    </form>
  );
};
