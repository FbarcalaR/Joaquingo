'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/button/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1 className={styles.title}>JOAQUINGO</h1>
      <span className={styles.subtitle}>
        El bingo de Joaquin!
      </span>
      <Button variant="primary" onClick={() => router.push(`/select-sentences`)}>Jugar</Button>
    </>
  );
}
