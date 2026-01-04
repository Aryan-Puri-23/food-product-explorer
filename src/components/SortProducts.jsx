import { useState, useRef, useEffect } from "react";

export default function SortProducts({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Sort");
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const options = [
    { label: "Name A-Z", value: "name-asc" },
    { label: "Name Z-A", value: "name-desc" },
    { label: "Nutrition Grade A-E", value: "grade-asc" },
    { label: "Nutrition Grade E-A", value: "grade-desc" },
  ];

  return (
    <div
      ref={ref}
      className="relative border p-2 rounded w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/2 bg-white cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <span className="text-sm">{selected}</span>

      {open && (
        <div className="absolute left-0 top-full mt-0 w-full border bg-white rounded shadow max-h-40 overflow-y-auto z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="px-2 py-1 text-xs hover:bg-gray-100"
              onClick={() => {
                setSelected(opt.label);
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}