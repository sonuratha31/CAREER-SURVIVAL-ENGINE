import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[200px]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="gradient-border glass-card-strong rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Ready to future-proof
          <br />
          <span className="gradient-text">your career?</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
          Join 12,400+ students already using AI to make smarter career decisions. It takes less than 30 seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <button className="gradient-btn px-10 py-4 rounded-xl font-semibold inline-flex items-center gap-2 group text-base">
              Get Your Career Score
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-5">Free · No credit card · Instant results</p>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
