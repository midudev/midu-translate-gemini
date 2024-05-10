export const SelectLanguage: React.FC<{ languages: string[], selected: string, setSelected: (language: string) => void }> = ({ languages, selected, setSelected }) => {
  return (
    <nav className='flex flex-row rounded-tl-lg'>
      {languages.map((language, index) => (
        <button
          key={index}
          className={`uppercase py-3.5 border-b-2 px-3 text-gray-600 font-semibold text-xs lg:text-sm
            ${selected === language ? 'border-blue-500' : 'border-transparent'}
            hover:bg-gray-50 hover:text-gray-700 transition-colors duration-100`}
          onClick={() => setSelected(language)}
        >
          {language}
        </button>
      ))}
    </nav>
  )
}
