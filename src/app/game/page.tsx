'use client';

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useState } from "react";
import {
  allJoaquinSentences,
  JoaquinSentence,
} from "../constants/all-joaquins-sentences";

import styles from "./game.module.css";
import BingoCell from "@/components/bingo-cell/bingo-cell";

const getBingoGrid = (selectedSentences: (JoaquinSentence | undefined)[]) => {
  const matrix: (JoaquinSentence | undefined)[] = Array.from(
    { length: 12 },
    () => undefined
  );
  const availablePositions = Array.from({ length: 12 }, (_, i) => i);

  selectedSentences.forEach((sentence) => {
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const randomPosition = availablePositions[randomIndex];
    matrix[randomPosition] = sentence;
    availablePositions.splice(randomIndex, 1);
  });

  return matrix;
};

const Game = () => {
  const searchParams = useSearchParams();
  const [announcedSentencesIds, setAnnouncedSentencesIds] = useState<number[]>(
    []
  );

  const selectedSentences = useMemo(() => {
    const selectedIds = searchParams.get("selectedIds");
    const idList = selectedIds ? selectedIds.split(",").map(Number) : [];
    return idList.map((id) =>
      allJoaquinSentences.find((sentence) => sentence.id === id)
    );
  }, [searchParams]);

  const bingoGrid = useMemo(
    () => getBingoGrid(selectedSentences),
    [selectedSentences]
  );

  const toggleSentenceSelection = useCallback((id: number) => {
    setAnnouncedSentencesIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((sentenceId) => sentenceId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  }, []);

  return (
    <div className={styles.bingoGrid}>
      {bingoGrid.map((sentence, index) => (
        <BingoCell
          key={index}
          label={sentence?.label}
          isFiller={!sentence}
          isSelected={announcedSentencesIds.some(
            (sentenceId) => sentenceId === sentence?.id
          )}
          onClick={() => sentence && toggleSentenceSelection(sentence.id)}
        />
      ))}
    </div>
  );
};

const GamePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Game />
    </Suspense>
  );
};

export default GamePage;
