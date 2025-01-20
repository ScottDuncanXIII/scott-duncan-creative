import { createContext, ReactNode, useState } from "react";

type PreloaderActiveType = {
  preloaderActiveArray: string[];
  pushItemToArray: (pageId: string) => void;
};

const PreloaderActiveContext = createContext<PreloaderActiveType | null>(null);

function PreloaderActiveProvider({ children }: { children: ReactNode }) {
  const [preloaderActiveArray, setPreloaderActiveArray] = useState<string[]>(
    []
  );

  function pushItemToArray(pageId: string) {
    if (preloaderActiveArray.includes(pageId)) return;

    const updatedPreloaderArray = [...preloaderActiveArray, pageId];

    //console.log("updatedPreloaderArray", updatedPreloaderArray);
    setPreloaderActiveArray(updatedPreloaderArray);
  }

  return (
    <PreloaderActiveContext.Provider
      value={{ preloaderActiveArray, pushItemToArray }}
    >
      {children}
    </PreloaderActiveContext.Provider>
  );
}

export { PreloaderActiveProvider, PreloaderActiveContext };
