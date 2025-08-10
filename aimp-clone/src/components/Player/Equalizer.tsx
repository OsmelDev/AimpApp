"use client";
import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/lib/themes";
import { FC, useState } from "react";
import { FiRotateCw, FiSave } from "react-icons/fi";

interface EqualizerProps {
  handleOpenEqualizer: () => void;
}

const Equalizer: FC<EqualizerProps> = ({ handleOpenEqualizer }) => {
  const bands = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
  const [values, setValues] = useState<number[]>(
    new Array(bands.length).fill(0)
  );
  const [isEnabled, setIsEnabled] = useState(false);
  const [preset, setPreset] = useState("Flat");
  const { theme } = useTheme();
  const handleReset = () => {
    setValues(new Array(bands.length).fill(0));
    setPreset("Flat");
  };

  const handleSave = () => {
    console.log("Guardar preset");
  };

  const handleBandChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = e.target.value;
    setPreset(selectedPreset);

    // Simular cambios según el preset seleccionado
    if (selectedPreset === "Rock") {
      setValues([4, 3, 2, 0, -1, 1, 3, 4, 3, 2]);
    } else if (selectedPreset === "Pop") {
      setValues([2, 1, 0, 1, 3, 2, 1, 0, -1, -2]);
    } else if (selectedPreset === "Jazz") {
      setValues([3, 2, 1, 0, -1, -2, -1, 0, 1, 2]);
    } else {
      setValues(new Array(bands.length).fill(0));
    }
  };

  const options = ["Piano", "Flat", "Rock", "Pop", "Jazz", "Classical"];

  return (
    <div
      className={`${themes[theme].playlist.baseBackground} min-h-full h-full`}
    >
      <div
        className={`h-[40px] cursor-pointer p-2 text-sm
        font-bold text-gray-200 flex items-center border-b ${themes[theme].header} ${themes[theme].borderB}`}
        onClick={handleOpenEqualizer}
      >
        Equalizer
      </div>
      <div className="p-4 h-[90%] ">
        <div className="w-full h-full text-gray-200 flex flex-col">
          <div
            className={`${themes[theme].header} ${themes[theme].borderB} p-2 flex justify-between items-center
           border-b`}
          >
            <div className="text-sm font-bold ">Ecualizador</div>
            <div className="flex items-center space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => setIsEnabled(!isEnabled)}
                  className="form-checkbox h-3 w-3 text-blue-600"
                />
                <span className="ml-1 text-xs">Activar</span>
              </label>
            </div>
          </div>

          <div className={`p-3 flex-1  ${themes[theme].equalizer.content} `}>
            <div className="mb-4 ">
              <label
                className={`block text-xs mb-1 ${themes[theme].equalizer.text}`}
              >
                Preajuste:
              </label>
              <div className="flex ">
                <select
                  value={preset}
                  onChange={handlePresetChange}
                  className={`${themes[theme].equalizer.bgSelect} border border-gray-500/20 ${themes[theme].equalizer.text} text-xs p-1 rounded flex-1`}
                >
                  {options.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-transparent"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleReset}
                  className={`ml-2 p-1 ${themes[theme].equalizer.text}
                    ${themes[theme].equalizer.hoverText} cursor-pointer`}
                  title="Resetear"
                >
                  <FiRotateCw size={14} />
                </button>
                <button
                  onClick={handleSave}
                  className={`ml-1 p-1 ${themes[theme].equalizer.text} ${themes[theme].equalizer.hoverText} cursor-pointer`}
                  title="Guardar"
                >
                  <FiSave size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1 ">
              {bands.map((band, index) => (
                <div
                  key={band}
                  className="h-24 flex flex-col justify-center items-center "
                >
                  <input
                    type="range"
                    min="-15"
                    max="15"
                    value={values[index]}
                    onChange={(e) =>
                      handleBandChange(index, parseInt(e.target.value))
                    }
                    className="w-full h-20 -rotate-90   "
                    disabled={!isEnabled}
                  />
                  <div
                    className={`text-xs mt-2 ${themes[theme].equalizer.text}`}
                  >
                    {band}
                  </div>
                  <div className={`text-xs ${themes[theme].playlist.text}`}>
                    {values[index] > 0 ? `+${values[index]}` : values[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equalizer;
// ("use client");
// import { useTheme } from "@/context/ThemeProvider";
// import { themes } from "@/lib/themes";
// import {
//   Dispatch,
//   FC,
//   RefObject,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { FiRotateCw, FiSave } from "react-icons/fi";

// interface EqualizerProps {
//   handleOpenEqualizer: () => void;
//   audioContextRef: React.RefObject<AudioContext | null>;
//   sourceNode: MediaElementAudioSourceNode | null;
// }

// const Equalizer: FC<EqualizerProps> = ({
//   handleOpenEqualizer,
//   audioContextRef,
//   sourceNode,
// }) => {
//   const bands = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
//   const [values, setValues] = useState<number[]>(
//     new Array(bands.length).fill(0)
//   );
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [preset, setPreset] = useState("Flat");
//   const { theme } = useTheme();
//   const filtersRef = useRef<BiquadFilterNode[]>([]);

//   // Inicializar filtros
//   useEffect(() => {
//     if (!audioContextRef.current || !sourceNode) return;

//     const context = audioContextRef.current;
//     filtersRef.current = bands.map((frequency, i) => {
//       const filter = context.createBiquadFilter();
//       filter.type = "peaking";
//       filter.frequency.value = frequency;
//       filter.Q.value = 1;
//       filter.gain.value = values[i];
//       return filter;
//     });

//     // Conectar la cadena de filtros
//     if (sourceNode) {
//       let lastNode: AudioNode = sourceNode;
//       filtersRef.current.forEach((filter) => {
//         lastNode.connect(filter);
//         lastNode = filter;
//       });
//       lastNode.connect(context.destination);
//     }

//     return () => {
//       filtersRef.current.forEach((filter) => filter.disconnect());
//     };
//   }, [audioContextRef, sourceNode]);

//   // Actualizar filtros cuando cambian los valores
//   useEffect(() => {
//     if (!isEnabled) return;

//     filtersRef.current.forEach((filter, i) => {
//       filter.gain.value = values[i];
//     });
//   }, [values, isEnabled]);

//   const handleReset = () => {
//     setValues(new Array(bands.length).fill(0));
//     setPreset("Flat");
//   };

//   const handleSave = () => {
//     console.log("Preset guardado:", { preset, values });
//     // Aquí puedes implementar la lógica para guardar en localStorage
//   };

//   const handleBandChange = (index: number, value: number) => {
//     const newValues = [...values];
//     newValues[index] = value;
//     setValues(newValues);
//   };

//   const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedPreset = e.target.value;
//     setPreset(selectedPreset);

//     switch (selectedPreset) {
//       case "Rock":
//         setValues([4, 3, 2, 0, -1, 1, 3, 4, 3, 2]);
//         break;
//       case "Pop":
//         setValues([2, 1, 0, 1, 3, 2, 1, 0, -1, -2]);
//         break;
//       case "Jazz":
//         setValues([3, 2, 1, 0, -1, -2, -1, 0, 1, 2]);
//         break;
//       case "Classical":
//         setValues([5, 4, 3, 2, 0, -1, -2, -1, 0, 1]);
//         break;
//       case "Piano":
//         setValues([-1, 0, 1, 2, 3, 2, 1, 0, -1, -2]);
//         break;
//       default:
//         setValues(new Array(bands.length).fill(0));
//     }
//   };

//   const handleEnableToggle = () => {
//     const newState = !isEnabled;
//     setIsEnabled(newState);

//     // Resetear a cero cuando se desactiva
//     if (!newState) {
//       filtersRef.current.forEach((filter) => {
//         filter.gain.value = 0;
//       });
//     } else {
//       // Aplicar valores actuales cuando se activa
//       filtersRef.current.forEach((filter, i) => {
//         filter.gain.value = values[i];
//       });
//     }
//   };

//   const options = ["Flat", "Rock", "Pop", "Jazz", "Classical", "Piano"];

//   return (
//     <div
//       className={`${themes[theme].playlist.baseBackground} min-h-full h-full`}
//     >
//       <div
//         className={`h-[40px] cursor-pointer p-2 text-sm
//         font-bold text-gray-200 flex items-center border-b ${themes[theme].header} ${themes[theme].borderB}`}
//         onClick={handleOpenEqualizer}
//       >
//         Equalizer
//       </div>
//       <div className="p-4 h-[90%] ">
//         <div className="w-full h-full text-gray-200 flex flex-col">
//           <div
//             className={`${themes[theme].header} ${themes[theme].borderB} p-2 flex justify-between items-center
//            border-b`}
//           >
//             <div className="text-sm font-bold ">Ecualizador</div>
//             <div className="flex items-center space-x-2">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={isEnabled}
//                   onChange={handleEnableToggle}
//                   className="form-checkbox h-3 w-3 text-blue-600"
//                 />
//                 <span className="ml-1 text-xs">Activar</span>
//               </label>
//             </div>
//           </div>

//           <div className={`p-3 flex-1  ${themes[theme].equalizer.content} `}>
//             <div className="mb-4 ">
//               <label
//                 className={`block text-xs mb-1 ${themes[theme].equalizer.text}`}
//               >
//                 Preajuste:
//               </label>
//               <div className="flex ">
//                 <select
//                   value={preset}
//                   onChange={handlePresetChange}
//                   className={`${themes[theme].equalizer.bgSelect} border border-gray-500/20 ${themes[theme].equalizer.text} text-xs p-1 rounded flex-1`}
//                 >
//                   {options.map((option) => (
//                     <option
//                       key={option}
//                       value={option}
//                       className="bg-transparent"
//                     >
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={handleReset}
//                   className={`ml-2 p-1 ${themes[theme].equalizer.text}
//                     ${themes[theme].equalizer.hoverText} cursor-pointer`}
//                   title="Resetear"
//                 >
//                   <FiRotateCw size={14} />
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   className={`ml-1 p-1 ${themes[theme].equalizer.text} ${themes[theme].equalizer.hoverText} cursor-pointer`}
//                   title="Guardar"
//                 >
//                   <FiSave size={14} />
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-5 gap-1 ">
//               {bands.map((band, index) => (
//                 <div
//                   key={band}
//                   className="h-24 flex flex-col justify-center items-center "
//                 >
//                   <input
//                     type="range"
//                     min="-15"
//                     max="15"
//                     value={values[index]}
//                     onChange={(e) =>
//                       handleBandChange(index, parseInt(e.target.value))
//                     }
//                     className="w-full h-20 -rotate-90   "
//                     disabled={!isEnabled}
//                   />
//                   <div
//                     className={`text-xs mt-2 ${themes[theme].equalizer.text}`}
//                   >
//                     {band}
//                   </div>
//                   <div className={`text-xs ${themes[theme].playlist.text}`}>
//                     {values[index] > 0 ? `+${values[index]}` : values[index]}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Equalizer;
