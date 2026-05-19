import { useAlbumStore } from "../store/useAlbumStore";

export default function StickerCard({
  sticker,
}) {
  const {
    togglePegada,
    addRepetida,
    removeRepetida,
  } = useAlbumStore();

  return (
    <div
      className={`
        relative
        rounded-2xl
        border
        transition-all
        duration-300
        overflow-hidden
        p-3
        flex
        flex-col
        justify-between
        min-h-[160px]
        hover:scale-[1.02]
        active:scale-[0.98]
        ${
          sticker.pegada
            ? "bg-[#008f72]/15 border-[#008f72] shadow-lg shadow-[#008f72]/10"
            : "bg-zinc-900 border-zinc-800"
        }
      `}
    >
      {/* Número */}
      <div className="flex items-start justify-between">
        <span className="text-xs text-zinc-500 font-medium">
          {sticker.numero}
        </span>

        {sticker.repetidas > 0 && (
          <div
            className="
              bg-yellow-500
              text-black
              text-xs
              px-2
              py-0.5
              rounded-full
              font-bold
              animate-pulse
            "
          >
            x{sticker.repetidas}
          </div>
        )}
      </div>

      {/* Nombre */}
      <div className="mt-3">
        <h3
          className="
            text-white
            font-semibold
            text-sm
            leading-tight
            line-clamp-2
            min-h-[36px]
          "
        >
          {sticker.jugador}
        </h3>

        <p className="text-zinc-500 text-xs mt-1">
          {sticker.seleccion}
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() =>
            togglePegada(sticker.id)
          }
          className={`
            flex-1
            rounded-xl
            py-2
            text-xs
            font-bold
            transition-all
            duration-300
            active:scale-95
            ${
              sticker.pegada
                ? "bg-[#008f72] text-white shadow-lg shadow-[#008f72]/30"
                : "bg-zinc-800 text-zinc-300"
            }
          `}
        >
          {sticker.pegada
            ? "Pegada"
            : "Falta"}
        </button>

        <button
          onClick={() =>
            addRepetida(sticker.id)
          }
          className="
            w-9
            rounded-xl
            bg-yellow-500
            text-black
            font-bold
            transition-all
            duration-200
            hover:scale-105
            active:scale-95
          "
        >
          +
        </button>

        <button
          onClick={() =>
            removeRepetida(sticker.id)
          }
          className="
            w-9
            rounded-xl
            bg-red-500
            text-white
            font-bold
            transition-all
            duration-200
            hover:scale-105
            active:scale-95
          "
        >
          −
        </button>
      </div>
    </div>
  );
}