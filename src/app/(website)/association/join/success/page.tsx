import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heading } from "@/components/atoms/typography/Heading";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { SuccessConfetti } from "./success-confetti";
import {
  CheckmarkBadge01Icon,
  UserMultipleIcon,
  WavingHand01Icon,
} from "hugeicons-react";
interface SuccessPageProps {
  searchParams: Promise<{ session_id: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let customerEmail = "";
  if (sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    customerEmail = session.customer_details?.email || "";
  }

  return (
    <main className="container mx-auto px-4 py-32">
      <div className="absolute inset-0 z-0">
        <SuccessConfetti />
      </div>
      {/* Header Section */}
      <div className="relative z-10 mx-auto max-w-3xl bg-white/90 text-center">
        <Heading level={1} className="mb-4">
          Iscrizione Completata!
        </Heading>
        <Paragraph className="mb-12">
          La tua richiesta è stata inviata con successo!
          <br />
          Cosa succede ora?
        </Paragraph>
      </div>
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-xl bg-slate-50 p-10 py-10 text-left">
            <div className="mb-4 inline-block rounded-lg bg-blue-500 p-3">
              <div className="h-8 w-8 text-white">
                <CheckmarkBadge01Icon className="h-8 w-8" />
              </div>
            </div>
            <Heading level={4} className="mb-2">
              Conferma
            </Heading>
            <Paragraph className="text-slate-800">
              {customerEmail &&
                `Abbiamo inviato una conferma a ${customerEmail}`}
            </Paragraph>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl bg-slate-50 p-10 py-10 text-left">
            <div className="mb-4 inline-block rounded-lg bg-blue-500 p-3">
              <div className="h-8 w-8 text-white">
                <UserMultipleIcon className="h-8 w-8" />
              </div>
            </div>
            <Heading level={4} className="mb-2">
              Approvazione
            </Heading>
            <Paragraph className="text-slate-800">
              I soci dell'associazione approveranno la tua richiesta.
            </Paragraph>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl bg-slate-50 p-10 py-10 text-left">
            <div className="mb-4 inline-block rounded-lg bg-blue-500 p-3">
              <div className="h-8 w-8 text-white">
                <WavingHand01Icon className="h-8 w-8" />
              </div>
            </div>
            <Heading level={4} className="mb-2">
              Benvenuto
            </Heading>
            <Paragraph className="text-slate-800">
              Riceverai il tuo numero socio nelle prossime settimane.
            </Paragraph>
          </div>
        </div>
      </div>
    </main>
  );
}
