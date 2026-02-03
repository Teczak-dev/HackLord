import { useApps } from '../../shared/hooks/useApps';
import { apps } from '../apps/AppRegistry';
import styles from './Dock.module.css';

interface DockProps {
    startUpApp: (id: number) => void;
}

const Dock = ({ startUpApp }: DockProps) => {
    
    const { openWindows, restoreWindow } = useApps();

    const handleAppClick = (app: typeof apps[0]) => {
        // Sprawdź czy jest minimalizowane okno tej aplikacji
        const minimizedWindow = openWindows.find(window => 
            window.app.id === app.id && window.isMinimized
        );
        
        if (minimizedWindow) {
            // Przywróć minimalizowane okno
            restoreWindow(minimizedWindow.id);
        } else {
            // Otwórz nową aplikację
            startUpApp(app.id);
        }
    };

    const renderIcon = (app: typeof apps[0]) => {
        if (app.iconType === 'image' && app.icon) {
            return (
                <img 
                    src={app.icon} 
                    alt={app.name}
                    className={styles.appIconImage}
                />
            );
        }
        
        // Domyślnie emoji lub fallback
        return (
            <div className={styles.appIcon}>
                {app.icon || '📦'}
            </div>
        );
    };

    return (
	<div className={styles.dock}>
	    {apps.map((app) => {
                const appWindow = openWindows.find(window => window.app.id === app.id);
                const isOpen = !!appWindow;
                const isMinimized = appWindow?.isMinimized || false;
                
                return (
		<div 
                    className={styles.appContainer} 
                    onClick={() => handleAppClick(app)} 
                    key={app.id}
                    title={app.name}
                >
		    {renderIcon(app)}
		    <div className={styles.appName}>{app.name}</div>
		    {isOpen && (
			<div className={`${styles.openIndicator} ${isMinimized ? styles.minimizedIndicator : ''}`}></div>
		    )}
		</div>
                );
            })}
	</div>
    );
}

export default Dock;
