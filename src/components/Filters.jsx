export default function Filters({
    filter,
    setFilter,
  }) {
    const filters = [
      "all",
      "pegadas",
      "faltan",
      "repetidas",
    ];
  
    return (
      <div className="flex gap-3 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl capitalize transition
            ${
              filter === f
                ? "bg-[#008f72] text-white"
                : "bg-zinc-900 text-zinc-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    );
  }