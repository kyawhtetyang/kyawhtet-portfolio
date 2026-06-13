import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AskSource, sendAskMessage } from '../services/askClient';
import { ThemeMode } from '../userSettings';

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
  sources?: AskSource[];
};

const getInitialMessages = (): ChatMessage[] => [];

type AskViewProps = {
  theme: ThemeMode;
};

export const AskView: React.FC<AskViewProps> = ({ theme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isDark = theme === 'dark';
  const hasMessages = messages.length > 0;
  const bottomCoverClass = isDark ? 'bg-[#0f1115]' : 'bg-[#f5f5f7]';

  useEffect(() => {
    if (!isSending) {
      inputRef.current?.focus();
    }
  }, [isSending]);

  useEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        block: 'end',
      });
    });
  }, [messages, isSending]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setInput('');
    setIsSending(true);

    try {
      const result = await sendAskMessage(trimmed);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: result.answer,
          sources: result.used_sources,
        },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong while contacting the Ask backend.';
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: `I couldn't reach the Ask backend yet. ${message}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const chatMessages = useMemo(
    () =>
      messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[88%] space-y-3 md:max-w-[78%] ${
              message.role === 'user'
                ? ''
                : 'rounded-2xl'
            }`}
          >
            <div
              className={`rounded-xl text-[15px] whitespace-pre-wrap break-words ${
                message.role === 'user'
                  ? isDark
                    ? 'bg-white/[0.08] px-5 py-3 leading-7 text-white shadow-[0_14px_36px_rgba(0,0,0,0.18)]'
                    : 'bg-[#e5e7eb] px-5 py-3 leading-7 text-[#1d1d1f] shadow-[0_12px_28px_rgba(15,23,42,0.08)]'
                  : isDark
                    ? 'bg-transparent px-0 py-0 leading-8 text-[#f3f4f6]'
                    : 'bg-transparent px-0 py-0 leading-8 text-[#1d1d1f]'
              }`}
            >
              {message.text}
            </div>

            {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
              <div className="space-y-2">
                <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  isDark ? 'text-[#9ca3af]' : 'text-[#6b7280]'
                }`}>
                  Sources
                </div>
                <div className="grid gap-2">
                  {message.sources.map((source, sourceIndex) => (
                    <div
                      key={`${source.path}-${sourceIndex}`}
                      className={`rounded-2xl border px-4 py-3 ${
                        isDark
                          ? 'border-white/10 bg-white/5'
                          : 'border-black/10 bg-black/[0.03]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className={`text-sm font-medium ${
                          isDark ? 'text-white' : 'text-[#1d1d1f]'
                        }`}>
                          {source.title}
                        </div>
                        <div className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          isDark
                            ? 'bg-white/8 text-[#d1d5db]'
                            : 'bg-black/[0.06] text-[#4b5563]'
                        }`}>
                          {source.category}
                        </div>
                      </div>
                      <div className={`mt-2 text-xs leading-6 ${
                        isDark ? 'text-[#cbd5e1]' : 'text-[#4b5563]'
                      }`}>
                        {source.excerpt}
                      </div>
                      <div className={`mt-2 text-[11px] ${
                        isDark ? 'text-[#9ca3af]' : 'text-[#6b7280]'
                      }`}>
                        {source.path}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )),
    [isDark, messages]
  );

  return (
    <div className={`${hasMessages ? 'pb-32 md:pb-28' : 'pb-0'} -mx-4 md:-mx-6 lg:-mx-6`}>
      <section className="flex h-[calc(100vh-9.5rem)] min-h-0 flex-col overflow-hidden">
        <div
          ref={messagesContainerRef}
          className={`ask-scrollbar-hidden min-h-0 flex-1 overflow-y-auto ${hasMessages ? 'pb-28 md:pb-32' : 'pb-0'}`}
        >
          <div className={`mx-auto w-full max-w-4xl px-6 md:px-8 ${hasMessages ? 'pt-16 md:pt-20' : 'pt-0'}`}>
            <div className="space-y-6">
              {chatMessages}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <div
        className={`left-0 right-0 z-20 px-4 md:left-20 md:px-8 lg:left-64 ${
          hasMessages
            ? 'fixed bottom-12 pb-2 md:bottom-0 md:pb-3'
            : 'absolute inset-y-0 flex items-center justify-center'
        }`}
      >
        {hasMessages && (
          <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 ${bottomCoverClass} md:h-28`} />
        )}
        <div className="mx-auto w-full max-w-4xl">
          {!hasMessages && (
            <div className="mb-8 text-center">
              <h2 className={`text-4xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
                What are you working on?
              </h2>
            </div>
          )}

          <div
            className={`rounded-xl px-4 py-2.5 backdrop-blur ${
              isDark
                ? 'border border-white/10 bg-[#1f1f1f]/95 shadow-[0_24px_80px_rgba(0,0,0,0.28)]'
                : 'border border-black/10 bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.10)]'
            }`}
          >
            <div className="flex items-end gap-3">
              <button
                type="button"
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isDark
                    ? 'bg-white/5 text-[#d1d5db] hover:bg-white/10'
                    : 'bg-black/5 text-[#4b5563] hover:bg-black/10'
                }`}
                aria-label="Add attachment"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5V19" strokeLinecap="round" />
                  <path d="M5 12H19" strokeLinecap="round" />
                </svg>
              </button>

              <textarea
                ref={inputRef}
                rows={1}
                placeholder="Ask anything"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                className={`min-h-[40px] max-h-28 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-2 text-[15px] leading-7 outline-none ${
                  isDark
                    ? 'text-white placeholder:text-[#9ca3af]'
                    : 'text-[#1d1d1f] placeholder:text-[#9ca3af]'
                }`}
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors ${
                    isDark
                      ? 'bg-white/5 text-[#d1d5db] hover:bg-white/10'
                      : 'bg-black/5 text-[#4b5563] hover:bg-black/10'
                  }`}
                >
                  Instant
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void handleSend();
                  }}
                  disabled={isSending}
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isDark
                      ? 'bg-white/5 text-[#d1d5db] hover:bg-white/10'
                      : 'bg-black/5 text-[#4b5563] hover:bg-black/10'
                  }`}
                  aria-label="Send message"
                >
                  <svg
                    className="h-5 w-5 translate-x-[1px] -translate-y-[1px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={`mt-3 flex items-center justify-center text-xs ${isDark ? 'text-[#6b7280]' : 'text-gray-500'}`}>
            {isSending ? 'Thinking...' : 'Chat can make mistakes. Check important info.'}
          </div>
        </div>
      </div>
    </div>
  );
};
