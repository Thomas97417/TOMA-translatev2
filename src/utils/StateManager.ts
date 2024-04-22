"use client";
import { create } from "zustand";

export const languageOptions = [
  { value: "fr", label: "Français" },
  { value: "es", label: "Espagnol" },
  { value: "en", label: "Anglais" },
  { value: "de", label: "Allemand" },
  { value: "it", label: "Italien" },
  { value: "pt", label: "Portugais" },
  { value: "zh-CN", label: "Chinois (simplifié)" },
  { value: "ja", label: "Japonais" },
  { value: "ko", label: "Coréen" },
  { value: "ru", label: "Russe" },
  { value: "ar", label: "Arabe" },
  // Ajoutez d'autres langues selon vos besoins
];

export type HistoryEntry = {
  input: string;
  output: string;
  source: string;
  target: string;
};

export type TranslationHistory = HistoryEntry[];

export type State = {
  inputText: string;
  setInputText: (input: string) => void;
  translatedText: string;
  setTranslatedText: (text: string) => void;
  targetLanguage: string;
  setTargetLanguage: (language: string) => void;
  languageSelection: string;
  setLanguageSelection: (selection: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  translationHistory: TranslationHistory;
  setTranslationHistory: (history: TranslationHistory) => void;
};

export const useStore = create<State>((set) => ({
  inputText: "",
  setInputText: (input) => set({ inputText: input }),
  translatedText: "",
  setTranslatedText: (text) => set({ translatedText: text }),
  targetLanguage: "en",
  setTargetLanguage: (language) => set({ targetLanguage: language }),
  languageSelection: "auto",
  setLanguageSelection: (selection) => set({ languageSelection: selection }),
  error: null,
  setError: (error) => set({ error }),
  translationHistory:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("translationHistory") || "[]")
      : [],
  setTranslationHistory: (history) => set({ translationHistory: history }),
}));
