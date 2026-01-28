import { useEffect, useRef, useState } from "react";
import styles from '../styles/BootUp.module.css';
import { useNavigate } from "react-router-dom";

interface BootLog{
    text: string;
    type?: "success" | "error" | "highlight";
    delay: number;
}

const BootUp = () => {
    
    const [lines, setLines] = useState<BootLog[]>([]);
    const bottomRef = useRef(null);
    const navigate = useNavigate();

    const bootLogs:BootLog[] = [
	// --- HARDWARE & KERNEL ---
	{ text: "Booting OS Kernel v6.0.19-generic...", delay: 600 },
	{ text: "Wykrywanie procesora: 8 rdzeni, 16 wątków.", delay: 100 },
	{ text: "Inicjalizacja pamięci RAM: 32768 MB OK.", delay: 100 },
	{ text: "Ładowanie sterowników ACPI...", delay: 50 },
	{ text: "[ OK ] Załadowano sterowniki chipsetu płyty głównej.", type: "success", delay: 50 },
	{ text: "Skanowanie magistrali PCI...", delay: 150 },
	{ text: "Wykryto kartę graficzną: NVIDIA GeForce RTX 4090 (symulowana).", delay: 200 },
	{ text: "Inicjalizacja kontrolera USB 3.0...", delay: 80 },
  
	// --- FILESYSTEM ---
	{ text: "Sprawdzanie spójności systemu plików (/dev/nvme0n1p2)...", delay: 800 }, 
	{ text: "clean, 14320/2203920 files, 432092/8815680 blocks", delay: 100 },
	{ text: "Montowanie lokalnych systemów plików...", delay: 200 },
	{ text: "[ OK ] Zamontowano / (root).", type: "success", delay: 40 },
	{ text: "[ OK ] Zamontowano /home.", type: "success", delay: 40 },
	{ text: "[ OK ] Zamontowano /var/log.", type: "success", delay: 40 },
	{ text: "Aktywacja przestrzeni wymiany (SWAP)...", delay: 150 },
	{ text: "[ OK ] Aktywowano partycję wymiany.", type: "success", delay: 50 },

	// --- SYSTEM SERVICES ---
	{ text: "Uruchamianie menedżera Udev...", delay: 20 },
	{ text: "Konfiguracja strefy czasowej (Europe/Warsaw)...", delay: 20 },
	{ text: "[ OK ] Zsynchronizowano zegar systemowy.", type: "success", delay: 30 },
	{ text: "Uruchamianie demona D-Bus...", delay: 30 },
	{ text: "[ OK ] Uruchomiono D-Bus System Message Bus.", type: "success", delay: 30 },
	{ text: "Startowanie usług kryptograficznych...", delay: 100 },
	{ text: "Generowanie kluczy sesji RSA 4096-bit...", delay: 600 }, 	
	{ text: "[ OK ] Klucze wygenerowane pomyślnie.", type: "success", delay: 50 },

	// --- NETWORKING ---
	{ text: "Inicjalizacja stosu sieciowego...", delay: 200 },
	{ text: "Wykryto interfejs eth0.", delay: 50 },
	{ text: "Wykryto interfejs wlan0.", delay: 50 },
	{ text: "Oczekiwanie na konfigurację sieci...", delay: 1000 }, // nie usuwać bo błąd wywali w nvim!!!
	{ text: "Wysyłanie zapytania DHCP...", delay: 400 },
	{ text: "Otrzymano ofertę od 192.168.1.1", delay: 100 },
	{ text: "[ OK ] Uzyskano adres IP: 192.168.1.105", type: "success", delay: 100 },
	{ text: "Rozwiązywanie nazw DNS...", delay: 150 },
	{ text: "[ OK ] Połączono z internetem.", type: "success", delay: 100 },

	// --- DESKTOP ENVIRONMENT ---
	{ text: "Przygotowywanie środowiska graficznego...", delay: 300 },
	{ text: "Uruchamianie serwera wyświetlania X.Org...", delay: 200 },
	{ text: "Ładowanie silnika JavaScript...", delay: 200 },
	{ text: "Inicjalizacja React Virtual DOM...", delay: 150 },
	{ text: "Hydracja komponentów...", delay: 300 },
	{ text: "Wczytywanie stylów CSS...", delay: 100 },
	{ text: "Sprawdzanie uprawnień użytkownika 'Admin'...", delay: 400 },
	{ text: "[ OK ] Dostęp przyznany.", type: "success", delay: 200 },
  
	// --- FINISH ---
	{ text: "Wszystkie systemy sprawne.", delay: 500 },
	{ text: "Uruchamianie interfejsu...", delay: 800 },
	{ text: "Witaj w systemie!", type: "highlight", delay: 1000 }    
    ];

    useEffect(() => {
	let currentIndex = 0;

	const showNextLine = () => {
	    if (currentIndex >= bootLogs.length) {// Wszystkie linie zostały wyświetlone
		setTimeout(() => navigate('/login'), 1000);
		return;
	    }
	    const currentLog = bootLogs[currentIndex];
	    setLines((prev) => [...prev, currentLog]);
	    currentIndex++;
	    setTimeout(showNextLine, currentLog.delay);
	};

	const initialTimeout = setTimeout(showNextLine, 500);
	return () => clearTimeout(initialTimeout);
    }, []);

    useEffect(() => {
	//@ts-ignore nie usuwać bo pokazuje błąd w nvim
	bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }, [lines]);

    return(
	<div className={styles.bootContainer}>
	    <div className={styles.terminal}>
		{lines.map((line, index) => (
		    <div key={index} className={`${styles.logLine} ${line.type && (line.type === 'success' ? styles.success : styles.error)}`}>
			{line.type === 'success' && <span className={styles.okStatus}>[ OK ] </span>}
			{line.text}
		    </div>
		))}
		<div ref={bottomRef} />
		<span className={styles.cursor}>_</span>
	    </div>
	</div>
    );
}
export default BootUp;
