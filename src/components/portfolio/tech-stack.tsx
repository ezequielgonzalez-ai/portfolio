"use client";

import { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { techStack } from "@/lib/portfolio-data";

// Use useLayoutEffect for SSR compatibility
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface TechStackItem {
  name: string;
  icon: string;
  category: "ai" | "automation" | "frontend" | "backend" | "tools";
  proficiency?: number;
}

// Category badge colors
const categoryColors: Record<string, string> = {
  ai: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  automation: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  frontend: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  backend: "bg-green-500/20 text-green-400 border-green-500/30",
  tools: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const categoryLabels: Record<string, string> = {
  ai: "AI & LLMs",
  automation: "Automation",
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools",
};

// Tech icons as SVG paths
const techIcons: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      <path d="M12 21.35c-1.5 0-2.75-.25-3.75-.7-.85-.4-1.45-.9-1.8-1.45-.35-.55-.45-1.1-.3-1.65.15-.5.5-1 1-1.45.15-.15.35-.3.55-.45-.45-.3-.85-.6-1.15-.95-.6-.7-.85-1.45-.7-2.2.15-.7.6-1.35 1.35-1.9.25-.2.55-.35.85-.5-.5-.5-.85-1-1-1.55-.2-.7-.05-1.4.4-2.05.45-.6 1.15-1.1 2.05-1.45C10.25 4.35 11.1 4.2 12 4.2s1.75.15 2.5.4c.9.35 1.6.85 2.05 1.45.45.65.6 1.35.4 2.05-.15.55-.5 1.05-1 1.55.3.15.6.3.85.5.75.55 1.2 1.2 1.35 1.9.15.75-.1 1.5-.7 2.2-.3.35-.7.65-1.15.95.2.15.4.3.55.45.5.45.85.95 1 1.45.15.55.05 1.1-.3 1.65-.35.55-.95 1.05-1.8 1.45-1 .45-2.25.7-3.75.7Z" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.5 14.5L9 7.5v9h1.5v-5.836l5.25 7.836 1.75-1Z" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M3 3h18v18H3V3Zm10.5 10.5v-1.5h-6v1.5h2.25v6h1.5v-6h2.25Zm1.5 0v1.5h1.5v4.5h1.5v-4.5h1.5v-1.5h-4.5Z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.48 6 12 6ZM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.85 9.52 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.48 12 7 12Z" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M3 3h18v18H3V3Zm16.5 13.5c-.25-1.5-1.25-2.75-3.75-3.75-1-.5-2-.75-2.25-1.5-.1-.5-.1-.75.1-1 .35-.4.9-.5 1.5-.35.4.1.75.4 1 .85l1.75-1.15c-.25-.5-.5-.75-.9-1.1-.75-.5-1.5-.65-2.5-.5-1.5.25-2.5 1.15-2.75 2.4-.25 1.15.1 2 .75 2.75.5.5 1.15.85 2 1.15.75.25 1.5.6 1.75 1.1.35.65.25 1.5-.35 1.9-.5.35-1.15.4-1.75.25-.75-.15-1.25-.65-1.6-1.25l-1.85 1c.35.75.85 1.35 1.6 1.75 1.25.65 2.75.75 4 .25 1.25-.55 2-1.65 2.15-2.9.05-.5 0-1-.15-1.5l.6.1Z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Zm0 2.5L17.5 7 12 9.5 6.5 7 12 4.5ZM5 8.5l6 3.25V17L5 13.75V8.5Zm13.5 0v5.25L13 17v-5.25l5.5-3.25Z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2c-1.5 0-2.9.15-3.95.55C6.8 3 6 3.85 6 5.5V8h6v1H5.5c-1.85 0-3.25 1.1-3.75 3.25-.55 2.45-.6 3.95 0 6.5.45 1.85 1.5 3.25 3.35 3.25H7v-2.75c0-2.1 1.85-4 4-4h6c1.75 0 3-1.35 3-3V5.5c0-1.6-1.35-2.8-3-3.25C15.35 2.05 13.5 2 12 2Zm-1.5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      <path d="M18.5 9v2.75c0 2.2-1.9 4.25-4 4.25h-6c-1.8 0-3 1.55-3 3.25V20c0 1.6 1.4 2.55 3 3 1.85.55 3.65.55 6 0 1.5-.4 3-1.25 3-3v-2h-6v-1h9c1.85 0 2.55-1.3 3-3.25.5-2 .5-3.95 0-6.5-.35-1.7-1.1-3.25-3-3.25H18Zm-4.5 9.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22Z" />
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2C8.5 2 6 5.5 6 9.5c0 3.5 2 6 4.5 7.5V22l1.5 1 1.5-1v-5c2.5-1.5 4.5-4 4.5-7.5C18 5.5 15.5 2 12 2Zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Z" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.186.186 0 0 0-.185.186v1.887c0 .102.083.185.185.185Zm-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.186.186 0 0 0-.185.185v1.888c0 .102.082.185.185.186Zm0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.186.186 0 0 0-.185.185v1.887c0 .102.082.186.185.186Zm-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186Zm-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.186.186 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186Zm5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.186.186 0 0 0-.185.186v1.887c0 .102.082.185.185.185Zm-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.083.185.185.185Zm-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.119a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185Zm-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.082.185.185.185ZM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12.504 0c-.155 0-.311.001-.465.003-.653.014-1.283.108-1.885.278-.604.17-1.174.415-1.703.73-.53.317-1.012.702-1.44 1.147-.43.445-.804.948-1.112 1.5-.31.552-.548 1.16-.705 1.813-.156.652-.231 1.349-.215 2.082.016.734.122 1.453.317 2.143.197.69.483 1.355.855 1.976.372.621.829 1.197 1.361 1.709.533.512 1.142.96 1.81 1.327.668.367 1.394.653 2.166.844.772.19 1.59.284 2.446.27.855-.014 1.673-.136 2.445-.366.772-.23 1.5-.565 2.168-.998.668-.433 1.275-.962 1.806-1.576.531-.614.987-1.313 1.358-2.08.37-.766.656-1.596.849-2.47.192-.874.29-1.79.286-2.733-.005-.942-.111-1.858-.313-2.732-.2-.873-.5-1.705-.89-2.47-.39-.766-.869-1.465-1.422-2.076-.553-.61-1.181-1.133-1.868-1.555-.687-.42-1.434-.74-2.222-.95-.788-.21-1.617-.313-2.47-.303-.853.01-1.66.129-2.405.353-.744.224-1.426.553-2.028.98-.603.426-1.127.95-1.556 1.555-.43.606-.764 1.291-1 2.039-.234.747-.368 1.557-.392 2.412-.023.855.064 1.753.266 2.668.2.915.514 1.846.94 2.765.425.92.96 1.828 1.6 2.689.638.861 1.38 1.674 2.215 2.404.835.73 1.764 1.378 2.765 1.92 1.001.54 2.074.958 3.19 1.227 1.116.27 2.274.391 3.445.35 1.17-.042 2.352-.241 3.504-.598 1.152-.357 2.274-.873 3.319-1.538 1.045-.665 2.012-1.48 2.855-2.424.843-.943 1.562-2.014 2.123-3.184.56-1.17.964-2.439 1.186-3.767.222-1.329.262-2.716.109-4.115-.153-1.4-.502-2.81-1.05-4.176-.548-1.366-1.294-2.688-2.227-3.908-.932-1.22-2.051-2.337-3.334-3.303-1.283-.965-2.73-1.777-4.307-2.392-1.577-.615-3.284-1.032-5.082-1.22-1.799-.187-3.688-.145-5.625.143" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2zm0 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0zm-7 0A3.5 3.5 0 0 1 8.5 11H12v3.5a3.5 3.5 0 1 1-7 0zM5 12a3.5 3.5 0 1 1 7 0v3.5H8.5A3.5 3.5 0 0 1 5 12zm0-3.5A3.5 3.5 0 0 1 8.5 5H12v7H8.5A3.5 3.5 0 0 1 5 8.5z" />
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.392.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  claude: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  ),
  langchain: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pinecone: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2C8 2 5 5 5 9v6c0 4 3 7 7 7s7-3 7-7V9c0-4-3-7-7-7zm0 2c2.76 0 5 2.24 5 5v5c0 2.76-2.24 5-5 5s-5-2.24-5-5V9c0-2.76 2.24-5 5-5z" />
    </svg>
  ),
  n8n: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.18L18 7.5v9l-6 3-6-3v-9l6-3.32z" />
    </svg>
  ),
  zapier: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.78H9.064l4.504-4.504h4.504l-4.504 4.504zm-8.632-5.56h4.504l-4.504 4.504H4.932l4.004-4.504z" />
    </svg>
  ),
  make: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2L2 12l10 10 10-10L12 2zm0 3l7 7-7 7-7-7 7-7z" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M12 2L2 19h8l2-3.5L14 19h8L12 2zm0 4l5.5 9.5h-11L12 6z" />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  ),
};

/**
 * TechCard - Individual tech item with glow, badge, and proficiency
 */
function TechCard({
  tech,
  index,
}: {
  tech: TechStackItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      key={tech.name + index}
      className={cn(
        "relative flex flex-col items-center gap-3 px-6 py-4 rounded-2xl",
        "bg-card border border-border",
        "hover:border-primary/30",
        "transition-all duration-300",
        "min-w-[140px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent 70%)`,
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative text-foreground/60"
        animate={{
          scale: isHovered ? 1.1 : 1,
          color: isHovered ? "rgb(99, 102, 241)" : undefined,
        }}
        transition={{ duration: 0.2 }}
      >
        {techIcons[tech.icon] || <div className="w-7 h-7 rounded bg-foreground/20" />}
      </motion.div>

      {/* Name */}
      <span className="relative text-foreground/80 font-medium whitespace-nowrap text-sm">
        {tech.name}
      </span>

      {/* Category badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isHovered ? 1 : 0.7, scale: 1 }}
        className={cn(
          "relative px-2 py-0.5 text-xs rounded-full border",
          categoryColors[tech.category]
        )}
      >
        {categoryLabels[tech.category]}
      </motion.span>

      {/* Proficiency bar */}
      {tech.proficiency && (
        <motion.div
          className="relative w-full h-1 bg-foreground/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? `${tech.proficiency}%` : "0%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </motion.div>
      )}
    </motion.li>
  );
}

/**
 * InfiniteMovingCards - Horizontal infinite scroll for tech stack
 */
export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: TechStackItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Set direction
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }

      // Set speed
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }

      setStart(true);
    }
  }, [direction, speed]);

  useEffect(() => {
    // Small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      addAnimation();
    }, 0);
    return () => clearTimeout(timer);
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((tech, idx) => (
          <TechCard key={tech.name + idx} tech={tech} index={idx} />
        ))}
      </ul>
    </div>
  );
}

/**
 * TechStackSection - Full section with title and infinite scroll
 */
export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.08]">
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.8) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Tecnologías y herramientas que utilizo para crear productos digitales excepcionales
          </p>
        </motion.div>

        {/* Infinite Scroll Cards */}
        <InfiniteMovingCards
          items={techStack}
          direction="left"
          speed="slow"
          pauseOnHover={true}
        />
      </div>
    </section>
  );
}
