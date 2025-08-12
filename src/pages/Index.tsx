import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Basic SEO setup for the landing page
    document.title = "Vorrenti | Luxury Mattress – Coming Soon";

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", "Vorrenti luxury mattress – Sign up to get launch updates.");
    setMeta("og:title", "Vorrenti | Luxury Mattress – Coming Soon", "property");
    setMeta("og:description", "Sign up to get notified when Vorrenti launches.", "property");
    setMeta("og:type", "website", "property");

    // Canonical tag
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);

    // Structured Data (Organization)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Vorrenti",
      url: window.location.origin,
      logo: "/lovable-uploads/004b277e-ebcf-4bb9-9b07-b1fb2526f038.png",
    };
    const existingLd = document.getElementById("ld-org") as HTMLScriptElement | null;
    const script: HTMLScriptElement = existingLd || document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ld-org";
    script.text = JSON.stringify(jsonLd);
    if (!existingLd) document.head.appendChild(script);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email address.");
    const valid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
    if (!valid) return toast.error("That email looks invalid.");

    // TODO: Wire up Supabase waitlist storage upon confirmation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thanks! We'll keep you posted.");
      setEmail("");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto py-10">
        <nav aria-label="Main navigation" className="flex items-center justify-center">
          <img
            src="/lovable-uploads/004b277e-ebcf-4bb9-9b07-b1fb2526f038.png"
            alt="Vorrenti logo – luxury mattress brand"
            loading="lazy"
            className="h-16 w-auto"
          />
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <article className="flex flex-col items-start justify-center text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Vorrenti Luxury Mattress – Coming Soon
            </h1>
            <p className="mt-4 text-muted-foreground max-w-prose">
              Designed in Italy. Hand crafted in the USA. Be the first to know when we launch and get exclusive early access.
            </p>

            <form onSubmit={onSubmit} className="mt-6 w-full max-w-md" aria-label="Email sign up for launch updates">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  required
                />
                <Button type="submit" disabled={loading} className="shrink-0">
                  {loading ? "Submitting..." : "Notify Me"}
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
            </form>
          </article>

          <aside className="relative">
            <img
              src="/lovable-uploads/663a0c70-1499-4351-8129-f57300f0894d.png"
              alt="Vorrenti luxury mattress in an elegant bedroom"
              loading="lazy"
              className="w-full rounded-lg shadow-lg"
            />
          </aside>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-10">
        <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Vorrenti. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
