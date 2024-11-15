export default function BecomeSponsorPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Diventa Sponsor</h1>
        <div className="prose mb-8 max-w-none">
          <p className="text-lg">
            Supporta la nostra missione diventando uno sponsor
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Sponsorship tiers */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-bold">Bronze</h3>
            <p className="mb-4 text-gray-600">
              Pacchetto base di sponsorizzazione
            </p>
            {/* Tier benefits */}
          </div>
          {/* Add more tiers */}
        </div>
      </div>
    </main>
  );
}
