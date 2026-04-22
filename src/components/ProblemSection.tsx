import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, HelpCircle, ShieldAlert, ArrowRight } from "lucide-react";

const problems = [
  { icon: TrendingDown, title: "Market Demand", desc: "82% of students graduate without understanding current hiring trends in their field.", stat: "82%" },
  { icon: HelpCircle, title: "Skill Gaps", desc: "Students spend years learning skills that employers no longer prioritize.", stat: "3.2yr" },
  { icon: ShieldAlert, title: "Layoff-Risk Industries", desc: "40% of traditional IT roles face automation risk in the next 5 years.", stat: "40%" },
  { icon: AlertTriangle, title: "Future-Proof Paths", desc: "Only 1 in 5 students have a strategic career plan beyond their first job.", stat: "1 in 5" },
];

const ProblemSection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-destructive/5 rounded-full blur-[200px]" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-3xl mb-16"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-destructive uppercase tracking-widest mb-4">
          <span className="w-8 h-px bg-destructive" />
          The Problem
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
          Students graduate into a market they <span className="text-destructive">don't understand</span>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-2xl">
          The gap between academic preparation and industry reality is widening. Most students discover this too late.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl p-6 group hover:border-destructive/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 font-display text-3xl font-bold text-destructive/10 group-hover:text-destructive/20 transition-colors">
              {p.stat}
            </div>
            <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/15 transition-colors">
              <p.icon className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground text-sm inline-flex items-center gap-2">
          Inspired by LinkedIn insights — but much deeper
          <ArrowRight className="h-3 w-3" />
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
