export default function SingleProjectPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Nome Progetto</h1>
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="prose max-w-none">
            <p className="mb-4 text-lg">Descrizione dettagliata del progetto</p>
            <h2 className="mb-4 text-2xl font-bold">Come Contribuire</h2>
            {/* Project contribution guidelines */}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold">Repository GitHub</h3>
            {/* GitHub stats and links */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold">Maintainers</h3>
            {/* List of maintainers */}
          </div>
        </div>
      </div>
    </main>
  );
}
