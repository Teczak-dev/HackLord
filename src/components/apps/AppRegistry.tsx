import { type ReactNode } from 'react';

import FileExplorer from './FileExplorer';

export interface AppDefinition {
    id: number;
    name: string;
    component: () => ReactNode;
    icon?: string; // emoji lub ścieżka do obrazu
    iconType?: 'emoji' | 'image'; // typ ikony
    width: number; // szerokość okna aplikacji w svw
}

export const apps: AppDefinition[] = [
    {
	id: 1,
	name: 'Explorer',
	component: FileExplorer,
	icon: '/icons/folder.svg',
	iconType: 'image',
	width: 50,
    },
];


export const getAppById = (id: number): AppDefinition | undefined => {
    return apps.find(app => app.id === id);
};
