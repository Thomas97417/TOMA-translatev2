import { useStore } from "@/utils/StateManager";
import { X } from "lucide-react";

export default function InputTranslate() {
  const { inputText, setInputText, languageSelection, setLanguageSelection } =
    useStore();
  const handleInputChange = (newValue: string) => {
    setInputText(newValue);
  };
  const removeInputText = () => {
    setInputText("");
  };

  return (
    <div className="relative w-full">
      <textarea
        className="h-[300px] md:h-[400px] text-lg w-full py-4 pl-4 pr-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ resize: "none" }}
        placeholder="Ecrivez ou collez votre texte ici"
        value={inputText}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {inputText.length > 0 && (
        <X
          size={24}
          onClick={removeInputText}
          className="absolute top-[18px] right-2 z-100 hover:cursor-pointer hover:text-pink-500"
        />
      )}
    </div>
  );
}
