"use client";

import { useState, useEffect } from "react";

const FREE_LIMIT = 3; // 免费用户可生成次数

export function useAiUsage() {
  const [count, setCount] = useState(0);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    const c = localStorage.getItem("ai_generate_count");
    setCount(c ? parseInt(c) : 0);
  }, []);

  function increment() {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("ai_generate_count", String(newCount));
  }

  function canGenerate() {
    if (plan !== "free") return true;
    return count < FREE_LIMIT;
  }

  function remaining() {
    if (plan !== "free") return Infinity;
    return Math.max(0, FREE_LIMIT - count);
  }

  return { count, increment, canGenerate, remaining, plan, setPlan };
}
