export default function BecomeSpeakerPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Diventa Speaker</h1>
        <div className="prose mb-8 max-w-none">
          <p className="text-lg">
            Condividi la tua esperienza e conoscenza con la community
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">
              Perché diventare speaker?
            </h2>
            {/* Benefits list */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Requisiti</h2>
            {/* Requirements list */}
          </div>
        </div>
        <div className="text-center">
          <button className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-bold text-white">
            Candidati come Speaker
          </button>
        </div>
      </div>
    </main>
  );
}
