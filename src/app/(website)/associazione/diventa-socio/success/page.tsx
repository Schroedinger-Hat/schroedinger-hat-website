import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  let customerEmail = "";
  if (sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    customerEmail = session.customer_details?.email || "";
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-green-600">
          Iscrizione Completata!
        </h1>
        <p className="mb-8 text-lg">
          Grazie per essere diventato socio!{" "}
          {customerEmail && `Abbiamo inviato una conferma a ${customerEmail}`}
        </p>
        <Button asChild>
          <Link href="/">Torna alla Home</Link>
        </Button>
      </div>
    </main>
  );
}
