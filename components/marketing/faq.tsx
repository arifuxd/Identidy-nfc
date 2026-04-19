import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    question: "Do I need NFC-specific code in the app?",
    answer:
      "No. The NFC card only needs to point to a public URL. The app handles the profile page, analytics, and contact download.",
  },
  {
    question: "Can users hide empty profile sections?",
    answer:
      "Yes. The public profile only renders sections that actually contain data, keeping the experience minimal and fast.",
  },
  {
    question: "How do analytics work?",
    answer:
      "Each public profile visit is recorded server-side with coarse de-duplication so repeated refreshes do not inflate counts too aggressively.",
  },
  {
    question: "Can I manage multiple users as an admin?",
    answer:
      "Yes. Admins can create users, assign roles, edit profile records, and remove accounts from the admin area.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions teams usually ask first"
        copy="The app is designed to be simple to operate day to day while still giving you the structure you need for a real SaaS deployment."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {faqs.map((faq) => (
          <Card key={faq.question} className="rounded-[2rem] border-white/8">
            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
