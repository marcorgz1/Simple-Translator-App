import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

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
    setError('');

    try {
      // Hacer llamada a la API de MyMemory Translation para traducir el texto correspondiente
      // Se pasan como parámetros los idiomas de origen y destino
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLanguage}|${targetLanguage}`
      );

      const data = await response.json();
      console.log('Datos obtenidos: ', data);

      // Si la llamada a la API se realiza correctamente, almacenar el valor 
      // de la propiedad "translatedText" del objeto de la respuesta de la API
      // en el estado "translatedText"

      // Por otro lado, si la llamada NO se realiza correctamente mostrar mensaje de error
      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setError('La traducción del texto ha fallado. Por favor, inténtelo de nuevo.');
      }

      console.log('Texto sin traducir: ', text);
      console.log('Texto traducido: ', translatedText);
    } catch (err) {
      setError('Error al conectar con el servidor.', err);      
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <main className="flex flex-col justify-center items-center bg-[#ddd] font-['Onest'] min-h-screen">
      <h1 className='text-4xl text-center mt-8 mb-4'>Simple translator app</h1>
      <p className='text-sm text-center font-extralight text-gray-400 mb-16'>Translate text fast between different languages</p>
      <form onSubmit={handleSubmit}>
        <div className="flex bg-white max-w-6xl rounded-4xl shadow-xl">
            <div className="p-8">
              <div className="flex items-center justify-center gap-6 mb-6">
                <label className="text-sm font-semibold text-gray-700">
                  De
                </label>
                <select
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  name="origin_language_selector"
                  id="origin_language_selector"
                  value={sourceLanguage}
                  onChange={(ev) => setSourceLanguage(ev.target.value)}
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                className="w-full h-64 p-4 text-gray-500 text-light leading-relaxed bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 focus:bg-white transition-all"
                name="to_translate_text"
                id="to_translate_text"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                placeholder="Escribe o pega tu texto aquí..."
              />
            </div>

            <div className="rounded-r-2xl p-8 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex items-center justify-center gap-6 mb-6">
                <label className="text-sm font-semibold text-gray-700">
                  A
                </label>
                <select
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  name="destination_language_selector"
                  id="destination_language_selector"
                  value={targetLanguage}
                  onChange={(ev) => setTargetLanguage(ev.target.value)}
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full h-64 p-4 text-gray-600 text-base leading-relaxed bg-white border border-gray-200 rounded-xl">
                {translatedText || (
                  <span className="text-gray-400 font-light italic">
                    La traducción aparecerá aquí...
                  </span>
                )}
              </div>
            </div>
        </div>
      </form>
    </main>
  );
};

export default App;
