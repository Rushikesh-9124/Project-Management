import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  LineChart,
  Shield,
  Users,
  Zap,
  Github,
  Slack,
  Cloud,
  Settings,
  Mail,
  Phone,
  Linkedin,
  ChevronRight,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignInButton, SignedOut } from "@clerk/clerk-react";


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

// Utility: container stagger
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const AccentBlob = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute -z-10 blur-3xl opacity-25 ${className}`}
    aria-hidden
  />
);

const Wordmark = () => (
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 grid place-items-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
      <Cloud className="h-5 w-5" />
    </div>
    <span className="font-semibold tracking-tight text-gray-900 text-lg md:text-xl">
       Project Management Hub
    </span>
  </div>
);


const LogoCloud = () => (
  <div className="mx-auto max-w-6xl px-6">
    <div className="grid grid-cols-2 md:grid-cols-6 place-items-center gap-6 border-y py-8 border-gray-200">
      {["github", "slack", "kubernetes", "aws", "vercel", "circleci"].map((name, i) => (
        <div key={i} className="opacity-60 hover:opacity-100 transition-opacity">
          <div className="h-6 w-28 rounded bg-gray-100 grid place-items-center text-[10px] uppercase tracking-widest text-gray-500">
            {name}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Feature item data
const FEATURES = [
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Live Project Insights",
    desc: "Stay on top of timelines, burn-down, and velocity — all in one clean view.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Collaboration, Simplified",
    desc: "Comments, mentions, and role-based permissions keep teams aligned.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure & Scalable",
    desc: "PostgreSQL-backed reliability with enterprise-grade controls.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Workflow Automations",
    desc: "Trigger CI/CD, sync with GitHub & Slack, and keep work moving.",
  },
];

// Pricing plans
const PLANS = [
  {
    name: "Free",
    price: "₹0",
    blurb: "For individuals validating ideas.",
    cta: "Get Started",
    popular: false,
    features: [
      "Unlimited personal projects",
      "2 team members",
      "Basic analytics",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "₹699/mo",
    blurb: "For growing teams that need more control.",
    cta: "Start 14‑day Trial",
    popular: true,
    features: [
      "Unlimited projects & members",
      "Advanced analytics",
      "Role-based access",
      "Slack/GitHub integrations",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    blurb: "For orgs needing SSO, audit logs, and SLAs.",
    cta: "Contact Sales",
    popular: false,
    features: [
      "SSO / SAML / SCIM",
      "Custom roles & audit logs",
      "Dedicated infra & VPC",
      "Onboarding & training",
    ],
  },
];

// FAQ
const FAQ = [
  {
    q: "Is there a free plan?",
    a: "Yes — start free with personal projects and upgrade when your team grows.",
  },
  { q: "Do you offer trials?", a: "Pro includes a 14‑day trial. No credit card required." },
  {
    q: "How secure is Project Management Hub?",
    a: "We use industry best practices, encryption at rest and in transit, and RBAC for granular control.",
  },
  {
    q: "Can we self-host?",
    a: "Enterprise customers can request dedicated deployments and custom SLAs.",
  },
];

// Dashboard mock (self-contained SVG so it renders without assets)
const DashboardPreview = () => (
  <div className="relative">
    <AccentBlob className="-top-20 -left-20 h-60 w-60 bg-blue-300" />
    <AccentBlob className="-bottom-16 -right-10 h-64 w-64 bg-sky-300" />
    <Card className="shadow-lg border-gray-200/80">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Settings className="h-5 w-5 text-blue-600" /> Project Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="size-2 rounded-full bg-emerald-500" />
              Active · Kubernetes Migration
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="rounded-full bg-gray-100 px-2 py-1">3 members</span>
              <span className="rounded-full bg-gray-100 px-2 py-1">Due Jan 20</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
            <div className="col-span-2">
              <div className="text-xs text-gray-500 mb-1">Progress</div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-blue-600 rounded-full" />
              </div>
              <div className="mt-4 space-y-2">
                {["Plan", "Build", "Test", "Deploy"].map((s, i) => (
                  <div key={s} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="size-2 rounded-full bg-gray-300" /> {s}
                    </div>
                    <div className="w-40 h-1.5 rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${(i + 1) * 20 + 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-2">My Tasks</div>
              <div className="space-y-2">
                {["Set up EKS cluster", "Migrate to Playwright 1.48", "Visual snapshot comparison"].map(
                  (t, i) => (
                    <label key={i} className="flex items-start gap-2 text-sm">
                      <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300" />
                      <span className="text-gray-700">{t}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Testimonial card
const Testimonial = ({ quote, name, role }) => (
  <Card className="h-full border-gray-200">
    <CardContent className="pt-6">
      <div className="flex items-center gap-1 text-amber-500 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed">{quote}</p>
      <div className="mt-4 text-sm text-gray-500">
        <span className="font-medium text-gray-900">{name}</span> · {role}
      </div>
    </CardContent>
  </Card>
);

// Pricing card
const PlanCard = ({ plan }) => (
  <Card className={`relative border-gray-200 ${plan.popular ? "ring-2 ring-blue-600" : ""}`}>
    {plan.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
        Most Popular
      </div>
    )}
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span className="text-gray-900">{plan.name}</span>
        <span className="text-xl font-semibold text-gray-900">{plan.price}</span>
      </CardTitle>
      <p className="text-sm text-gray-500">{plan.blurb}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <ul className="space-y-2">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <Check className="mt-0.5 h-4 w-4 text-blue-600" /> {f}
          </li>
        ))}
      </ul>
      <Button className="w-full bg-blue-600 hover:bg-blue-700">{plan.cta}</Button>
    </CardContent>
  </Card>
);

// FAQ item
const FaqItem = ({ q, a }) => (
  <details className="group rounded-xl border border-gray-200 p-4">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
      <h4 className="font-medium text-gray-900">{q}</h4>
      <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90" />
    </summary>
    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>
  </details>
);

// Navbar
const Navbar = () => (
  <header className="sticky top-0 z-30 w-full border-b border-gray-200/80 bg-white/75 backdrop-blur">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
      <Wordmark />
      <div className="hidden items-center gap-8 md:flex">
        {[
          ["Features", "#features"],
          ["Pricing", "#pricing"],
          ["FAQ", "#faq"],
          ["Contact", "#contact"],
        ].map(([label, href]) => (
          <a key={label} href={href} className="text-sm text-gray-600 hover:text-gray-900">
            {label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <SignedOut>
            <Button asChild variant={'outline'} className={'bg-blue-600/80 border-0'}>
                <SignInButton />
            </Button>
        </SignedOut>
      </div>
    </nav>
  </header>
);

// Hero section
const Hero = () => (
  <section className="relative overflow-hidden">
    <AccentBlob className="top-10 left-20 h-72 w-72 bg-blue-300" />
    <AccentBlob className="-top-12 right-10 h-80 w-80 bg-sky-300" />

    <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-20 md:pb-16">
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <motion.div variants={fadeUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Sparkles className="h-3.5 w-3.5" /> New: Visual Snapshot Comparison
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            Empower your team. Manage operations efficiently.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-gray-600">
          Project Management Hub unifies projects, tasks, and real-time insights — built for
            DevOps, QA, and Cloud teams. Simple, reliable, and fast.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline">View Demo</Button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1"><Shield className="h-4 w-4" /> SOC2 ready</div>
            <div className="flex items-center gap-1"><Github className="h-4 w-4" /> GitHub Sync</div>
            <div className="flex items-center gap-1"><Slack className="h-4 w-4" /> Slack Alerts</div>
          </motion.div>
        </div>
        <motion.div variants={fadeUp} className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-4xl bg-linear-to-tr from-blue-100 via-sky-50 to-transparent" />
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
            <DashboardPreview />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
    <div className="text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
        Built for modern teams
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-gray-600">
        Ship faster with clarity. Project Management Hub streamlines planning, tracking, and
        collaboration across your org.
      </p>
    </div>

    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((f, i) => {
        const fromLeft = i % 4 < 2;
        const directionVariant = {
          hidden: { opacity: 0, x: fromLeft ? -50 : 50 },
          show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1 } },
        };

        return (
          <motion.div
            key={f.title}
            variants={directionVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <Card className="h-full border-gray-200 hover:shadow-md transition">
              <CardContent className="pt-6">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  {f.icon}
                </div>
                <h3 className="font-medium text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </section>
);

const Metrics = () => (
  <section className="bg-linear-to-b from-white to-sky-50/40">
    <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-4">
        {[
          ["99.9%", "Uptime"],
          ["2M+", "Tasks tracked"],
          ["120+", "Teams onboarded"],
          ["< 200ms", "Avg API latency"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-semibold text-gray-900">{v}</div>
            <div className="mt-2 text-sm text-gray-600">{l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
    <div className="text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">Simple, transparent pricing</h2>
      <p className="mx-auto mt-3 max-w-2xl text-gray-600">
        Start free. Upgrade when you need to. Cancel anytime.
      </p>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {PLANS.map((p) => (
        <PlanCard key={p.name} plan={p} />
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="bg-white">
    <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">Loved by engineering teams</h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Hear from teams that migrated from spreadsheets and never looked back.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Testimonial
          quote="Project Management Hub streamlined our Kubernetes migration across squads. The analytics helped us spot blockers early."
          name="Aarav Sharma"
          role="DevOps Lead, TechNova"
        />
        <Testimonial
          quote="We replaced three tools with one dashboard. Tasks, analytics, and automations just click."
          name="Meera Iyer"
          role="QA Manager, PixelForge"
        />
        <Testimonial
          quote="Secure, fast, and thoughtfully designed. Our weekly standups are finally about outcomes, not status hunting."
          name="Rahul Verma"
          role="Engineering Manager, DataLift"
        />
      </div>
    </div>
  </section>
);

const Faq = () => (
  <section id="faq" className="bg-slate-50/60">
    <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">Frequently asked questions</h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Can’t find what you’re looking for? Email us and we’ll help.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {FAQ.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Still have questions? <a href="#contact" className="text-blue-600 hover:underline">Contact us</a>.
      </div>
    </div>
  </section>
);

const Cta = () => (
  <section className="relative overflow-hidden">
    <AccentBlob className="-left-10 top-1/2 h-64 w-64 -translate-y-1/2 bg-blue-300" />
    <AccentBlob className="-right-10 top-1/2 h-64 w-64 -translate-y-1/2 bg-sky-300" />

    <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <div className="rounded-3xl border border-blue-200 bg-linear-to-r from-blue-600 to-sky-600 p-8 text-white shadow-lg md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Start managing your projects the smart way</h3>
            <p className="mt-2 text-white/80">
              Create a workspace in minutes. No credit card required.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Input placeholder="Work email" className="bg-white text-gray-900" />
            <Button className="bg-black/90 hover:bg-black">Create free account</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="border-t border-gray-200 bg-white">
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Wordmark />
          <p className="mt-3 text-sm text-gray-600">
            The project management hub for cloud-first teams. Built with PERN.
          </p>
          <div className="mt-4 flex items-center gap-3 text-gray-500">
            <a href="#" className="hover:text-gray-900" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-900" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-900" aria-label="Phone">
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#features" className="hover:text-gray-900">Features</a></li>
            <li><a href="#pricing" className="hover:text-gray-900">Pricing</a></li>
            <li><a href="#" className="hover:text-gray-900">Docs</a></li>
            <li><a href="#" className="hover:text-gray-900">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-gray-900">About</a></li>
            <li><a href="#" className="hover:text-gray-900">Careers</a></li>
            <li><a href="#" className="hover:text-gray-900">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#faq" className="hover:text-gray-900">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-900">Status</a></li>
            <li><a href="#" className="hover:text-gray-900">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-gray-500 md:flex-row">
        <p>© {new Date().getFullYear()} Project Management Hub. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <Metrics />
      <Pricing />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
