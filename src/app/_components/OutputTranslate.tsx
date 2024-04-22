import { useStore } from "@/utils/StateManager";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";

export default function OutputTranslate() {
  const [copied, setCopied] = useState(false);
  const {
    inputText,
    translatedText,
    setTranslatedText,
    targetLanguage,
    setTargetLanguage,
  } = useStore();

  const copyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard
        .writeText(translatedText)
        .then(() => {
          console.log("Texte copié dans le presse-papiers");
        })
        .catch((err) => {
          console.error("Erreur lors de la copie dans le presse-papiers", err);
        });

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const decodeEntities = (encodedString: string) => {
    let textarea;
    if (typeof document !== "undefined") {
      textarea = document.createElement("textarea");
      textarea.innerHTML = encodedString;
      return textarea.value;
    }
  };

  return (
    <div className="w-full relative">
      <textarea
        style={{ resize: "none" }}
        className="h-[300px] md:h-[400px] py-4 pl-4 pr-10 text-lg w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={decodeEntities(translatedText)}
        onChange={(e) => setTranslatedText(e.target.value)}
        readOnly={inputText.length === 0 && translatedText.length === 0}
      />
      {translatedText &&
        (copied ? (
          <ClipboardCheck
            size={22}
            className="absolute bottom-4 right-2 z-100 text-green-500"
          />
        ) : (
          <Clipboard
            size={22}
            onClick={copyToClipboard}
            className="absolute bottom-4 right-2 z-100 hover:cursor-pointer hover:text-pink-500"
          />
        ))}
    </div>
  );
}
