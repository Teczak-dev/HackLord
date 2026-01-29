import { createContext, useState, type ReactNode } from "react";
import type { AppDefinition } from "../components/apps/AppRegistry";

interface OpenWindow {
  id: string;
  app: AppDefinition;
  zIndex: number;
}

interface AppsContextType {
  openWindows: OpenWindow[];
  openApp: (app: AppDefinition) => void;
  closeWindow: (windowId: string) => void;
  bringToFront: (windowId: string) => void;
}

export const AppsContext = createContext<AppsContextType | undefined>(undefined);

export const AppsProvider = ({children}:{children:ReactNode}) => {
    const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
    const [nextZIndex, setNextZIndex] = useState(1000);

    const openApp = (app: AppDefinition) => {
        // Sprawdź czy okno już jest otwarte
        const existingWindow = openWindows.find(window => window.app.id === app.id);
        if (existingWindow) {
            bringToFront(existingWindow.id);
            return;
        }

        const windowId = `${app.id}_${Date.now()}`;
        const newWindow: OpenWindow = {
            id: windowId,
            app,
            zIndex: nextZIndex
        };
        
        setOpenWindows(prev => [...prev, newWindow]);
        setNextZIndex(prev => prev + 1);
    };

    const closeWindow = (windowId: string) => {
        setOpenWindows(prev => prev.filter(window => window.id !== windowId));
    };

    const bringToFront = (windowId: string) => {
        setOpenWindows(prev => prev.map(window => 
            window.id === windowId 
                ? { ...window, zIndex: nextZIndex } 
                : window
        ));
        setNextZIndex(prev => prev + 1);
    };

    return(
	<AppsContext.Provider value={{
            openWindows,
            openApp,
            closeWindow,
            bringToFront
        }}>
	    {children}
	</AppsContext.Provider>
    );
}
