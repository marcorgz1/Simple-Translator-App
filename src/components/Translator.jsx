const Translator = ({ handleSubmit, sourceLanguage, setSourceLanguage, availableLanguages, text, setText, targetLanguage, setTargetLanguage, isLoading, translatedText, error }) => {
    return (
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

                    <div className="w-full h-64 p-4 text-gray-600 bg-white border border-gray-200 rounded-xl">
                        {
                            isLoading ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                                    <span className="text-gray-500 text-sm">Traduciendo...</span>
                                </div>
                            ) : translatedText ? (
                                translatedText
                            ) : (
                                <span className="text-gray-400 font-light italic">
                                    La traducción aparecerá aquí...
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
            <p className='text-sm font-semibold text-red-500'>{error}</p>
        </form>
    )
};

export default Translator;
