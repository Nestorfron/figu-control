import { useState } from "react";
import { useAlbumStore } from "../store/useAlbumStore";
import { ArrowLeft, Download, Upload } from "lucide-react";

import Stats from "../components/Stats";
import StickerCard from "../components/StickerCard";

import { selecciones } from "../data/stickers";

export default function Home() {
  const { stickers, setStickers } = useAlbumStore();

  const [showWelcome, setShowWelcome] = useState(
    !localStorage.getItem("figucontrol-welcome")
  );

  const [showRepetidas, setShowRepetidas] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔥 NUEVO (modal import)
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState(null);

  const flagEmojiByCode = {
    ARG: "🇦🇷",
    AUS: "🇦🇺",
    AUT: "🇦🇹",
    BEL: "🇧🇪",
    BIH: "🇧🇦",
    BRA: "🇧🇷",
    CAN: "🇨🇦",
    COL: "🇨🇴",
    CIV: "🇨🇮",
    CRO: "🇭🇷",
    CUW: "🇨🇼",
    CZE: "🇨🇿",
    ECU: "🇪🇨",
    EGY: "🇪🇬",
    ENG: "🏴",
    ESP: "🇪🇸",
    FRA: "🇫🇷",
    GER: "🇩🇪",
    GHA: "🇬🇭",
    HTI: "🇭🇹",
    IRN: "🇮🇷",
    IRQ: "🇮🇶",
    JPN: "🇯🇵",
    JOR: "🇯🇴",
    KOR: "🇰🇷",
    MAR: "🇲🇦",
    MEX: "🇲🇽",
    NED: "🇳🇱",
    NZL: "🇳🇿",
    NOR: "🇳🇴",
    PAN: "🇵🇦",
    PAR: "🇵🇾",
    POR: "🇵🇹",
    QAT: "🇶🇦",
    KSA: "🇸🇦",
    SCO: "🏴",
    SEN: "🇸🇳",
    ZAF: "🇿🇦",
    SUI: "🇨🇭",
    SWE: "🇸🇪",
    TUN: "🇹🇳",
    TUR: "🇹🇷",
    USA: "🇺🇸",
    URU: "🇺🇾",
    UZB: "🇺🇿",
    ALG: "🇩🇿",
    CPV: "🇨🇻",
    COD: "🇨🇩",
  };

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
    Catar: "qa",
    Haití: "ht",
    Turquía: "tr",
    Suecia: "se",
    Uzbekistán: "uz",
    Argelia: "dz",
    "Cabo Verde": "cv",
    "Congo DR": "cd",
  };

  const countries = selecciones;


  // EXPORTAR FALTANTES

  const exportFaltantes = () => {
    const faltantes = stickers.filter((s) => !s.pegada);

    if (!faltantes.length) return alert("No te faltan figuritas 🎉");

    const agrupado = faltantes.reduce((acc, s) => {
      const codigo = s.numero.split("-")[0]; // 🔥 clave

      if (!acc[codigo]) acc[codigo] = [];
      acc[codigo].push(s.numero.split("-")[1]);

      return acc;
    }, {});

    const texto = Object.entries(agrupado)
      .map(([codigo, nums]) => {
        const emoji = flagEmojiByCode[codigo] || "🏳️";
        return `${codigo} ${emoji}: ${nums.join(", ")}`;
      })
      .join("\n");

    navigator.clipboard.writeText(texto);
    alert("Faltantes listos para WhatsApp 📱");
  };

  // EXPORTAR REPETIDAS
  const exportRepetidas = () => {
    const repetidas = stickers.filter((s) => s.repetidas > 0);
  
    if (!repetidas.length) {
      return alert("No tienes repetidas");
    }
  
    const agrupado = repetidas.reduce((acc, s) => {
      const codigo = s.numero.split("-")[0];
  
      if (!acc[codigo]) acc[codigo] = [];
  
      acc[codigo].push(
        `${s.numero.split("-")[1]} x${s.repetidas}`
      );
  
      return acc;
    }, {});
  
    const texto = Object.entries(agrupado)
      .map(([codigo, nums]) => {
        const emoji = flagEmojiByCode[codigo] || "🏳️";
        return `${codigo} ${emoji}: ${nums.join(", ")}`;
      })
      .join("\n");
  
    navigator.clipboard.writeText(texto);
    alert("Lista copiada");
  };

  // EXPORT BACKUP
  const exportData = () => {
    const blob = new Blob([JSON.stringify(stickers, null, 2)], {
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

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!Array.isArray(data)) throw new Error("Archivo inválido");

        const normalized = data.map((item, index) => ({
          id: item.id ?? index + 1,
          numero: item.numero ?? "",
          jugador: item.jugador ?? "Desconocido",
          seleccion: item.seleccion ?? "Sin selección",
          pegada: typeof item.pegada === "boolean" ? item.pegada : false,
          repetidas: typeof item.repetidas === "number" ? item.repetidas : 0,
        }));

        setImportedData(normalized);
        setShowImportModal(true);
      } catch (err) {
        console.error(err);
        alert("❌ Error: " + err.message);
      }
    };

    reader.readAsText(file, "UTF-8");
  };

  // 🔥 MODAL ACTIONS
  const handleReplace = () => {
    setStickers(importedData);
    setShowImportModal(false);
    alert("✅ Datos reemplazados");
  };

  const handleMerge = () => {
    setStickers((prev) => {
      const merged = [...prev];

      importedData.forEach((newSticker) => {
        const index = merged.findIndex((s) => s.id === newSticker.id);

        if (index !== -1) {
          merged[index] = {
            ...merged[index],
            pegada: merged[index].pegada || newSticker.pegada,
            repetidas: merged[index].repetidas + newSticker.repetidas,
          };
        } else {
          merged.push(newSticker);
        }
      });

      return merged;
    });

    setShowImportModal(false);
    alert("🔀 Datos combinados");
  };

  // WELCOME
  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-zinc-900 p-8 rounded-3xl max-w-md w-full">
          <h2 className="text-3xl text-white mb-4">👋 Bienvenido</h2>
          <button
            onClick={() => {
              localStorage.setItem("figucontrol-welcome", "true");
              setShowWelcome(false);
            }}
            className="w-full bg-[#008f72] py-3 rounded-2xl text-white"
          >
            Empezar
          </button>
        </div>
      </div>
    );
  }

  // PAIS
  if (selectedCountry) {
    const filtered = stickers
      .filter((s) => s.seleccion === selectedCountry)
      .filter((s) => {
        const matchSearch =
          s.jugador.toLowerCase().includes(search.toLowerCase()) ||
          s.numero.toString().includes(search);

        const matchFilter =
          filter === "all" ? true : filter === "pegadas" ? s.pegada : !s.pegada;

        return matchSearch && matchFilter;
      });

    return (
      <div className="min-h-screen bg-black p-6">
        <button
          onClick={() => setSelectedCountry(null)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#008f72] rounded-full text-white flex items-center justify-center shadow-2xl"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-4xl text-white mb-6">{selectedCountry}</h1>

        <div className="flex gap-3 mb-6">
          <input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-zinc-900 text-white px-3 py-2 rounded-xl"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-zinc-900 text-white px-3 rounded-xl"
          >
            <option value="all">Todas</option>
            <option value="pegadas">Pegadas</option>
            <option value="faltan">Faltan</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <StickerCard key={s.id} sticker={s} />
          ))}
        </div>
      </div>
    );
  }

  // PRINCIPAL
  return (
    <div className="min-h-screen  bg-black p-6">
      <Stats
        stickers={stickers}
        onShowRepetidas={() => setShowRepetidas(true)}
      />

      <div className="flex gap-3 mt-6 flex-wrap justify-center">
        <button
          onClick={exportFaltantes}
          className="bg-yellow-600 px-4 py-2 rounded text-white"
        >
          Faltantes
          <Download />
        </button>
        <button
          onClick={exportRepetidas}
          className="bg-[#008f72] px-4 py-2 rounded text-white"
        >
          Repetidas
          <Download />
        </button>

        <button
          onClick={exportData}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Backup
          <Download />
        </button>

        <label className="bg-purple-600 px-4 py-2 rounded text-white cursor-pointer">
          Importar
          <input type="file" hidden onChange={importData} />
          <Upload />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {countries.map((country) => {
          const countryStickers = stickers.filter(
            (s) => s.seleccion === country.nombre
          );

          const pegadas = countryStickers.filter((s) => s.pegada).length;
          const total = countryStickers.length;

          return (
            <button
              key={country.codigo}
              onClick={() => setSelectedCountry(country.nombre)}
              className="bg-zinc-900 p-4 rounded-2xl text-white"
            >
              {!["CC", "FWC"].includes(country.codigo) ? (
                <img
                  src={`https://flagcdn.io/${flags[country.nombre]}.svg`}
                  className="w-12 mx-auto"
                />
              ) : (
                <div className="w-12 h-8 flex items-center justify-center text-2xl mx-auto">
                  🌍
                </div>
              )}

              <p className="text-sm mt-2 text-center">{country.nombre}</p>

              <p className="text-xs text-zinc-400 text-center">
                {country.codigo}
              </p>

              <p className="text-xs text-zinc-500 text-center">
                {pegadas}/{total || 20}
              </p>
            </button>
          );
        })}
      </div>

      {/* 🔥 MODAL IMPORT */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-3xl w-full max-w-md">
            <h2 className="text-xl text-white mb-4">Importar datos</h2>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleReplace}
                className="bg-red-600 py-3 rounded text-white"
              >
                Reemplazar
              </button>

              <button
                onClick={handleMerge}
                className="bg-[#008f72] py-3 rounded text-white"
              >
                Combinar
              </button>

              <button
                onClick={() => setShowImportModal(false)}
                className="bg-zinc-800 py-3 rounded text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
