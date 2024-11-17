import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
          Iscrizione Annullata
        </h1>
        <p className="mb-8 text-lg">
          Il processo di iscrizione è stato annullato. Se hai domande o
          problemi, non esitare a contattarci.
        </p>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link href="/associazione/diventa-socio">Riprova</Link>
          </Button>
          <Button asChild>
            <Link href="/">Torna alla Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
