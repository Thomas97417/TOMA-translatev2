import { languageOptions, useStore } from "@/utils/StateManager";
import MiddleOptions from "./MiddleOptions";
export default function TranslateBar() {
  const {
    languageSelection,
    setLanguageSelection,
    setTargetLanguage,
    targetLanguage,
  } = useStore();

  const decodeEntities = (encodedString: string) => {
    let textarea;
    if (typeof document !== "undefined") {
      textarea = document.createElement("textarea");
      textarea.innerHTML = encodedString;
      return textarea.value;
    }
  };

  return (
    <div className="w-full flex flex-row gap-4 my-4">
      <select
        className="focus:outline-none w-full hover:cursor-pointer font-medium text-base sm:text-lg"
        value={languageSelection}
        onChange={(e) => setLanguageSelection(e.target.value)}
      >
        <option value="auto">Détection automatique</option>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <MiddleOptions />
      <select
        className="focus:outline-none w-full hover:cursor-pointer font-medium text-base sm:text-lg"
        value={decodeEntities(targetLanguage)}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
