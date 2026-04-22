import { motion } from "framer-motion";
import { TrendingUp, User, BarChart3, Map, Shield, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  { icon: TrendingUp, title: "Industry Trend Tracking", desc: "Real-time analysis of hiring patterns, salary movements, and demand shifts across 50+ industries.", tag: "Live Data" },
  { icon: User, title: "Student Profile Analysis", desc: "Deep-dive into your skills, projects, certifications, and experience against industry benchmarks.", tag: "Personalized" },
  { icon: BarChart3, title: "Placement Prediction", desc: "ML-powered probability engine trained on 100K+ placement records from top universities.", tag: "94% Accurate" },
  { icon: Map, title: "Skill Roadmap Builder", desc: "Custom learning paths with timelines, resources, and milestone tracking for your target role.", tag: "AI-Generated" },
  { icon: Shield, title: "Career Risk Score™", desc: "A proprietary 0-100 score measuring your career resilience against market volatility.", tag: "Proprietary" },
];

const SolutionSection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute left-0 top-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest mb-4">
          <span className="w-8 h-px bg-primary" />
          How It Works
          <span className="w-8 h-px bg-primary" />
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
          Five layers of <span className="gradient-text">career intelligence</span>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
          Our AI engine processes millions of data points to give you an unfair advantage.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {solutions.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`glass-card rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {s.tag}
              </span>
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2 text-lg">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-14"
      >
        <Link to="/dashboard">
          <button className="gradient-btn px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 group text-base">
            Try It Now — It's Free
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default SolutionSection;
