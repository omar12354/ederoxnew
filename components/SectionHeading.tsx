import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "left", dark, as = "h2", className, id }: Props) {
  const Tag = as;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-5", align === "center" && "justify-center")}>{eyebrow}</p>}
      <Tag
        id={id}
        className={cn(
          "text-[2rem] leading-[1.08] font-semibold sm:text-5xl",
          as === "h1" && "sm:text-6xl",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Tag>
      {text && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/65" : "text-muted")}>{text}</p>}
    </Reveal>
  );
}
