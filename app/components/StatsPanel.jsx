"use client";

import { useState } from "react";

export default function Statspanel() {
  const [correctText, setCorrectText] = useState(0);
  const [error, setError] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeElapsed,setTimeElapsed] = useState(0)

  return <div></div>;
}
