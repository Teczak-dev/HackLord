import { useRef, useState, useEffect, type ReactNode } from 'react';
import Draggable from 'react-draggable';
import WindowBar from './WindowBar';

interface WindowProps {
    children: ReactNode;
    windowTitle: string;
    width: number;
    height: number;
    customClasses?: string[];
    onClose?: () => void;
    onMinimize?: () => void;
}

const Window = ({ children, windowTitle, width, height, customClasses, onClose, onMinimize }: WindowProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [position, setPosition] = useState({ x: Math.random() * 200, y: Math.random() * 100 });
    const [prevPosition, setPrevPosition] = useState({ x: 30, y: 30 });
    const [bounds, setBounds] = useState({ left: 0, top: 30, right: 0, bottom: 0 });
    const nodeRef = useRef(null);
    
    // Funkcja do obliczania granic przeciągania
    const calculateBounds = () => {
        const menuBarHeight = 30; // wysokość menu bara
        const dockHeight = 80; // wysokość docka (przybliżona)
        const windowWidth = window.innerWidth * (width / 100);
        
        setBounds({
            left: -(windowWidth - 100), // pozostaw przynajmniej 100px widoczne z prawej
            top: menuBarHeight, // nie najeżdżaj na menu bar
            right: window.innerWidth - 100, // pozostaw przynajmniej 100px widoczne z lewej
            bottom: window.innerHeight - dockHeight - 50 // nie najeżdżaj na dock
        });
    };
    
    useEffect(() => {
        calculateBounds();
        
        // Przelicz granice przy zmianie rozmiaru okna
        const handleResize = () => calculateBounds();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, [width, height]);
    
    const windowStyle = { width: `${width}svw`, height: `${height}svh`};
    const fullscreenStyle = { 
        width: '100vw', 
        height: '100vh',
        position: 'fixed' as const,
        top: '30px',
        left: 0,
        zIndex: 9999,
        margin: 0,
        padding: 0,
        borderRadius: 0
    };

    const closeWindow = () => {
        setIsOpen(false);
        if (onClose) onClose();
    }

    const fullscreenWindow = () => {
	if (!isFullscreen) {
	    setPrevPosition(position); 
	    setPosition({ x: 0, y: 0 }); 
	    setIsFullscreen(true);
	} else {
	    setPosition(prevPosition); 
	    setIsFullscreen(false);
	}    
    }
    //@ts-ignore
    const handleDrag = (e: any, data: any) => {
        // Dodatkowa walidacja pozycji
        const newX = Math.max(bounds.left, Math.min(data.x, bounds.right));
        const newY = Math.max(bounds.top, Math.min(data.y, bounds.bottom));
        
	setPosition({ x: newX, y: newY });
    }

    if(!isOpen) return null;
    
    return(
	<Draggable 
	    nodeRef={nodeRef}
	    onDrag={handleDrag}
	    position={position}
	    disabled={isFullscreen}
	    bounds={bounds}
	>
	    <div ref={nodeRef} className={`window ${isFullscreen ? 'window-fullscreen' : ''} ${customClasses!== undefined ? customClasses[0]: ''}`} style={isFullscreen ? fullscreenStyle : windowStyle}>
		<WindowBar className={`handle ${customClasses!== undefined ? customClasses[1]: ''}  `}  closeWindow={closeWindow} fullscreenWindow={fullscreenWindow} minimizeWindow={onMinimize} windowTitle={windowTitle} />
		<div className={`window-content ${isFullscreen ? 'window-content-fullscreen' : ''}`}>
		    {children}
		</div>
	    </div>
	</Draggable>
    );
};

export default Window;
