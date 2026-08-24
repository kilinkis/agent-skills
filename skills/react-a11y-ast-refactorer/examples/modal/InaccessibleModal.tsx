import React from 'react';

/**
 * ❌ BEFORE: Inaccessible React Modal
 * 
 * 🚨 Violations:
 * 1. [A11Y-001]: <div className="overlay" onClick={...}> has non-interactive click handler.
 * 2. [A11Y-002]: Missing role="dialog", aria-modal="true", and aria-labelledby.
 * 3. [A11Y-003]: Close button <span onClick> is a div/span with no keyboard support.
 * 4. Missing focus trap: Tab key cycles background page elements while modal is open.
 * 5. Missing Escape key listener to dismiss.
 */
export const InaccessibleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Violation 1: Non-interactive div handling click
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
      {/* Violation 2: Missing role="dialog", aria-modal, and label bindings */}
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
        {/* Violation 3: Non-interactive span close button */}
        <span
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </span>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};
