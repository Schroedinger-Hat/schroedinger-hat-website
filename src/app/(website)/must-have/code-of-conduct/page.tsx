export default function CodeOfConductPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Codice di Condotta</h1>
        <div className="prose max-w-none">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Il Nostro Impegno</h2>
            <p className="mb-4 text-gray-600">
              Nell&apos;interesse di promuovere un ambiente aperto e
              accogliente, ci impegniamo a rendere la partecipazione alla nostra
              community un&apos;esperienza libera da molestie per tutti
            </p>
            {/* Code of conduct content */}
          </div>
        </div>
      </div>
    </main>
  );
}
