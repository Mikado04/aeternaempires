import { Dot } from "lucide-react";
import Home from "./pages/Home";
// import { motion } from "motion/react"
import * as motion from "motion/react-client";

function App() {
  return (
    <>
      <div className="bg-noirEmpire w-full min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <Rotate />
        </div>
        {/* <Home/>
      <div className="flex justify-center items-center h-full">
        <div className="text-red-500 text-4xl flex justify-center items-center">ae</div>
      </div> */}
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

function Rotate() {
  return (
    <div className="relative rounded-[5px] p-[2px] overflow-hidden">
      <motion.div
        className="absolute inset-[-50%]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-rougeSceau) 15%, transparent 30%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative bg-noirEmpire rounded-[5px] p-8">
        <p className="text-ivoire font-bold text-center">
          Site en construction — disponible bientôt <br />
          <Dots/>
        </p>
      </div>
    </div>
  );
}

function Dots() {
  const dot = {
    animate: {
      opacity: [0, 1, 0],
      transition: { duration: 1.4, repeat: Infinity },
    },
  };

  return (
    <span className="inline-flex">
      <motion.span variants={dot} animate="animate" transition={{ delay: 0 }}>.</motion.span>
      <motion.span variants={dot} animate="animate" transition={{ delay: 0.2 }}>.</motion.span>
      <motion.span variants={dot} animate="animate" transition={{ delay: 0.4 }}>.</motion.span>
    </span>
  );
}


export default App;
