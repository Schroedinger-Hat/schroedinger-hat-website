"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BecomeMemberPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Diventa Socio</h1>
        <div className="prose mb-8 max-w-none">
          <p className="text-lg">
            Unisciti all'associazione e diventa parte attiva della nostra
            community
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Benefici</h2>
            <ul className="space-y-3">{/* List of member benefits */}</ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Quote Associative</h2>
            {/* Membership fees and options */}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Processo di Iscrizione</h2>
          <div className="flex flex-col items-center">
            <p className="mb-6 text-center text-gray-600">
              Per diventare socio, clicca sul pulsante qui sotto. Verrai
              reindirizzato alla pagina di pagamento sicura di Stripe per
              completare l'iscrizione.
            </p>
            <Button
              onClick={handleSubscribe}
              disabled={isLoading}
              size="lg"
              className="rounded-full"
            >
              {isLoading ? "Caricamento..." : "Diventa Socio"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
