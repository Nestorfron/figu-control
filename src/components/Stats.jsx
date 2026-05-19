export default function Stats({
  stickers,
  onShowRepetidas,
}) {
  const total = stickers.length;

  const pegadas = stickers.filter(
    (s) => s.pegada
  ).length;

  const repetidas = stickers.reduce(
    (acc, s) => acc + s.repetidas,
    0
  );

  const faltan = total - pegadas;

  const progreso = Math.round(
    (pegadas / total) * 100
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card
        title="Total"
        value={total}
      />

      <Card
        title="Pegadas"
        value={pegadas}
      />

      <Card
        title="Faltan"
        value={faltan}
      />

      <Card
        title="Repetidas"
        value={repetidas}
        onClick={onShowRepetidas}
        clickable
      />

      <div className="col-span-2 md:col-span-4">
        <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-[#008f72]
              transition-all
              duration-500
            "
            style={{
              width: `${progreso}%`,
            }}
          />
        </div>

        <p className="text-sm text-zinc-400 mt-2">
          {progreso}% completado
        </p>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  onClick,
  clickable,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-5
        transition-all
        duration-300
        ${
          clickable
            ? `
              cursor-pointer
              hover:border-[#008f72]
              hover:scale-[1.02]
            `
            : ""
        }
      `}
    >
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}