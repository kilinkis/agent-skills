import React, { useState } from 'react';

/**
 * ❌ BEFORE: Inaccessible React Form
 * 
 * 🚨 Violations:
 * 1. [A11Y-004]: <input> has no id and is not associated with <label>.
 * 2. Error message has no aria-describedby binding; screen readers ignore the error.
 * 3. Missing aria-invalid on error state.
 */
export const InaccessibleForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div>
        {/* Violation: Label has no htmlFor, input has no id */}
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
        {/* Violation: Error is not connected to input via aria-describedby */}
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Subscribe
      </button>
    </form>
  );
};
