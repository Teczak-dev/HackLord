import { useApps } from '../shared/hooks/useApps';
import Window from './window/Window';

const WindowManager = () => {
    const { openWindows, closeWindow, bringToFront } = useApps();

    return (
        <>
            {openWindows.map((window) => (
                <div
                    key={window.id}
                    style={{ 
                        position: 'absolute',
                        zIndex: window.zIndex 
                    }}
                    onClick={() => bringToFront(window.id)}
                >
                    <Window
                        windowTitle={window.app.name}
                        onClose={() => closeWindow(window.id)}
			width={window.app.width}	
		    >
                        <window.app.component />
                    </Window>
                </div>
            ))}
        </>
    );
};

export default WindowManager;
