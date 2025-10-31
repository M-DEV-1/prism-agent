import { create } from 'zustand';

export type ChatRole = 'user' | 'bot' | 'system';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
};

export type Emotion = 'happy' | 'neutral' | 'urgent';

type LoanStage = 'idle' | 'kyc' | 'credit' | 'sanction' | 'approved' | 'rejected' | 'verifying';

type VoiceSettings = {
  enabled: boolean;
  tts: boolean; // text to speech
  stt: boolean; // speech to text
  rate: number;
  pitch: number;
  voiceName?: string;
};

type ChatState = {
  sessionId: string;
  messages: ChatMessage[];
  isTyping: boolean;
  emotion: Emotion;
  loanStage: LoanStage;
  creditScore?: number;
  eligible?: boolean;
  voice: VoiceSettings;
  // actions
  reset: () => void;
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'> & { id?: string; timestamp?: number }) => void;
  setTyping: (v: boolean) => void;
  setEmotion: (e: Emotion) => void;
  setLoanStage: (s: LoanStage) => void;
  setCreditResult: (score: number, eligible: boolean) => void;
  setVoice: (v: Partial<VoiceSettings>) => void;
};

function generateId(prefix: string = 'msg') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessionId: generateId('sess'),
  messages: [
    {
      id: generateId(),
      role: 'bot',
      content: 'Hi! Ready to explore personal loans? Tell me about your needs! ✨',
      timestamp: Date.now(),
    },
  ],
  isTyping: false,
  emotion: 'happy',
  loanStage: 'idle',
  voice: {
    enabled: false,
    tts: true,
    stt: false,
    rate: 0.9,
    pitch: 1,
  },
  reset: () =>
    set({
      sessionId: generateId('sess'),
      messages: [
        {
          id: generateId(),
          role: 'bot',
          content: 'New chat started. How can I help with your loan today? 💬',
          timestamp: Date.now(),
        },
      ],
      isTyping: false,
      emotion: 'happy',
      loanStage: 'idle',
      creditScore: undefined,
      eligible: undefined,
    }),
  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: msg.id ?? generateId(),
          timestamp: msg.timestamp ?? Date.now(),
          ...msg,
        },
      ],
    })),
  setTyping: (v) => set({ isTyping: v }),
  setEmotion: (e) => set({ emotion: e }),
  setLoanStage: (s) => set({ loanStage: s }),
  setCreditResult: (score, eligible) => set({ creditScore: score, eligible }),
  setVoice: (v) => set({ voice: { ...get().voice, ...v } }),
}));


