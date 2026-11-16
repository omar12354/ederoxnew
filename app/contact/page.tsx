import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { SolutionFinder } from "@/components/SolutionFinder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Ederox of plan een vrijblijvende kennismaking. Wij denken graag met je mee.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="h-16 bg-navy md:h-20" aria-hidden />
      <ContactSection headingLevel="h1" />
      <SolutionFinder />
    </>
  );
}
