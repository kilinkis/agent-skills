import React, { useState } from 'react';

/**
 * ❌ BEFORE: Inaccessible React Dropdown Menu
 * 
 * 🚨 Violations:
 * 1. [A11Y-001]: Menu items are <div onClick> with no keyboard Enter/Space activation.
 * 2. [A11Y-005]: Trigger button lacks aria-expanded and aria-controls.
 * 3. Lacks W3C APG keyboard navigation (ArrowDown / ArrowUp navigation).
 * 4. Lacks role="menu" and role="menuitem" ARIA hierarchy.
 */
export const InaccessibleDropdown: React.FC<{
  options: string[];
  onSelect: (option: string) => void;
}> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative inline-block text-left">
      {/* Violation: Missing aria-expanded, aria-haspopup, aria-controls */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
      >
        {selected} ▼
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
          {options.map((option) => (
            // Violation: div onClick with no keyboard listener or menuitem role
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
