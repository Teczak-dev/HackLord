import { apps } from '../apps/AppRegistry';
import styles from './Dock.module.css';

interface DockProps {
    startUpApp: (id: number) => void;
}

const Dock = ({ startUpApp }: DockProps) => {
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
	    {apps.map((app) => (
		<div 
                    className={styles.appContainer} 
                    onClick={() => startUpApp(app.id)} 
                    key={app.id}
                    title={app.name}
                >
		    {renderIcon(app)}
		    <div className={styles.appName}>{app.name}</div>
		</div>
	    ))}
	</div>
    );
}

export default Dock;
