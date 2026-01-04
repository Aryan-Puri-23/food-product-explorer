import { useState, useRef, useEffect } from "react";

export default function CategoryFilter({ categories, onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Categories");
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div
      ref={ref}
      className="relative border p-2 rounded w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/2 bg-white cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <span className="text-sm">{selected}</span>

      {open && (
        <div className="absolute left-0 top-full mt-0 w-full border bg-white rounded shadow max-h-48 overflow-y-auto z-50">
          <div
            className="px-2 py-1 text-xs hover:bg-gray-100"
            onClick={() => {
              setSelected("All Categories");
              onChange("");
              setOpen(false);
            }}
          >
            All Categories
          </div>

          {categories.map((cat) => (
            <div
              key={cat.id}
              className="px-2 py-1 text-xs hover:bg-gray-100 truncate"
              onClick={() => {
                setSelected(cat.name);
                onChange(cat.id);
                setOpen(false);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}