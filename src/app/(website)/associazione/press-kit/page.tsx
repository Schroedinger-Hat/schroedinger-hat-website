export default function PressKitPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Press Kit</h1>
        <div className="prose mb-8 max-w-none">
          <p className="text-lg">Risorse per la stampa e i media</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Logo e Brand Assets</h2>
            {/* Downloadable assets */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Media Kit</h2>
            {/* Media resources */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Contatti per la Stampa</h2>
            {/* Press contacts */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Comunicati Stampa</h2>
            {/* Press releases */}
          </div>
        </div>
      </div>
    </main>
  );
}
