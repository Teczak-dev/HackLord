import { useRef, useState, type ReactNode } from 'react';
import Draggable from 'react-draggable';
import WindowBar from './WindowBar';

interface WindowProps {
    children: ReactNode;
    windowTitle: string;
    width: number;
    customClasses?: string[];
    onClose?: () => void;
}

const Window = ({ children, windowTitle, width, customClasses, onClose }: WindowProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [position, setPosition] = useState({ x: Math.random() * 200, y: Math.random() * 100 });
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    const nodeRef = useRef(null);
    
    const windowStyle = { width: `${width}svw`, height: 'fit-content'};
    const fullscreenStyle = { width: '100vw', height: '100vh'};

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
	setPosition({ x: data.x, y: data.y });
    }

    if(!isOpen) return null;
    
    return(
	<Draggable 
	    nodeRef={nodeRef}
	    onDrag={handleDrag}
	    position={position}
	    disabled={isFullscreen}
	>
	    <div ref={nodeRef} className={`window ${customClasses!== undefined ? customClasses[0]: ''}`} style={isFullscreen ? fullscreenStyle : windowStyle}>
		<WindowBar className={`handle ${customClasses!== undefined ? customClasses[1]: ''}  `}  closeWindow={closeWindow} fullscreenWindow={fullscreenWindow} windowTitle={windowTitle} />
		{children}
	    </div>
	</Draggable>
    );
};

export default Window;
