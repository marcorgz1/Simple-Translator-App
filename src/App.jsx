import { useState, useEffect } from 'react';
import translationApi from './services/api.js';
import './App.css';
import Header from './components/Header.jsx';
import Translator from './components/Translator.jsx';

function App() {
  // Estado para manejar el texto introducido por el usuario
  const [text, setText] = useState('');
  // Estado para manejar el texto traducido escrito por el usuario
  const [translatedText, setTranslatedText] = useState('');

  // Estado para manejar el idioma de origen
  const [sourceLanguage, setSourceLanguage] = useState('es');
  // Estado para manejar el idioma de destino
  const [targetLanguage, setTargetLanguage] = useState('en');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const availableLanguages = [
    { code: 'en', name: 'Inglés' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Francés' },
    { code: 'de', name: 'Alemán' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Portugués' },
    { code: 'ru', name: 'Ruso' },
    { code: 'ja', name: 'Japonés' },
    { code: 'ko', name: 'Koreano' },
    { code: 'zh', name: 'Chino' },
    { code: 'ar', name: 'Árabe' },
    { code: 'nl', name: 'Holandés' },
    { code: 'pl', name: 'Polaco' },
    { code: 'tr', name: 'Turco' }
  ]

  useEffect(() => {
    // Comprobar que existe texto para traducir evitando hacer llamadas innecesarias a la API
    // Si no existe texto, no hacer nada
    if (!text.trim('')) {
      setTranslatedText('');
      return;
    };

    // Agregar un temporizador a la función encargada de traducir el texto para evitar que se traduzca instantáneamente cada letra que se traduce
    /*
    Ejemplo:
    El usuario escribe el texto "hola"
    Si no se crea un temporizador la app llamará a la API cada vez que el usuario escriba una letra en el input
    En cambio, utilizando el temporizador sólo se hará una llamada a la API con el texto completo que ha escrito el usuario evitando hacer 
    llamadas innecesarias a la API que puede generar gastos innecesarios
    */
    const timeoutId = setTimeout(() => {
      handleSubmit();
    }, 1000);

    // Función para limpiar el temporizador una vez el texto ya ha sido traducido
    return () => clearTimeout(timeoutId);
    // Ejecutar el useEffect cada vez que cambie el valor de alguno de los tres estados
  }, [text, sourceLanguage, targetLanguage])

  const handleSubmit = async () => {
    // Comprobar que existe texto para traducir evitando hacer llamadas innecesarias a la API
    // Si no existe texto, no hacer nada
    if (!text.trim()) return;
    
    // Agregar momento de carga mientras se realiza la llamada correspondiente a la API
    setIsLoading(true);

    try {
      const translatedText = await translationApi(text, sourceLanguage, targetLanguage);

      console.log('Texto traducido: ', translatedText);
      setTranslatedText(translatedText);
    } catch (err) {
      setError('Error al conectar con el servidor.', err);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <main className="flex flex-col justify-center items-center bg-[#ddd] font-['Onest'] min-h-screen">
      <Header />
      <Translator
        handleSubmit={handleSubmit} 
        sourceLanguage={sourceLanguage} 
        setSourceLanguage={setSourceLanguage} 
        availableLanguages={availableLanguages} 
        text={text} 
        setText={setText} 
        targetLanguage={targetLanguage} 
        setTargetLanguage={setTargetLanguage} 
        isLoading={isLoading} 
        translatedText={translatedText} 
        error={error}
      />
    </main>
  );
};

export default App;
