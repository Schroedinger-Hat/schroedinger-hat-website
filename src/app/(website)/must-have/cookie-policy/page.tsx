export default function CookiePolicyPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Cookie Policy</h1>
        <div className="prose max-w-none">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Cosa sono i cookie?</h2>
            <p className="mb-4 text-gray-600">
              I cookie sono piccoli file di testo che i siti visitati inviano al
              terminale dell&apos;utente
            </p>
            {/* Cookie explanation content */}
          </div>

          <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">I nostri cookie</h2>
            {/* Cookie types and purposes */}
          </div>
        </div>
      </div>
    </main>
  );
}
