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
        transition
        overflow-hidden
        p-3
        flex
        flex-col
        justify-between
        min-h-[170px]
        hover:scale-[1.02]
        duration-200
        ${
          sticker.pegada
            ? "bg-[#008f72]/15 border-[#008f72]"
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
          <div className="
            bg-yellow-500
            text-black
            text-xs
            px-2
            py-0.5
            rounded-full
            font-bold
          ">
            x{sticker.repetidas}
          </div>
        )}
      </div>

      {/* Nombre */}
      <div className="mt-3">
        <h3 className="text-white font-semibold text-sm leading-tight">
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
            transition
            ${
              sticker.pegada
                ? "bg-[#008f72] text-white"
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
          "
        >
          −
        </button>
      </div>
    </div>
  );
}