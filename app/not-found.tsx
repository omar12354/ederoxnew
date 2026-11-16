import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center pt-24">
      <div className="container-x text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-navy sm:text-6xl">Deze pagina bestaat niet.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">Misschien is de pagina verplaatst of is de link niet helemaal juist.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" arrow>Naar de homepage</Button>
          <Button href="/contact" variant="secondary">Contact</Button>
        </div>
      </div>
    </section>
  );
}
