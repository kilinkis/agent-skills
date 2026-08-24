import React, { useState, useRef, useId, useEffect } from 'react';

/**
 * ✅ AFTER: W3C APG Compliant Menu Button & Dropdown Component
 * 
 * ✨ Key Accessibility Features Implemented:
 * 1. ARIA Attributes: aria-haspopup="menu", aria-expanded, aria-controls, and role="menuitem".
 * 2. Full Keyboard Navigation:
 *    - Open with ArrowDown / Enter / Space.
 *    - Navigate items with ArrowDown / ArrowUp (with wrap-around cycling).
 *    - Close on Escape (returns focus to trigger button).
 * 3. Roving TabIndex & Focus: Ensures screen readers announce focused item and position.
 */
export interface AccessibleDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  label?: string;
}

export const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  options,
  onSelect,
  label = 'Select Option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Focus active item when menu opens
  useEffect(() => {
    if (isOpen && itemsRef.current[activeIndex]) {
      itemsRef.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(selectedIndex);
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const handleItemSelect = (index: number) => {
    setSelectedIndex(index);
    onSelect(options[index]);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[38px] flex items-center gap-2"
      >
        <span>{options[selectedIndex] || label}</span>
        <span aria-hidden="true" className="text-xs text-slate-500">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleMenuKeyDown}
          className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 focus:outline-none"
        >
          {options.map((option, idx) => (
            <button
              key={option}
              ref={(el) => { itemsRef.current[idx] = el; }}
              role="menuitem"
              tabIndex={activeIndex === idx ? 0 : -1}
              onClick={() => handleItemSelect(idx)}
              className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between ${
                selectedIndex === idx ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700 hover:bg-slate-100'
              } ${activeIndex === idx ? 'bg-slate-100 ring-1 ring-inset ring-slate-300' : ''}`}
            >
              <span>{option}</span>
              {selectedIndex === idx && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
