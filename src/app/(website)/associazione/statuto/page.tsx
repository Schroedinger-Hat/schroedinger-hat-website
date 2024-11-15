export default function StatutePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Statuto dell'Associazione</h1>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">
              Art. 1 - Denominazione e Sede
            </h2>
            {/* Statute content */}

            <h2 className="mb-4 text-2xl font-bold">Art. 2 - Scopo</h2>
            {/* Purpose content */}

            <h2 className="mb-4 text-2xl font-bold">Art. 3 - Soci</h2>
            {/* Members content */}
          </div>
        </div>
      </div>
    </main>
  );
}
