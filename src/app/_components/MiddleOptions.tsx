import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HistoryEntry, useStore } from "@/utils/StateManager";
import { decode } from "he";
import { ArrowRightLeft, Loader, SendHorizonal } from "lucide-react";
import { useState } from "react";

export default function MiddleOptions() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [hasTranslated, setHasTranslated] = useState(false); // Utilisé pour gérer plusieurs swap d'affilés
  const {
    inputText,
    setInputText,
    translatedText,
    setTranslatedText,
    targetLanguage,
    setTargetLanguage,
    languageSelection,
    setLanguageSelection,
    error,
    setError,
    translationHistory,
    setTranslationHistory,
  } = useStore();

  const swapLanguages = (entry: HistoryEntry) => {
    if (entry.input === "" && entry.output === "") {
      console.log("Nothing to swap");
      return;
    }
    console.log(entry);
    if (hasTranslated) {
      setInputText(decode(entry.output));
      setTranslatedText(decode(entry.input));
      setLanguageSelection(entry.target);
      setTargetLanguage(entry.source);
      setHasTranslated(false);
    } else {
      setInputText(translatedText);
      setTranslatedText(inputText);
      setLanguageSelection(targetLanguage);
      setTargetLanguage(languageSelection);
    }
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    let detectedLanguage = null;

    if (languageSelection === "auto") {
      const detectionUrl =
        "https://translation.googleapis.com/language/translate/v2/detect?key=" +
        process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
      const detectionOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: inputText,
        }),
      };

      try {
        const detectionResponse = await fetch(detectionUrl, detectionOptions);
        const detectionResult = await detectionResponse.json();
        detectedLanguage = detectionResult.data.detections[0][0].language;
      } catch (error) {
        console.error(error);
        setError(
          "Une erreur s'est produite lors de la détection de la langue. Vérifiez vos paramètres d'entrées."
        );
        return;
      }
    }

    // Traduction du texte
    const translationUrl =
      "https://translation.googleapis.com/language/translate/v2?key=" +
      process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
    const translationOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: inputText,
        target: targetLanguage, // Utiliser la langue sélectionnée par l'utilisateur
        source: detectedLanguage,
      }),
    };

    try {
      const translationResponse = await fetch(
        translationUrl,
        translationOptions
      );
      const translationResult = await translationResponse.json();

      if (translationResult.data && translationResult.data.translations) {
        // Vérifier que la réponse contient la propriété "translations"
        const translatedText =
          translationResult.data.translations[0].translatedText;

        // Ajouter la traduction à l'historique
        const entryToAdd: HistoryEntry = {
          input: inputText,
          output: translatedText,
          source: detectedLanguage || languageSelection,
          target: targetLanguage,
        };

        console.log("Entrée à ajouter à l'historique:", entryToAdd);
        const prevHistory = translationHistory; // Fetch the current state of translationHistory
        const newHistory = [{ ...entryToAdd }, ...prevHistory.slice(0, 9)];

        setTranslationHistory(newHistory);

        setTranslatedText(translatedText);
        setError(null);
      } else {
        // Gérer le cas où la réponse de l'API n'est pas conforme
        console.error("Réponse API incorrecte :", translationResult);
        setError(
          `Une erreur s'est produite lors de la traduction : la réponse de l'API n'est pas conforme`
        );
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(
          `Une erreur s'est produite lors de la traduction : ${error.message}`
        );
      } else {
        setError(`Une erreur s'est produite lors de la traduction : ${error}`);
      }
    } finally {
      setIsTranslating(false);
      setHasTranslated(true);
    }
  };
  return (
    <div className="flex flex-row gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ArrowRightLeft
              className="hover:cursor-pointer hover:text-green-500"
              size={24}
              onClick={() =>
                swapLanguages(
                  translationHistory[0]
                    ? translationHistory[0]
                    : { input: "", output: "", source: "", target: "" }
                )
              }
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Intervertir les langues</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isTranslating ? (
        <Loader
          className="text-green-500 animate-spin"
          size={24}
          style={{
            animationDuration: "5s",
          }}
        />
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <SendHorizonal
                className="hover:cursor-pointer hover:text-green-500"
                size={24}
                onClick={handleTranslate}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Traduire</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
