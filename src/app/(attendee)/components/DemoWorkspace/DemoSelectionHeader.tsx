import { type Demo } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleCheck } from "lucide-react";
import { useState } from "react";

import { cn } from "~/lib/utils";

export function DemoSelectionHeader({
  demos,
  selectedDemo,
  setSelectedDemo,
  currentDemoId,
}: {
  demos: Demo[];
  selectedDemo: Demo | undefined;
  setSelectedDemo: (demo: Demo) => void;
  currentDemoId: string | null;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  return (
    <div className="fixed w-full p-2">
      <div
        onClick={toggleExpand}
        className={cn(
          "flex w-full cursor-pointer flex-row items-center justify-between rounded-xl px-4 py-2 text-center font-semibold shadow-lg transition-all duration-300 ease-in-out focus:outline-none",
          selectedDemo?.id === currentDemoId ? "bg-green-200" : "bg-red-200",
        )}
      >
        <motion.div
          key={selectedDemo ? selectedDemo.id : "none"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-row gap-2"
        >
          <p className="w-[17px]">{(selectedDemo?.index ?? 0) + 1}.</p>
          <p>{`${selectedDemo?.name ?? ""} ${selectedDemo?.id === currentDemoId ? "(current demo)" : ""}`}</p>
        </motion.div>
        <ChevronDown
          size={24}
          className={cn(
            "transform transition-transform duration-300 ease-in-out",
            isExpanded ? "rotate-180" : "",
          )}
        />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute left-0 flex max-h-[calc(100vh-4rem)] w-full flex-col gap-2 overflow-y-auto px-2 pb-12 pt-2">
            {demos.map((demo) => (
              <motion.div
                initial={{ opacity: 0, y: -(demo.index + 1) * 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -(demo.index + 1) * 30 }}
                key={demo.id}
                onClick={() => {
                  setSelectedDemo(demo);
                  setIsExpanded(false);
                }}
                className={cn(
                  "flex cursor-pointer flex-row items-center justify-between gap-2 rounded-xl p-2 px-4 font-semibold shadow-xl focus:outline-none",
                  demo.id === currentDemoId ? "bg-green-200" : "bg-white",
                )}
              >
                <div className="flex flex-row gap-2">
                  <p className="w-[17px]">{demo.index + 1}.</p>
                  <p>{`${demo.name} ${demo.id === currentDemoId ? "(current demo)" : ""}`}</p>
                </div>
                {selectedDemo?.id === demo.id && (
                  <CircleCheck size={18} strokeWidth={2.25} />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}