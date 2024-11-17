import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heading } from "@/components/atoms/typography/Heading";
import { Paragraph } from "@/components/atoms/typography/Paragraph";

export default function CancelPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <Heading level={1} className="mb-6">
          Iscrizione Annullata
        </Heading>
        <Paragraph className="mb-8">
          Il processo di iscrizione è stato annullato. Se hai domande o
          problemi, non esitare a contattarci.
        </Paragraph>
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
