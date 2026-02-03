import { type ReactNode } from 'react';

const FileExplorer = (): ReactNode => {

  return (
    <div style={{ 
      padding: '20px', 
      height: '100%', 
      backgroundColor: '#333', 
      borderRadius: '0 0 8px 8px', 
      color: '#fff',
      overflow: 'auto',
      boxSizing: 'border-box'
    }}>
      <h3>Explorator plików</h3>
      <div style={{ marginTop: '20px' }}>
        <p>Zawartość exploratora plików...</p>
        {/* Dodamy więcej zawartości żeby zobaczyć czy scroll działa */}
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{ padding: '5px', borderBottom: '1px solid #555' }}>
            Plik {i + 1}.txt
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
