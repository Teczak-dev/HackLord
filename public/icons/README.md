# Przykładowa aplikacja z ikoną obrazu

Aby dodać aplikację z niestandardową ikoną:

## 1. Umieść ikonę w folderze `public/icons/`
Przykład: `public/icons/photoshop.png`

## 2. Stwórz komponent aplikacji w `src/components/apps/`
```tsx
// src/components/apps/Photoshop.tsx
import { type ReactNode } from 'react';

const Photoshop = (): ReactNode => (
  <div style={{ padding: '20px' }}>
    <h3>🎨 Adobe Photoshop</h3>
    <p>Edytor graficzny...</p>
  </div>
);

export default Photoshop;
```

## 3. Dodaj do AppRegistry.tsx
```tsx
import Photoshop from './Photoshop';

export const apps: AppDefinition[] = [
  // ... inne aplikacje
  {
    id: 6,
    name: 'Photoshop',
    component: Photoshop,
    icon: '/icons/photoshop.png',  // ścieżka do obrazu
    iconType: 'image'              // typ ikony
  }
];
```

Ikony powinny być:
- Format: PNG, JPG, SVG
- Rozmiar: 32x32px lub większe (skalują się automatycznie)
- Ścieżka: zaczyna się od `/icons/` (względem public)