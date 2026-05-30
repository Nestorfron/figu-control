// 1. Listado oficial de las 48 selecciones con sus siglas oficiales de Panini
const selecciones = [
  { codigo: "ALG", nombre: "Argelia" },
  { codigo: "ARG", nombre: "Argentina" },
  { codigo: "AUS", nombre: "Australia" },
  { codigo: "AUT", nombre: "Austria" },
  { codigo: "BEL", nombre: "Bélgica" },
  { codigo: "BIH", nombre: "Bosnia y Herzegovina" },
  { codigo: "BRA", nombre: "Brasil" },
  { codigo: "CPV", nombre: "Cabo Verde" },
  { codigo: "CAN", nombre: "Canadá" },
  { codigo: "COL", nombre: "Colombia" },
  { codigo: "COD", nombre: "Congo DR" },
  { codigo: "CIV", nombre: "Costa de Marfil" },
  { codigo: "CRO", nombre: "Croacia" },
  { codigo: "CUW", nombre: "Curazao" },
  { codigo: "CZE", nombre: "República Checa" },
  { codigo: "ECU", nombre: "Ecuador" },
  { codigo: "EGY", nombre: "Egipto" },
  { codigo: "ENG", nombre: "Inglaterra" },
  { codigo: "ESP", nombre: "España" },
  { codigo: "FRA", nombre: "Francia" },
  { codigo: "GER", nombre: "Alemania" },
  { codigo: "GHA", nombre: "Ghana" },
  { codigo: "HTI", nombre: "Haití" },
  { codigo: "IRN", nombre: "Irán" },
  { codigo: "IRQ", nombre: "Irak" },
  { codigo: "JPN", nombre: "Japón" },
  { codigo: "JOR", nombre: "Jordania" },
  { codigo: "KOR", nombre: "Corea del Sur" },
  { codigo: "MAR", nombre: "Marruecos" },
  { codigo: "MEX", nombre: "México" },
  { codigo: "NED", nombre: "Países Bajos" },
  { codigo: "NZL", nombre: "Nueva Zelanda" },
  { codigo: "NOR", nombre: "Noruega" },
  { codigo: "PAN", nombre: "Panamá" },
  { codigo: "PAR", nombre: "Paraguay" },
  { codigo: "POR", nombre: "Portugal" },
  { codigo: "QAT", nombre: "Catar" },
  { codigo: "KSA", nombre: "Arabia Saudita" },
  { codigo: "SCO", nombre: "Escocia" },
  { codigo: "SEN", nombre: "Senegal" },
  { codigo: "RSA", nombre: "Sudáfrica" },
  { codigo: "SUI", nombre: "Suiza" },
  { codigo: "SWE", nombre: "Suecia" },
  { codigo: "TUN", nombre: "Túnez" },
  { codigo: "TUR", nombre: "Turquía" },
  { codigo: "USA", nombre: "Estados Unidos" },
  { codigo: "URU", nombre: "Uruguay" },
  { codigo: "UZB", nombre: "Uzbekistán" },
  { codigo: "FWC", nombre: "FIFA" },
  { codigo: "CC", nombre: "Coca-Cola" },
];

// 2. Jugadores franquicia y elementos especiales
const nombresClave = {
  "FWC-1": "Logo Panini",
  "FWC-2": "Trofeo de la Copa del Mundo",
  "FWC-3": "Mascota Oficial",
  "FWC-4": "Pelota Oficial",

  "ARG-19": "Lionel Messi",
  "URU-3": "Federico Valverde",
  "URU-4": "Darwin Núñez",
  "BRA-8": "Vinicius Jr",
  "FRA-10": "Kylian Mbappé",

  "CC-1": "Lamine Yamal (Coca-Cola)",
  "CC-2": "Harry Kane (Coca-Cola)",
  "CC-3": "Joshua Kimmich (Coca-Cola)",
  "CC-4": "Lautaro Martínez (Coca-Cola)",
};

// 3. Generador de catálogo
const generarCatalogoCompleto = () => {
  const listaCompleta = [];
  let idUnico = 1;

  // 🟣 PARTE A: FWC (1–19) ✅ CORREGIDO
  for (let i = 1; i <= 19; i++) {
    const codSticker = `FWC-${i}`;

    listaCompleta.push({
      id: idUnico++,
      numero: codSticker,
      jugador: nombresClave[codSticker] || `Especial Institucional FWC ${i}`,
      seleccion: "FIFA",
      tipo: "especial",
    });
  }

  // 🔵 PARTE B: Selecciones (20 por país)
  selecciones.forEach((pais) => {
    for (let i = 1; i <= 20; i++) {
      const codSticker = `${pais.codigo}-${i}`;

      let nombreAsignado = `Jugador ${pais.codigo} ${i}`;
      let tipo = "jugador";

      if (i === 1) {
        nombreAsignado = `Escudo de ${pais.nombre}`;
        tipo = "escudo";
      } else if (i === 13) {
        nombreAsignado = `Foto de Equipo ${pais.nombre}`;
        tipo = "equipo";
      }

      if (nombresClave[codSticker]) {
        nombreAsignado = nombresClave[codSticker];
        tipo = "estrella";
      }

      listaCompleta.push({
        id: idUnico++,
        numero: codSticker,
        jugador: nombreAsignado,
        seleccion: pais.nombre,
        tipo,
      });
    }
  });

  // 🟡 PARTE C: Coca-Cola (1–12)
  for (let i = 1; i <= 12; i++) {
    const codSticker = `CC-${i}`;

    listaCompleta.push({
      id: idUnico++,
      numero: codSticker,
      jugador: nombresClave[codSticker] || `Estrella Exclusiva Coca-Cola ${i}`,
      seleccion: "Coca-Cola",
      tipo: "especial",
    });
  }

  return listaCompleta;
};

// Exportación
export const stickers = generarCatalogoCompleto();
export { selecciones };

// Debug
console.log(`Catálogo generado: ${stickers.length} figuritas`);
