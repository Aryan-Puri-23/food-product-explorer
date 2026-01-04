export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex gap-8 sm:gap-8 md:gap-3">
      <input
        type="text"
        placeholder="Search by name or barcode"
        className="border p-2 w-3/4 sm:w-3/4 md:w-1/2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-orange-500 text-white px-4 rounded cursor-pointer rounded-lg text-bold"
      >
        Search
      </button>
    </div>
  );
}
