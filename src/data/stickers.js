// 1. Listado oficial de las 48 selecciones con sus siglas oficiales de Panini
const selecciones = [
    { codigo: "ARG", nombre: "Argentina" },
    { codigo: "AUS", nombre: "Australia" },
    { codigo: "AUT", nombre: "Austria" },
    { codigo: "BEL", nombre: "Bélgica" },
    { codigo: "BIH", nombre: "Bosnia y Herzegovina" },
    { codigo: "BRA", nombre: "Brasil" },
    { codigo: "CAN", nombre: "Canadá" },
    { codigo: "CHI", nombre: "Chile" },
    { codigo: "CIV", nombre: "Costa de Marfil" },
    { codigo: "COL", nombre: "Colombia" },
    { codigo: "CRC", nombre: "Costa Rica" },
    { codigo: "CRO", nombre: "Croacia" },
    { codigo: "CUW", nombre: "Curazao" },
    { codigo: "CZE", nombre: "República Checa" },
    { codigo: "DEN", nombre: "Dinamarca" },
    { codigo: "ECU", nombre: "Ecuador" },
    { codigo: "EGY", nombre: "Egipto" },
    { codigo: "ENG", nombre: "Inglaterra" },
    { codigo: "ESP", nombre: "España" },
    { codigo: "FRA", nombre: "Francia" },
    { codigo: "GER", nombre: "Alemania" },
    { codigo: "GHA", nombre: "Ghana" },
    { codigo: "HON", nombre: "Honduras" },
    { codigo: "IRN", nombre: "Irán" },
    { codigo: "IRQ", nombre: "Irak" },
    { codigo: "ITA", nombre: "Italia" },
    { codigo: "JOR", nombre: "Jordania" },
    { codigo: "JPN", nombre: "Japón" },
    { codigo: "KOR", nombre: "Corea del Sur" },
    { codigo: "KSA", nombre: "Arabia Saudita" },
    { codigo: "MAR", nombre: "Marruecos" },
    { codigo: "MEX", nombre: "México" },
    { codigo: "MLI", nombre: "Malí" },
    { codigo: "NED", nombre: "Países Bajos" },
    { codigo: "NGA", nombre: "Nigeria" },
    { codigo: "NOR", nombre: "Noruega" },
    { codigo: "NZL", nombre: "Nueva Zelanda" },
    { codigo: "PAN", nombre: "Panamá" },
    { codigo: "PAR", nombre: "Paraguay" },
    { codigo: "PER", nombre: "Perú" },
    { codigo: "POR", nombre: "Portugal" },
    { codigo: "RSA", nombre: "Sudáfrica" },
    { codigo: "SCO", nombre: "Escocia" },
    { codigo: "SEN", nombre: "Senegal" },
    { codigo: "SUI", nombre: "Suiza" },
    { codigo: "TUN", nombre: "Túnez" },
    { codigo: "URU", nombre: "Uruguay" },
    { codigo: "USA", nombre: "Estados Unidos" }
  ];
  
  // 2. Jugadores franquicia y elementos institucionales confirmados
  const nombresClave = {
 
  };
  
  // 3. Función constructora automática del catálogo completo
  const generarCatalogoCompleto = () => {
    const listaCompleta = [];
    let idUnico = 1;
  
    // PARTE A: Secciones Iniciales FWC (1 al 20)
    for (let i = 1; i <= 20; i++) {
      const codSticker = `FWC-${i}`;
      listaCompleta.push({
        id: idUnico++,
        numero: codSticker,
        jugador: nombresClave[codSticker] || `Especial Institucional FWC ${i}`,
        seleccion: "FIFA"
      });
    }
  
    // PARTE B: Países y sus 20 figuritas internas
    selecciones.forEach((pais) => {
      for (let i = 1; i <= 20; i++) {
        const codSticker = `${pais.codigo}-${i}`;
        
        // Asignación por defecto de roles fijos por número
        let nombreAsignado = `Jugador ${pais.codigo} ${i}`;
        if (i === 1) nombreAsignado = `Escudo de ${pais.nombre}`;
        if (i === 2) nombreAsignado = `Foto de Equipo ${pais.nombre}`;
        
        // Si está en el diccionario de nombres clave, se sobrescribe
        if (nombresClave[codSticker]) {
          nombreAsignado = nombresClave[codSticker];
        }
  
        listaCompleta.push({
          id: idUnico++,
          numero: codSticker,
          jugador: nombreAsignado,
          seleccion: pais.nombre
        });
      }
    });
  
    // PARTE C: Sección de Bonificación Especial Coca-Cola (CC-1 a CC-12)
    for (let i = 1; i <= 12; i++) {
      const codSticker = `CC-${i}`;
      listaCompleta.push({
        id: idUnico++,
        numero: codSticker,
        jugador: nombresClave[codSticker] || `Estrella Exclusiva Coca-Cola ${i}`,
        seleccion: "Coca-Cola"
      });
    }
  
    return listaCompleta;
  };
  
  // Exportación del array final procesado
  export const stickers = generarCatalogoCompleto();
  
  // Ejemplo de depuración: Imprime en consola la cantidad total generada al importarse
  console.log(`[Panini 2026] Catálogo generado con éxito: ${stickers.length} figuritas.`);
  