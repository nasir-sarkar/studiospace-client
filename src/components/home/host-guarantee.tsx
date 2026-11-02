import { Headset, ShieldCheck, UserCheck, Wrench } from "lucide-react";

const assurances = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    text: "Every confirmed booking is covered by our host guarantee for accidental damage and on-site incidents.",
  },
  {
    icon: UserCheck,
    title: "Verified Profiles",
    text: "Hosts and creators sign in with verified accounts so you always know who you are working with.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    text: "Listings state their gear and amenities clearly, and security deposits protect equipment on both sides.",
  },
  {
    icon: Headset,
    title: "24/7 Host Support",
    text: "Our support team is on call around the clock for access issues, schedule changes and urgent questions.",
  },
];

export function HostGuarantee() {
  return (
    <section
      aria-labelledby="guarantee-heading"
      className="section-space bg-ink text-ink-foreground"
    >
      <div className="page-container">
        <div className="text-center">
          <p className="eyebrow">Host Guarantee & Creator Support</p>
          <h2 id="guarantee-heading" className="section-title mt-2 !text-white">
            Book with confidence, create without worry
          </h2>
          <p className="section-subtitle mx-auto !text-white/70">
            Trust is built into every booking on StudioSpace.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <item.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
