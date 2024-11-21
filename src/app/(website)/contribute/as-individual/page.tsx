export default function ContributeIndividualPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Contribuisci come Individuo</h1>
        <div className="prose mb-8 max-w-none">
          <p className="text-lg">
            Scopri come puoi contribuire individualmente alla nostra community
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Contribution options */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-bold">Sviluppo</h3>
            <p className="mb-4 text-gray-600">
              Contribuisci ai nostri progetti open source
            </p>
          </div>
          {/* Add more contribution options */}
        </div>
      </div>
    </main>
  );
}
