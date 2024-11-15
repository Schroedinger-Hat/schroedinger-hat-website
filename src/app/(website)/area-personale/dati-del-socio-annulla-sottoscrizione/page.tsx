export default function MemberDataPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">I Tuoi Dati</h1>
        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Dati Personali</h2>
            <div className="space-y-4">{/* Personal information form */}</div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Gestione Sottoscrizione</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Qui puoi gestire la tua sottoscrizione e le preferenze di
                comunicazione
              </p>
              {/* Subscription management options */}
            </div>
          </div>

          <div className="rounded-lg border-red-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Annulla Sottoscrizione
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Se desideri annullare la tua sottoscrizione, per favore leggi
                attentamente le seguenti informazioni
              </p>
              {/* Cancellation form and warnings */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
