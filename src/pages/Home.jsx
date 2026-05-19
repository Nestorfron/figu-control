import { useState } from "react";
import { useAlbumStore } from "../store/useAlbumStore";
import { ArrowLeft, Search } from "lucide-react";

import Stats from "../components/Stats";
import StickerCard from "../components/StickerCard";

export default function Home() {
  const { stickers } = useAlbumStore();

  const [showWelcome, setShowWelcome] = useState(
    !localStorage.getItem("figucontrol-welcome")
  );

  const [showRepetidas, setShowRepetidas] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const flags = {
    Argentina: "ar",
    Australia: "au",
    Austria: "at",
    Bélgica: "be",
    "Bosnia y Herzegovina": "ba",
    Brasil: "br",
    Canadá: "ca",
    Chile: "cl",
    "Costa de Marfil": "ci",
    Colombia: "co",
    "Costa Rica": "cr",
    Croacia: "hr",
    Curazao: "cw",
    "República Checa": "cz",
    Dinamarca: "dk",
    Ecuador: "ec",
    Egipto: "eg",
    Inglaterra: "gb",
    España: "es",
    Francia: "fr",
    Alemania: "de",
    Ghana: "gh",
    Honduras: "hn",
    Irán: "ir",
    Irak: "iq",
    Italia: "it",
    Jordania: "jo",
    Japón: "jp",
    "Corea del Sur": "kr",
    "Arabia Saudita": "sa",
    Marruecos: "ma",
    México: "mx",
    Malí: "ml",
    "Países Bajos": "nl",
    Nigeria: "ng",
    Noruega: "no",
    "Nueva Zelanda": "nz",
    Panamá: "pa",
    Paraguay: "py",
    Perú: "pe",
    Portugal: "pt",
    Sudáfrica: "za",
    Escocia: "gb",
    Senegal: "sn",
    Suiza: "ch",
    Túnez: "tn",
    Uruguay: "uy",
    "Estados Unidos": "us",
  };

  const countries = [...new Set(stickers.map((s) => s.seleccion))];

  const repetidasAgrupadas = stickers
    .filter((s) => s.repetidas > 0)
    .reduce((acc, sticker) => {
      if (!acc[sticker.seleccion]) {
        acc[sticker.seleccion] = [];
      }

      acc[sticker.seleccion].push(sticker);

      return acc;
    }, {});

  const exportRepetidas = () => {
    const repetidas = stickers.filter(
      (s) => s.repetidas > 0
    );

    if (repetidas.length === 0) {
      alert("No tienes repetidas");
      return;
    }

    const texto = repetidas
      .map(
        (s) =>
          `${s.numero} - ${s.jugador} (${s.repetidas}x)`
      )
      .join("\n");

    navigator.clipboard.writeText(texto);

    alert("Lista copiada");
  };

  // WELCOME
  if (showWelcome) {
    return (
      <div
        className="
          fixed
          inset-0
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
          p-6
        "
      >
        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
            max-w-md
            w-full
          "
        >
          <h2
            className="
              text-3xl
              font-black
              text-white
              mb-4
            "
          >
            👋 Bienvenido
          </h2>

          <p
            className="
              text-zinc-300
              leading-relaxed
            "
          >
            Organizá tus figuritas del Mundial 2026 con FiguControl.
          </p>

          <div
            className="
              mt-6
              space-y-2
              text-sm
              text-zinc-400
            "
          >
            <p>✅ Marcá las pegadas</p>
            <p>🔁 Controlá repetidas</p>
            <p>📊 Seguimiento por selección</p>
            <p>📱 Instalá la app en tu celular</p>
          </div>

          <button
            onClick={() => {
              localStorage.setItem(
                "figucontrol-welcome",
                "true"
              );

              setShowWelcome(false);
            }}
            className="
              mt-8
              w-full
              bg-[#008f72]
              hover:opacity-90
              transition
              rounded-2xl
              py-3
              text-white
              font-bold
            "
          >
            Empezar
          </button>
        </div>
      </div>
    );
  }

  // REPETIDAS
  if (showRepetidas) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() =>
              setShowRepetidas(false)
            }
            className="
              fixed
              bottom-6
              right-6
              w-14
              h-14
              rounded-full
              bg-[#008f72]
              text-white
              shadow-2xl
              flex
              items-center
              justify-center
              hover:scale-105
              active:scale-95
              transition
              z-50
            "
          >
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-5xl font-black text-white mb-10">
            Repetidas
          </h1>

          <div className="space-y-8">
            {Object.entries(
              repetidasAgrupadas
            ).map(([country, items]) => (
              <div
                key={country}
                className="
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-3xl
                  p-6
                "
              >
                <h2 className="text-2xl font-bold text-white mb-5">
                  {country}
                </h2>

                <div className="space-y-3">
                  {items.map((sticker) => (
                    <div
                      key={sticker.id}
                      className="
                        flex
                        items-center
                        justify-between
                        bg-zinc-950
                        rounded-2xl
                        px-4
                        py-3
                      "
                    >
                      <div>
                        <p className="text-white font-semibold">
                          {sticker.numero} —{" "}
                          {sticker.jugador}
                        </p>
                      </div>

                      <div
                        className="
                          bg-yellow-500
                          text-black
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-bold
                        "
                      >
                        x{sticker.repetidas}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PAÍS SELECCIONADO
  if (selectedCountry) {
    const filtered = stickers
      .filter(
        (s) =>
          s.seleccion === selectedCountry
      )

      .filter((s) =>
        s.jugador
          .toLowerCase()
          .includes(search.toLowerCase())
      )

      .filter((s) => {
        if (filter === "faltantes")
          return !s.pegada;

        if (filter === "repetidas")
          return s.repetidas > 0;

        return true;
      });

    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() =>
              setSelectedCountry(null)
            }
            className="
              fixed
              bottom-6
              right-6
              w-14
              h-14
              rounded-full
              bg-[#008f72]
              text-white
              shadow-2xl
              flex
              items-center
              justify-center
              hover:scale-105
              active:scale-95
              transition
              z-50
            "
          >
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-5xl font-black text-white mb-8">
            {selectedCountry}
          </h1>

          <div className="relative mb-5">
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />

            <input
              type="text"
              placeholder="Buscar figurita..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                pl-11
                pr-4
                py-3
                text-white
                outline-none
                focus:border-[#008f72]
              "
            />
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              {
                key: "all",
                label: "Todas",
              },
              {
                key: "faltantes",
                label: "Faltan",
              },
              {
                key: "repetidas",
                label: "Repetidas",
              },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() =>
                  setFilter(f.key)
                }
                className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                  ${
                    filter === f.key
                      ? "bg-[#008f72] text-white"
                      : "bg-zinc-900 text-zinc-400"
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((sticker) => (
              <StickerCard
                key={sticker.id}
                sticker={sticker}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PRINCIPAL
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-2">
          FiguControl
        </h1>

        <p className="text-zinc-400 mb-8">
          Organizá tus figuritas
        </p>

        <Stats
          stickers={stickers}
          onShowRepetidas={() =>
            setShowRepetidas(true)
          }
        />

        <button
          onClick={exportRepetidas}
          className="
            mt-6
            bg-[#008f72]
            hover:opacity-90
            transition
            text-white
            px-5
            py-3
            rounded-2xl
            font-bold
          "
        >
          Exportar repetidas
        </button>

        <h2 className="text-2xl font-bold text-white mb-5 mt-10">
          Selecciones
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {countries.map((country) => {
            const countryStickers =
              stickers.filter(
                (s) => s.seleccion === country
              );

            const pegadas =
              countryStickers.filter(
                (s) => s.pegada
              ).length;

            const total =
              countryStickers.length;

            const progress = Math.round(
              (pegadas / total) * 100
            );

            return (
              <button
                key={country}
                onClick={() =>
                  setSelectedCountry(country)
                }
                className="
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-3xl
                  p-5
                  hover:border-[#008f72]
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                  flex
                  flex-col
                  items-center
                  justify-between
                  aspect-square
                "
              >
                <div className="mb-4">
                  {flags[country] ? (
                    <img
                      src={`https://flagcdn.com/w80/${flags[country]}.png`}
                      alt={country}
                      className="
                        w-16
                        h-12
                        object-cover
                        rounded-lg
                        shadow-md
                      "
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-5xl">
                      🌍
                    </div>
                  )}
                </div>

                <h2
                  className="
                    text-white
                    text-sm
                    font-medium
                    text-center
                    leading-tight
                    line-clamp-2
                    min-h-[36px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  {country}
                </h2>

                <p className="text-zinc-500 text-xs mt-2">
                  {pegadas}/{total}
                </p>

                <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-[#008f72]"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}