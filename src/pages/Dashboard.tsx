import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, TrendingUp, TrendingDown, AlertTriangle, BookOpen, Zap, ArrowRight,
  X, Plus, Minus, Target, Award, BarChart3, Users, ChevronRight, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area,
} from "recharts";
import { generateAnalysis, type AnalysisResult } from "@/lib/mockData";

const suggestedSkills = ["Python", "JavaScript", "React", "Node.js", "SQL", "Java", "C++", "Docker", "AWS", "TensorFlow"];
const suggestedInterests = ["AI/ML", "Web Dev", "Data Science", "Cloud", "Cybersecurity", "Mobile Dev", "DevOps", "Blockchain"];

const Dashboard = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const addSkill = (s?: string) => {
    const val = (s || skillInput).trim();
    if (val && !skills.includes(val)) {
      setSkills([...skills, val]);
      setSkillInput("");
    }
  };

  const addInterest = (s?: string) => {
    const val = (s || interestInput).trim();
    if (val && !interests.includes(val)) {
      setInterests([...interests, val]);
      setInterestInput("");
    }
  };

  const runAnalysis = () => {
    if (!year) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(generateAnalysis(skills, interests, year));
      setLoading(false);
    }, 3000);
  };

  const riskColor = (score: number) =>
    score <= 30 ? "text-success" : score <= 60 ? "text-warning" : "text-destructive";
  const riskBg = (score: number) =>
    score <= 30 ? "bg-success/10" : score <= 60 ? "bg-warning/10" : "bg-destructive/10";
  const riskLabel = (score: number) =>
    score <= 30 ? "Low Risk" : score <= 60 ? "Moderate Risk" : "High Risk";
  const importanceBadge = (imp: string) =>
    imp === "high" ? "bg-destructive/15 text-destructive border-destructive/20" : imp === "medium" ? "bg-warning/15 text-warning border-warning/20" : "bg-muted text-muted-foreground border-border";

  return (
    <div className="min-h-screen pt-20 pb-16 relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Career Intelligence Dashboard</h1>
              <p className="text-muted-foreground mt-1">AI-powered analysis in under 30 seconds</p>
            </div>
            {result && (
              <div className="flex items-center gap-3">
                <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground font-medium">Analysis Complete</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card-strong rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-foreground">Your Profile</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Skills */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Technical Skills</label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="Type a skill..."
                  className="bg-muted/50 border-border"
                />
                <Button size="icon" variant="outline" onClick={() => addSkill()} className="shrink-0 border-border hover:bg-primary/10 hover:border-primary/30">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary rounded-lg px-2.5 py-1 border border-primary/20">
                    {s}
                    <button onClick={() => setSkills(skills.filter((x) => x !== s))} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {suggestedSkills.filter(s => !skills.includes(s)).slice(0, 5).map((s) => (
                  <button key={s} onClick={() => addSkill(s)} className="text-[10px] text-muted-foreground border border-border/60 rounded-md px-2 py-0.5 hover:border-primary/40 hover:text-primary transition-colors">
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Career Interests</label>
              <div className="flex gap-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                  placeholder="Type an interest..."
                  className="bg-muted/50 border-border"
                />
                <Button size="icon" variant="outline" onClick={() => addInterest()} className="shrink-0 border-border hover:bg-secondary/10 hover:border-secondary/30">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {interests.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs font-medium bg-secondary/10 text-secondary rounded-lg px-2.5 py-1 border border-secondary/20">
                    {s}
                    <button onClick={() => setInterests(interests.filter((x) => x !== s))} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {suggestedInterests.filter(s => !interests.includes(s)).slice(0, 5).map((s) => (
                  <button key={s} onClick={() => addInterest(s)} className="text-[10px] text-muted-foreground border border-border/60 rounded-md px-2 py-0.5 hover:border-secondary/40 hover:text-secondary transition-colors">
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Year + CTA */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-foreground mb-2 block">Current Year</label>
              <Select onValueChange={setYear} value={year}>
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year (Freshman)</SelectItem>
                  <SelectItem value="2">2nd Year (Sophomore)</SelectItem>
                  <SelectItem value="3">3rd Year (Junior)</SelectItem>
                  <SelectItem value="4">4th Year (Senior)</SelectItem>
                </SelectContent>
              </Select>

              <button
                onClick={runAnalysis}
                disabled={loading || !year}
                className="gradient-btn mt-4 px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Run AI Analysis
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card-strong rounded-2xl p-12 flex flex-col items-center justify-center"
            >
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-muted" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-3 rounded-full border-4 border-secondary/30 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-foreground font-display font-semibold text-xl mb-2">Running AI Analysis</p>
              <p className="text-muted-foreground text-sm mb-6">Processing your profile against 100K+ placement records...</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                {["Scanning industries...", "Mapping skill gaps...", "Predicting placement..."].map((step, i) => (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.8 }}
                    className="flex items-center gap-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                    {step}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Top Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Career Risk */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                  className="glass-card-strong rounded-2xl p-5 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[60px] ${riskBg(result.careerRiskScore)}`} />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Score</span>
                    </div>
                    <div className={`font-display text-4xl font-bold ${riskColor(result.careerRiskScore)}`}>
                      {result.careerRiskScore}
                    </div>
                    <span className={`text-xs font-medium mt-1 inline-block ${riskColor(result.careerRiskScore)}`}>{riskLabel(result.careerRiskScore)}</span>
                  </div>
                </motion.div>

                {/* Placement */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="glass-card-strong rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-[60px]" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Placement</span>
                    </div>
                    <div className="font-display text-4xl font-bold text-success">{result.placementProbability}%</div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.placementProbability}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full bg-success"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Grade */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="glass-card-strong rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[60px]" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overall Grade</span>
                    </div>
                    <div className="font-display text-4xl font-bold gradient-text">{result.overallGrade}</div>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">Top {100 - result.placementProbability}% percentile</span>
                  </div>
                </motion.div>

                {/* Gaps */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="glass-card-strong rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-full blur-[60px]" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Skill Gaps</span>
                    </div>
                    <div className="font-display text-4xl font-bold text-warning">{result.skillGaps.length}</div>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">{result.skillGaps.filter(g => g.importance === "high").length} critical</span>
                  </div>
                </motion.div>
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-5 gap-6">
                {/* Demand Trends — wider */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                  className="glass-card-strong rounded-2xl p-6 lg:col-span-3">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" /> Skill Demand Trends
                    </h3>
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-md uppercase tracking-wider">Last 7 months</span>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.demandTrends}>
                        <defs>
                          <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(230, 80%, 62%)" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="hsl(230, 80%, 62%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="webGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(270, 60%, 58%)" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="hsl(270, 60%, 58%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 15%, 16%)" />
                        <XAxis dataKey="month" stroke="hsl(215, 15%, 40%)" fontSize={10} tickLine={false} />
                        <YAxis stroke="hsl(215, 15%, 40%)" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ background: "hsl(228, 18%, 11%)", border: "1px solid hsl(228, 15%, 20%)", borderRadius: "12px", fontSize: "12px", color: "hsl(210, 20%, 92%)" }} />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                        <Area type="monotone" dataKey="aiml" name="AI/ML" stroke="hsl(230, 80%, 62%)" fill="url(#aiGrad)" strokeWidth={2} dot={false} />
                        <Area type="monotone" dataKey="webdev" name="Web Dev" stroke="hsl(270, 60%, 58%)" fill="url(#webGrad)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="datascience" name="Data Sci" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="cloud" name="Cloud" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="cyber" name="Cyber" stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Industry Risk */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="glass-card-strong rounded-2xl p-6 lg:col-span-2">
                  <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-5">
                    <Shield className="h-4 w-4 text-primary" /> Industry Risk Map
                  </h3>
                  <div className="space-y-3">
                    {result.industryRisk.map((ind) => (
                      <div key={ind.industry} className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-foreground truncate">{ind.industry}</span>
                            <div className="flex items-center gap-1">
                              {ind.trend === "up" ? <ArrowUpRight className="h-3 w-3 text-destructive" /> : ind.trend === "down" ? <ArrowDownRight className="h-3 w-3 text-success" /> : <Minus className="h-3 w-3 text-muted-foreground" />}
                              <span className={`text-xs font-bold ${ind.risk > 50 ? "text-destructive" : ind.risk > 30 ? "text-warning" : "text-success"}`}>{ind.risk}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${ind.risk}%` }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                              className={`h-full rounded-full ${ind.risk > 50 ? "bg-destructive" : ind.risk > 30 ? "bg-warning" : "bg-success"}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Skill Gaps + Weekly Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Skill Gap Analysis */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                  className="glass-card-strong rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-5">
                    <AlertTriangle className="h-4 w-4 text-warning" /> Skill Gap Analysis
                  </h3>
                  <div className="space-y-4">
                    {result.skillGaps.map((g) => (
                      <div key={g.skill}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{g.skill}</span>
                            <span className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${importanceBadge(g.importance)}`}>
                              {g.importance}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{g.currentLevel}% → {g.requiredLevel}%</span>
                        </div>
                        <div className="relative w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${g.requiredLevel}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute h-full rounded-full bg-muted-foreground/20"
                          />
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${g.currentLevel}%` }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className={`absolute h-full rounded-full ${g.importance === "high" ? "bg-destructive" : g.importance === "medium" ? "bg-warning" : "bg-primary"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Weekly Market Activity */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="glass-card-strong rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" /> Market Activity (Weekly)
                    </h3>
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-md uppercase tracking-wider">Simulated</span>
                  </div>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.weeklyActivity} barGap={2}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 15%, 16%)" />
                        <XAxis dataKey="day" stroke="hsl(215, 15%, 40%)" fontSize={10} tickLine={false} />
                        <YAxis stroke="hsl(215, 15%, 40%)" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ background: "hsl(228, 18%, 11%)", border: "1px solid hsl(228, 15%, 20%)", borderRadius: "12px", fontSize: "12px", color: "hsl(210, 20%, 92%)" }} />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                        <Bar dataKey="applications" name="Applications" fill="hsl(230, 80%, 62%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="interviews" name="Interviews" fill="hsl(270, 60%, 58%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="offers" name="Offers" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Recommended Skills */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" /> Recommended Skills to Learn
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {result.recommendedSkills.map((s) => (
                    <div key={s.name} className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground text-sm">{s.name}</span>
                        {s.trending && (
                          <span className="text-[9px] uppercase tracking-wider font-bold text-success bg-success/10 px-1.5 py-0.5 rounded">🔥</span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{s.category}</span>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-muted rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.demand}%` }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="h-full rounded-full bg-primary"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{s.demand}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Trending Roles */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" /> Trending Roles for You
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.trendingRoles.map((r) => (
                    <div key={r.title} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-display font-semibold text-foreground">{r.title}</h4>
                        <span className="text-xs font-bold text-success flex items-center gap-0.5">
                          <TrendingUp className="h-3 w-3" /> +{r.growth}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Salary</p>
                          <p className="text-xs font-medium text-foreground">{r.avgSalary}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Openings</p>
                          <p className="text-xs font-medium text-foreground">{r.openings}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Match</p>
                          <p className="text-xs font-medium text-primary">{r.match}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${r.match}%` }}
                          transition={{ duration: 0.6, delay: 0.7 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
