import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "B.Tech CSE, 3rd Year",
    college: "IIT Delhi",
    text: "CareerAI showed me I was spending too much time on PHP when the market is moving to cloud-native. Changed my entire semester plan.",
    score: "Risk Score: 28 → 12",
  },
  {
    name: "Arjun Mehta",
    role: "B.Tech IT, 4th Year",
    college: "NIT Trichy",
    text: "Got placed at a top product company. The skill roadmap was spot-on — I followed it for 3 months and cracked the interview.",
    score: "Placed at ₹18 LPA",
  },
  {
    name: "Sneha Patel",
    role: "B.Tech AI/ML, 2nd Year",
    college: "BITS Pilani",
    text: "The Career Risk Score gave me a reality check. I thought I was doing great, but I was missing key system design skills.",
    score: "Probability: 45% → 82%",
  },
];

const TestimonialSection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
          <span className="w-8 h-px bg-secondary" />
          Social Proof
          <span className="w-8 h-px bg-secondary" />
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
          Students are already <span className="gradient-text">winning</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl p-6 flex flex-col"
          >
            <Quote className="h-5 w-5 text-primary/40 mb-4" />
            <p className="text-sm text-foreground/90 leading-relaxed flex-1 mb-5">"{t.text}"</p>
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-muted-foreground">{t.college}</p>
                </div>
                <span className="text-[10px] font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">
                  {t.score}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
