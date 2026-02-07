import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
  // const [text, setText] = useState('');

  const LIBRETRANSLATE_LOCALHOST_URL = 'http://localhost:5000'

  // useEffect(() => {
  //   const getAvailableLanguages =  async () => {
  //     try {
  //       const response = await fetch(`${LIBRETRANSLATE_API}/languages`);
  //       const data = await response.json();
  //       console.log(`Available languages: ${data}`);
  //       return data;
  //     } catch (err) {
  //       throw new Error('Error al obtener los idiomas disponibles: ', err);
  //     }
  //   }

  //   getAvailableLanguages();
  // })

  const handleSubmit = async (event, text, originLanguage, targetLanguage) => {
    event.preventDefault();
    if (originLanguage === targetLanguage) {
      console.error('Error: Debes introducir un texto diferente.');
    }

    try {
      const response = await fetch(`${LIBRETRANSLATE_LOCALHOST_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: text,
          source: originLanguage,
          target: targetLanguage,
          format: 'text'
        })
      });

      const data = await response.json();

      return data.translatedText;
    } catch (err) {
      throw new Error('Error al traducir el texto introducido', err);
    }
  }



  return (
    <>
      <h1>Simple translator app</h1>
      <form onSubmit={handleSubmit}>
        <section className='translation_panels__container'>
          <div className="translation_origin__panel">
            <select name="origin_language_selector" id="origin_language_selector">
              <option value="">Español</option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
            <textarea name="to_translate_text" id="to_translate_text" placeholder='Escribe tu texto...' cols="30" rows="10"></textarea>
          </div>
          <div className="translation_destination__panel">
            <select name="destination_language_selector" id="destination_language_selector">
              <option value="">Inglés</option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
            <textarea name="translated_text" id="translated_text" placeholder='Escribe tu texto...' cols="30" rows="10"></textarea>
          </div>
        </section>
        <button className='translate_button'>Traducir</button>
      </form>
    </>
  );
};

export default App;
