"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  direction?: "up" | "down" | "auto";
}

export function CustomSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  className = "",
  direction = "auto",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [computedDirection, setComputedDirection] = useState<"up" | "down">(
    direction === "up" ? "up" : "down"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine open direction
  useEffect(() => {
    if (direction === "up") {
      setComputedDirection("up");
    } else if (direction === "down") {
      setComputedDirection("down");
    } else if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 240) {
        setComputedDirection("up");
      } else {
        setComputedDirection("down");
      }
    }
  }, [isOpen, direction]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`space-y-1.5 ${isOpen ? "relative z-30" : "relative z-10"} ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full px-3.5 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-all duration-150 cursor-pointer text-left select-none ${
            isOpen
              ? "bg-white border-emerald-600 ring-2 ring-emerald-500/15 border shadow-sm"
              : "bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
          }`}
        >
          <span className={`truncate ${selectedOption ? "text-slate-900 font-semibold" : "text-slate-400 font-normal"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
              isOpen ? "rotate-180 text-emerald-600" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            role="listbox"
            className={`absolute left-0 right-0 ${
              computedDirection === "up"
                ? "bottom-full mb-1.5 origin-bottom"
                : "top-full mt-1.5 origin-top"
            } z-50 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-1.5 space-y-0.5 max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-150`}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium flex items-center justify-between transition cursor-pointer select-none ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-900 font-bold"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="h-4 w-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
