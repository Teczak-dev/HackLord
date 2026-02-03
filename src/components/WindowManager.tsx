import { useApps } from '../shared/hooks/useApps';
import Window from './window/Window';

const WindowManager = () => {
    const { openWindows, closeWindow, bringToFront, minimizeWindow } = useApps();

    return (
        <>
            {openWindows.filter(window => !window.isMinimized).map((window) => (
                <div
                    key={window.id}
                    style={{ 
                        position: 'absolute',
                        zIndex: window.zIndex,
			backgroundColor: 'transparent'
                    }}
                    onClick={() => bringToFront(window.id)}
                >
                    <Window
                        windowTitle={window.app.name}
                        onClose={() => closeWindow(window.id)}
                        onMinimize={() => minimizeWindow(window.id)}
			width={window.app.width}
			height={window.app.height}
		    >
                        <window.app.component />
                    </Window>
                </div>
            ))}
        </>
    );
};

export default WindowManager;
