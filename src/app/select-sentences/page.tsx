"use client";
import Button from "@/components/button/button";
import JoaquinsSentence from "@/components/joaquins-sentence/JoaquinsSentence";
import styles from "./select-sentences.module.css";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { allJoaquinSentences } from "../constants/all-joaquins-sentences";

const SelectSentences = () => {
  const router = useRouter();
  const [selectedSentenceIds, setSelectedSentenceIds] = useState<number[]>([]);

  const allSentences = useMemo(() => {
    return allJoaquinSentences;
  }, []);

  const toggleSentenceSelection = useCallback((id: number) => {
    setSelectedSentenceIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((sentenceId) => sentenceId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  }, []);

  const startGame = useCallback(() => {
    router.push(`/game?selectedIds=${selectedSentenceIds.join(",")}`);
  }, [router, selectedSentenceIds]);

  const setRandomSentencesAndStartGame = useCallback(() => {
    const shuffled = allSentences
      .map((sentence) => ({ sentence, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sentence }) => sentence);
    const randomSentences = shuffled.slice(0, 7).map((sentence) => sentence.id);

    router.push(`/game?selectedIds=${randomSentences.join(",")}`);
  }, [allSentences, router]);

  return (
    <>
      <h1>Que va a decir Joaquin hoy?</h1>
      <span>Selecciona tus frases para crear tu carton de bingo</span>
      <span>Selecciona 7 frases</span>
      <div className={styles.listContainer}>
        {allSentences.map((sentence) => (
          <Button
            key={sentence.id}
            className={`${styles.sentenceButton} ${
              selectedSentenceIds.includes(sentence.id)
                ? styles.sentenceSelected
                : ""
            }`}
            onClick={() => toggleSentenceSelection(sentence.id)}
          >
            <JoaquinsSentence text={sentence.label} />
          </Button>
        ))}
      </div>
      {selectedSentenceIds.length !== 7 && (
        <span>
          Aprende a contar. {selectedSentenceIds.length} de 7 frases
          seleccionadas
        </span>
      )}
      <div className={styles.actionsContainer}>
        <Button variant="primary" onClick={setRandomSentencesAndStartGame}>
          Voy a tener suerte
        </Button>
        <Button
          variant="primary"
          onClick={startGame}
          disabled={selectedSentenceIds.length !== 7}
        >
          Jugar con las frases seleccionadas
        </Button>
      </div>
    </>
  );
};

export default SelectSentences;
