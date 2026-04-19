import { BriefcaseBusiness, MapPin } from "lucide-react";

import type { Database } from "@/types/database";

type Experience = Database["public"]["Tables"]["experiences"]["Row"];

export function ExperienceList({ items }: { items: Experience[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="glass-panel rounded-3xl p-4">
      <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-blue-100/68">
        Experience
      </h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-white/8 bg-white/4 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                {item.company ? (
                  <p className="mt-1 flex items-center gap-2 text-sm text-blue-100/78">
                    <BriefcaseBusiness className="size-4" />
                    {item.company}
                  </p>
                ) : null}
                {item.location ? (
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <MapPin className="size-4" />
                    {item.location}
                  </p>
                ) : null}
              </div>
              <div className="text-right text-xs text-muted">
                {item.start_date || item.end_date || item.is_current ? (
                  <>
                    <p>{item.start_date ?? "Start date"}</p>
                    <p>{item.is_current ? "Present" : item.end_date ?? ""}</p>
                  </>
                ) : null}
              </div>
            </div>
            {item.description ? (
              <p className="mt-3 text-sm leading-7 text-muted">
                {item.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
