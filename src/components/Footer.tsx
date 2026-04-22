import { Rocket, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-lg text-foreground">CareerAI</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            AI-powered career intelligence for the next generation of professionals. Built by students, for students.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <Twitter className="h-4 w-4 text-muted-foreground" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <Github className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Product</h4>
          <ul className="space-y-2.5">
            {["Dashboard", "Career Score", "Skill Roadmap", "Trend Analysis"].map((l) => (
              <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Company</h4>
          <ul className="space-y-2.5">
            {["About", "Blog", "Careers", "Contact"].map((l) => (
              <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 CareerAI. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
