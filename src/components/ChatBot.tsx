import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "bot";
  text: string;
}

const mockResponses: Record<string, string> = {
  default: "I can help you with career advice! Ask me about skills, job trends, or career paths.",
  skill: "Top in-demand skills for 2026: AI/ML, Cloud Computing, Cybersecurity, Full-Stack Development, and Data Engineering. Focus on building projects!",
  job: "AI/ML Engineer, Cloud Architect, and Data Scientist are among the fastest-growing roles. The tech job market favors specialists with strong fundamentals.",
  career: "Build a T-shaped skill set — go deep in one area (like backend dev) and broad in others (basic ML, cloud). Contribute to open-source and build a portfolio.",
  placement: "To improve placement chances: 1) Build 3-5 solid projects, 2) Practice DSA daily, 3) Get internship experience, 4) Network on LinkedIn.",
  salary: "Entry-level tech salaries in India range from ₹4-12 LPA depending on skills and company. FAANG/startups pay higher for specialized roles.",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("skill")) return mockResponses.skill;
  if (lower.includes("job") || lower.includes("trend")) return mockResponses.job;
  if (lower.includes("career") || lower.includes("path")) return mockResponses.career;
  if (lower.includes("placement") || lower.includes("interview")) return mockResponses.placement;
  if (lower.includes("salary") || lower.includes("pay")) return mockResponses.salary;
  return mockResponses.default;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm your AI Career Advisor. Ask me anything about skills, jobs, or career paths!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getResponse(userMsg) }]);
      setTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg glow-effect"
      >
        {open ? <X className="h-6 w-6 text-primary-foreground" /> : <MessageCircle className="h-6 w-6 text-primary-foreground" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-card rounded-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "500px" }}
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">AI Career Advisor</h3>
              <p className="text-xs text-muted-foreground">Ask about skills, jobs, or career paths</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "350px" }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2 text-sm text-muted-foreground">
                    <span className="animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="p-3 border-t border-border flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about careers..."
                className="bg-muted border-border text-sm"
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
