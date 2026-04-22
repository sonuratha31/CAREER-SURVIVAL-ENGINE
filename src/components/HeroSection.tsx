import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play, Users, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    {/* Hero bg image */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
    </div>

    {/* Grid overlay */}
    <div className="absolute inset-0 grid-pattern opacity-30" />

    {/* Glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] animate-pulse-glow" />
    <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div variants={container} initial="hidden" animate="show" className="text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-muted-foreground font-medium">Live Beta — 2,847 students analyzed this week</span>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={item} className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          Survive the Future
          <br />
          <span className="gradient-text">of Jobs with AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          The AI engine that tracks industry trends, maps your skill gaps, and predicts your placement probability — so you never graduate unprepared.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link to="/dashboard">
            <button className="gradient-btn px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group">
              Start Free Analysis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
          <Button variant="outline" size="lg" className="border-border/60 text-foreground hover:bg-muted/50 px-8 py-6 text-base gap-2">
            <Play className="h-4 w-4" />
            Watch Demo
          </Button>
        </motion.div>

        <motion.p variants={item} className="text-xs text-muted-foreground mb-16">
          No sign-up required · Free forever for students · 30-second analysis
        </motion.p>

        {/* Live metrics strip */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {[
            { icon: Users, value: "12,400+", label: "Students Analyzed", color: "text-primary" },
            { icon: BarChart3, value: "94.2%", label: "Prediction Accuracy", color: "text-success" },
            { icon: Sparkles, value: "847", label: "Skills Tracked", color: "text-secondary" },
            { icon: Zap, value: "< 30s", label: "Analysis Time", color: "text-warning" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card-strong rounded-2xl p-5 text-center group hover:border-primary/20 transition-all duration-300">
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2 opacity-70`} />
              <div className={`font-display text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
