import { useEffect } from "react";
import { useIncidentSocketStore } from "@/stores/useNotificationStore";

export const useIncidentSpeech = () => {
  const { incidents } = useIncidentSocketStore();

  useEffect(() => {
    if (incidents && incidents.length > 0) {
      const utterance = new SpeechSynthesisUtterance("New incident");
      utterance.lang = "en-US";
      utterance.pitch = 1.2;
      utterance.rate = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const indonesianVoice = voices.find(
        (voice) => voice.lang === "en-US" || voice.name.includes("Google")
      );
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [incidents]);
};
