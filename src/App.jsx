import { Dot } from "lucide-react";
import Home from "./pages/Home";
// import { motion } from "motion/react"
import * as motion from "motion/react-client";
import { Starfield } from "@/components/Starfield"


function App() {
  return (
    <>
    <div className="fixed inset-0 -z-10 bg-[#0a0a0c] overflow-hidden">
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <Starfield
        starCount={10000}
        waveFrequency={15}
        starEscapeWidth={400}
        starColor={{ r: 168, g: 85, b: 247 }}
        maxOpacity={200}
        rotationSpeed={0.0002}
        waveSpeed={0.005}
      />
      <span className="pointer-events-none absolute z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-black/5">
        Aeterna Empires
      </span>
    </div>

    </div>

      <div className="relative w-full">
        <Home />
      </div>
    </>
  );
}



// function Rotate() {
//   return (
//     <motion.div
//       className=" bg-rougeSceau/10 border-2 border-rougeSceau p-8 rounded-[5px]" 
//       animate={{ rotate: 360, scale: 2, transition: { duration: 2 } }}
//       transition={{ duration: 1 }}
//     >
//       <p className="text-ivoire font-bold text-center">
//         Site en construction — disponible bientôt <br />...

//       </p>
//     </motion.div>
//   );
// }

// function Rotate() {
//   return (
//     <div className="relative rounded-[5px] p-0.5 overflow-hidden">
//       <motion.div
//         className="absolute inset-[-50%]"
//         style={{
//           background:
//             "conic-gradient(from 0deg, transparent 0%, var(--color-rougeSceau) 15%, transparent 30%)",
//         }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       />
//       <div className="relative bg-noirEmpire rounded-[5px] p-8">
//         <p className="text-ivoire font-bold text-center">
//           Site en construction — disponible bientôt <br />
//           <Dots/>
//         </p>
//       </div>
//     </div>
//   );
// }

// function Dots() {
//   const dot = {
//     animate: {
//       opacity: [0, 1, 0],
//       transition: { duration: 1.4, repeat: Infinity },
//     },
//   };

// return (
//   <span className="inline-flex">
//     <motion.span variants={dot} animate="animate" transition={{ delay: 0 }}>.</motion.span>
//     <motion.span variants={dot} animate="animate" transition={{ delay: 0.2 }}>.</motion.span>
//     <motion.span variants={dot} animate="animate" transition={{ delay: 0.4 }}>.</motion.span>
//   </span>
// );
// }


export default App;
