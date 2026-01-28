import { useRef, useState, type ReactNode } from 'react';
import Draggable from 'react-draggable';
import WindowBar from './WindowBar';

const Window = ({children}:{children:ReactNode}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    const nodeRef = useRef(null);
    
    const windowStyle = { width: '30vw', height: '40vh', border: '1px solid black' };
    const fullscreenStyle = { width: '100vw', height: '100vh', border: '1px solid black' };

    const closeWindow = () => {
	setIsOpen(false);
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
	    <div ref={nodeRef} className="window" style={isFullscreen ? fullscreenStyle : windowStyle}>
		<WindowBar className="handle"  closeWindow={closeWindow} fullscreenWindow={fullscreenWindow} />
		{children}
	    </div>
	</Draggable>
    );
};

export default Window;
