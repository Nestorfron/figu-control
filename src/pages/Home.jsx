import { useState } from "react";
import { useAlbumStore } from "../store/useAlbumStore";
import { ArrowLeft, Search } from "lucide-react";

import Stats from "../components/Stats";
import StickerCard from "../components/StickerCard";

export default function Home() {
  const { stickers, setStickers } = useAlbumStore();

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

  // EXPORTAR REPETIDAS
  const exportRepetidas = () => {
    const repetidas = stickers.filter((s) => s.repetidas > 0);

    if (repetidas.length === 0) {
      alert("No tienes repetidas");
      return;
    }

    const texto = repetidas
      .map((s) => `${s.numero} - ${s.jugador} (${s.repetidas}x)`)
      .join("\n");

    navigator.clipboard.writeText(texto);
    alert("Lista copiada");
  };

  // EXPORT BACKUP
  const exportData = () => {
    const dataStr = JSON.stringify(stickers, null, 2);

    const blob = new Blob([dataStr], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "figucontrol-backup.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  // IMPORT BACKUP
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!confirm("Esto reemplazará todos tus datos actuales")) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!Array.isArray(data)) {
          alert("Archivo inválido");
          return;
        }

        setStickers(data);
        alert("Datos importados correctamente");
      } catch (err) {
        alert("Error al importar archivo");
      }
    };

    reader.readAsText(file);
  };

  // WELCOME
  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-black text-white mb-4">
            👋 Bienvenido
          </h2>

          <p className="text-zinc-300 leading-relaxed">
            Organizá tus figuritas del Mundial 2026 con FiguControl.
          </p>

          <div className="mt-6 space-y-2 text-sm text-zinc-400">
            <p>✅ Marcá las pegadas</p>
            <p>🔁 Controlá repetidas</p>
            <p>📊 Seguimiento por selección</p>
            <p>📱 Instalá la app en tu celular</p>
          </div>

          <button
            onClick={() => {
              localStorage.setItem("figucontrol-welcome", "true");
              setShowWelcome(false);
            }}
            className="mt-8 w-full bg-[#008f72] rounded-2xl py-3 text-white font-bold"
          >
            Empezar
          </button>
        </div>
      </div>
    );
  }

  // 🔥 NUEVA VISTA: PAÍS
  if (selectedCountry) {
    const countryStickers = stickers.filter(
      (s) => s.seleccion === selectedCountry
    );

    const filtered = countryStickers.filter((s) => {
      const matchSearch =
        s.jugador.toLowerCase().includes(search.toLowerCase()) ||
        s.numero.toString().includes(search);

      const matchFilter =
        filter === "all"
          ? true
          : filter === "pegadas"
          ? s.pegada
          : !s.pegada;

      return matchSearch && matchFilter;
    });

    return (
      <div className="min-h-screen bg-black p-6 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => {
              setSelectedCountry(null);
              setSearch("");
              setFilter("all");
            }}
            className="z-50 fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#008f72] text-white flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-4xl font-black text-white mb-6">
            {selectedCountry}
          </h1>

          {/* BUSCADOR + FILTRO */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center bg-zinc-900 rounded-xl px-3 flex-1">
              <Search className="text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Buscar jugador o número..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white px-2 py-3 w-full"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-zinc-900 text-white rounded-xl px-3"
            >
              <option value="all">Todas</option>
              <option value="pegadas">Pegadas</option>
              <option value="faltan">Faltan</option>
            </select>
          </div>

          {/* STICKERS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((sticker) => (
              <StickerCard key={sticker.id} sticker={sticker} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // REPETIDAS
  if (showRepetidas) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-5xl mx-auto z-index-10">
          <button
            onClick={() => setShowRepetidas(false)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#008f72] text-white flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-5xl font-black text-white mb-10">
            Repetidas
          </h1>

          <div className="space-y-8">
            {Object.entries(repetidasAgrupadas).map(([country, items]) => (
              <div key={country} className="bg-zinc-900 rounded-3xl p-6">
                <h2 className="text-2xl font-bold text-white mb-5">
                  {country}
                </h2>

                {items.map((sticker) => (
                  <div key={sticker.id} className="flex justify-between py-2">
                    <p className="text-white">
                      {sticker.numero} — {sticker.jugador}
                    </p>
                    <span className="text-yellow-400">
                      x{sticker.repetidas}
                    </span>
                  </div>
                ))}
              </div>
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
          onShowRepetidas={() => setShowRepetidas(true)}
        />

        <div className="flex gap-3 mt-6 flex-wrap">
          <button
            onClick={exportRepetidas}
            className="bg-[#008f72] text-white px-5 py-3 rounded-2xl font-bold"
          >
            Exportar repetidas
          </button>

          <button
            onClick={exportData}
            className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold"
          >
            Exportar backup
          </button>

          <label className="bg-purple-600 text-white px-5 py-3 rounded-2xl font-bold cursor-pointer">
            Importar backup
            <input
              type="file"
              accept="application/json"
              onChange={importData}
              className="hidden"
            />
          </label>
        </div>

        <h2 className="text-2xl font-bold text-white mb-5 mt-10">
          Selecciones
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {countries.map((country) => {
            const countryStickers = stickers.filter(
              (s) => s.seleccion === country
            );

            const pegadas = countryStickers.filter((s) => s.pegada).length;
            const total = countryStickers.length;

            return (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className="bg-zinc-900 rounded-3xl p-5 flex flex-col items-center"
              >
                <img
                  src={`https://flagcdn.com/w80/${flags[country]}.png`}
                  alt={country}
                  className="w-16 h-12 rounded"
                />

                <p className="text-white text-sm mt-3 text-center">
                  {country}
                </p>

                <p className="text-zinc-400 text-xs">
                  {pegadas}/{total}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}