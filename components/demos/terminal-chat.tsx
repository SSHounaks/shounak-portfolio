'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  user: string;
  text: string;
  delay: number;
}

interface TerminalChatProps {
  messages?: ChatMessage[];
  hostName?: string;
  className?: string;
}

const defaultMessages: ChatMessage[] = [
  { user: 'guest', text: ' Hey there! What tech stack do you use?', delay: 500 },
  { user: 'host', text: ' Mostly TypeScript, React, Node.js. Full-stack JS.', delay: 2500 },
  { user: 'guest', text: ' Cool! Experience with GraphQL?', delay: 4500 },
  { user: 'host', text: ' Yes — built several APIs with Apollo and Prisma.', delay: 6500 },
  { user: 'guest', text: ' What about deployment?', delay: 8500 },
  { user: 'host', text: ' Docker + AWS ECS. CI/CD via GitHub Actions.', delay: 10500 },
  { user: 'guest', text: ' Impressive. Hire-ready indeed.', delay: 12500 },
  { user: 'host', text: ' Thanks! Check my resume above ^_^', delay: 14500 },
];

export function TerminalChat({
  messages = defaultMessages,
  hostName = 'host',
  className,
}: TerminalChatProps) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= messages.length) return;
    const t = setTimeout(() => setVisible((p) => p + 1), messages[visible].delay);
    return () => clearTimeout(t);
  }, [visible, messages]);

  const isHost = (user: string) => user === hostName;

  return (
    <div className={cn('font-mono space-y-1.5 min-h-[180px]', className)}>
      <div className="flex items-center gap-2 text-[9px] text-white/30 border-b border-white/5 pb-2 mb-2">
        <span className="text-emerald-400">●</span> connection_established — tty1
        <span className="text-white/20 ml-auto">session: active</span>
      </div>
      {messages.slice(0, visible).map((msg, i) => (
        <div key={i} className="flex items-start gap-2 animate-in fade-in duration-300">
          <span
            className={cn(
              'text-[10px] font-bold w-10 flex-shrink-0',
              isHost(msg.user) ? 'text-emerald-400' : 'text-cyan-400',
            )}
          >
            {msg.user === hostName ? 'host$' : 'guest$'}
          </span>
          <span className="text-[11px] text-white/70">{msg.text}</span>
        </div>
      ))}
      {visible <= messages.length && (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-emerald-400 text-[10px]">&gt;</span>
          <span className="w-1.5 h-3 bg-emerald-400 animate-pulse" />
        </div>
      )}
      {visible > messages.length && (
        <div className="text-[10px] text-white/30 mt-2 italic">
          // conversation_logged
        </div>
      )}
    </div>
  );
}
