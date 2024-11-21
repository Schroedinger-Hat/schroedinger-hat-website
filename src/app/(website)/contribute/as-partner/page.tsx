export default function BecomePartnerPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Diventa Partner</h1>
        <div className="prose mb-8 max-w-none">
          <p className="text-lg">
            Scopri i vantaggi di una partnership con la nostra associazione
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">
              Benefici della Partnership
            </h2>
            {/* Benefits list */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Come Diventare Partner</h2>
            {/* Partnership process */}
          </div>
        </div>
      </div>
    </main>
  );
}
