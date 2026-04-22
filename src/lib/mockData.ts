export interface AnalysisResult {
  careerRiskScore: number;
  placementProbability: number;
  overallGrade: string;
  skillGaps: { skill: string; importance: "high" | "medium" | "low"; currentLevel: number; requiredLevel: number }[];
  recommendedSkills: { name: string; category: string; demand: number; trending: boolean }[];
  trendingRoles: { title: string; growth: number; avgSalary: string; openings: string; match: number }[];
  demandTrends: { month: string; aiml: number; webdev: number; datascience: number; cloud: number; cyber: number }[];
  weeklyActivity: { day: string; applications: number; interviews: number; offers: number }[];
  industryRisk: { industry: string; risk: number; trend: "up" | "down" | "stable" }[];
}

const skillProfiles: Record<string, Partial<AnalysisResult>> = {
  high: {
    careerRiskScore: 18,
    placementProbability: 89,
    overallGrade: "A",
  },
  medium: {
    careerRiskScore: 42,
    placementProbability: 67,
    overallGrade: "B+",
  },
  low: {
    careerRiskScore: 71,
    placementProbability: 38,
    overallGrade: "C",
  },
};

export const generateAnalysis = (skills: string[], _interests: string[], year: string): AnalysisResult => {
  const skillCount = skills.length;
  const yearNum = parseInt(year) || 1;
  const profile = skillCount >= 4 ? "high" : skillCount >= 2 ? "medium" : "low";
  const base = skillProfiles[profile];

  // Adjust by year
  const yearBonus = (yearNum - 1) * 4;
  const riskScore = Math.max(5, (base.careerRiskScore ?? 50) - yearBonus + Math.floor(Math.random() * 6 - 3));
  const placementProb = Math.min(97, (base.placementProbability ?? 50) + yearBonus + Math.floor(Math.random() * 6 - 3));

  return {
    careerRiskScore: riskScore,
    placementProbability: placementProb,
    overallGrade: base.overallGrade ?? "B",
    skillGaps: [
      { skill: "System Design", importance: "high" as const, currentLevel: 25, requiredLevel: 80 },
      { skill: "Data Structures & Algorithms", importance: "high" as const, currentLevel: 45, requiredLevel: 85 },
      { skill: "Cloud Architecture (AWS/GCP)", importance: "high" as const, currentLevel: 15, requiredLevel: 70 },
      { skill: "Machine Learning Fundamentals", importance: "medium" as const, currentLevel: 30, requiredLevel: 65 },
      { skill: "DevOps & CI/CD Pipelines", importance: "medium" as const, currentLevel: 20, requiredLevel: 60 },
      { skill: "Technical Communication", importance: "low" as const, currentLevel: 50, requiredLevel: 70 },
    ].filter((_, idx) => profile === "low" || idx < 5),
    recommendedSkills: [
      { name: "Python", category: "Language", demand: 94, trending: true },
      { name: "React / Next.js", category: "Frontend", demand: 91, trending: true },
      { name: "AWS / Azure", category: "Cloud", demand: 88, trending: true },
      { name: "Docker & K8s", category: "DevOps", demand: 85, trending: false },
      { name: "TensorFlow / PyTorch", category: "AI/ML", demand: 82, trending: true },
      { name: "PostgreSQL", category: "Database", demand: 78, trending: false },
      { name: "Go / Rust", category: "Language", demand: 72, trending: true },
      { name: "GraphQL", category: "API", demand: 68, trending: false },
    ],
    trendingRoles: [
      { title: "AI/ML Engineer", growth: 34, avgSalary: "₹12-25 LPA", openings: "14.2K", match: Math.min(95, placementProb + 5) },
      { title: "Full-Stack Developer", growth: 22, avgSalary: "₹8-18 LPA", openings: "28.5K", match: Math.min(95, placementProb) },
      { title: "Data Scientist", growth: 28, avgSalary: "₹10-22 LPA", openings: "11.8K", match: Math.min(90, placementProb - 3) },
      { title: "Cloud Architect", growth: 30, avgSalary: "₹15-30 LPA", openings: "8.3K", match: Math.min(85, placementProb - 8) },
      { title: "Cybersecurity Analyst", growth: 26, avgSalary: "₹8-20 LPA", openings: "6.7K", match: Math.min(80, placementProb - 12) },
      { title: "DevOps Engineer", growth: 24, avgSalary: "₹10-22 LPA", openings: "9.1K", match: Math.min(82, placementProb - 10) },
    ],
    demandTrends: [
      { month: "Oct '25", aiml: 62, webdev: 78, datascience: 58, cloud: 52, cyber: 45 },
      { month: "Nov '25", aiml: 65, webdev: 76, datascience: 61, cloud: 55, cyber: 48 },
      { month: "Dec '25", aiml: 70, webdev: 79, datascience: 64, cloud: 60, cyber: 50 },
      { month: "Jan '26", aiml: 76, webdev: 80, datascience: 68, cloud: 65, cyber: 54 },
      { month: "Feb '26", aiml: 82, webdev: 82, datascience: 72, cloud: 70, cyber: 58 },
      { month: "Mar '26", aiml: 88, webdev: 83, datascience: 76, cloud: 75, cyber: 62 },
      { month: "Apr '26", aiml: 93, webdev: 85, datascience: 80, cloud: 79, cyber: 66 },
    ],
    weeklyActivity: [
      { day: "Mon", applications: 45, interviews: 12, offers: 3 },
      { day: "Tue", applications: 52, interviews: 15, offers: 4 },
      { day: "Wed", applications: 48, interviews: 18, offers: 5 },
      { day: "Thu", applications: 61, interviews: 22, offers: 6 },
      { day: "Fri", applications: 55, interviews: 19, offers: 5 },
      { day: "Sat", applications: 30, interviews: 8, offers: 2 },
      { day: "Sun", applications: 22, interviews: 5, offers: 1 },
    ],
    industryRisk: [
      { industry: "Traditional IT Services", risk: 72, trend: "up" as const },
      { industry: "Banking & Finance", risk: 45, trend: "stable" as const },
      { industry: "Healthcare Tech", risk: 18, trend: "down" as const },
      { industry: "E-Commerce", risk: 35, trend: "stable" as const },
      { industry: "Automotive / EV", risk: 22, trend: "down" as const },
      { industry: "EdTech", risk: 55, trend: "up" as const },
    ],
  };
};
