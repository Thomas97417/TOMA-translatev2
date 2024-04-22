"use client";

import { useStore } from "@/utils/StateManager";
import { Moon } from "lucide-react";
import { useEffect } from "react";
import History from "./_components/History";
import InputTranslate from "./_components/InputTranslate";
import OutputTranslate from "./_components/OutputTranslate";
import { Section } from "./_components/Section";
import { Spacing } from "./_components/Spacing";
import TranslateBar from "./_components/TranslateBar";

const TranslatePage = () => {
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

  useEffect(() => {
    // Mettre à jour le stockage local chaque fois que translationHistory change
    localStorage.setItem(
      "translationHistory",
      JSON.stringify(translationHistory)
    );
  }, [translationHistory]);

  return (
    <>
      <main>
        <div className="flex w-full justify-between items-center">
          <p className="font-bold text-2xl my-8 ml-6">TOMA Translate</p>
          <div className="mr-6 hover:cursor-pointer">
            <Moon size={24} />
          </div>
        </div>
        <Section>
          <div className="w-full flex flex-row">
            <TranslateBar />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-2">
            <InputTranslate />
            <OutputTranslate />
          </div>
          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <Spacing size="md" />
          <History />
        </Section>
      </main>
    </>
  );
};

export default TranslatePage;
