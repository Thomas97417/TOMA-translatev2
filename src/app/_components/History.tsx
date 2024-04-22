import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HistoryEntry, languageOptions, useStore } from "@/utils/StateManager";
import { Trash2 } from "lucide-react";

export default function History() {
  const {
    setInputText,
    setTranslatedText,
    targetLanguage,
    setTargetLanguage,
    languageSelection,
    setLanguageSelection,
    translationHistory,
    setTranslationHistory,
  } = useStore();

  const restoreTranslation = (entry: HistoryEntry) => {
    setInputText(entry.input);
    setTranslatedText(entry.output);

    // Vérifier si la détection automatique est présente dans la liste des langues
    const isAutoIncluded = languageOptions.some(
      (option) => option.value === "auto"
    );

    // Définir les langues dans les sélecteurs en fonction de l'entrée
    if (isAutoIncluded && entry.source === "auto") {
      console.log("Restauration de la détection automatique.");
      setLanguageSelection("auto");
      setTargetLanguage(entry.target || ""); // Assurez-vous que entry.target est défini
    } else {
      console.log(`Restauration de ${entry.source} vers ${entry.target}`);
      setLanguageSelection(entry.source || ""); // Assurez-vous que entry.source est défini
      setTargetLanguage(entry.target || ""); // Assurez-vous que entry.target est défini
    }

    console.log(
      "Langues après restauration:",
      languageSelection,
      targetLanguage
    );
  };

  const clearTranslationHistory = () => {
    setTranslationHistory([]);
  };
  return (
    <div>
      <p className="text-2xl font-semibold mb-6">Historique des traductions</p>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mb-12 w-full">
        {translationHistory.length > 0 ? (
          translationHistory.map((entry, index) => {
            return (
              <Card
                className="py-2 shadow-md relative h-auto"
                // key={`${entry.input}` + `${Date.now()}`}
                key={`${entry.input}-${entry.source}-${entry.target}-${index}`}
              >
                <CardContent className="mb-8">
                  <span className="text-base font-semibold">
                    Entrée <span className="text-sm">({entry.source}) </span>:
                  </span>
                  <span className="line-clamp-2 text-base">{entry.input}</span>
                  <span className="text-base font-semibold">
                    Traduction{" "}
                    <span className="text-sm">({entry.target}) : </span>
                  </span>
                  <span
                    className="line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: entry.output }}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    className="absolute bottom-2 right-2"
                    onClick={() => restoreTranslation(entry)}
                  >
                    Restaurer
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p className="font-light text-sm">
            Vous n&apos;avez rien traduit pour le moment.
          </p>
        )}
      </div>
      {translationHistory.length > 0 && (
        <div className="flex flex-row gap-2 justify-center items-center mb-6">
          <Button className="px-4 py-6" onClick={clearTranslationHistory}>
            <div className="flex flex-row gap-2">
              <Trash2 size={18} />

              <p> Vider l&apos;historique</p>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}