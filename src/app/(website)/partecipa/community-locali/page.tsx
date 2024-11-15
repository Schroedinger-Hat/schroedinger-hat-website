export default function LocalCommunitiesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Community Locali</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Community cards will go here */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Nome Community</h2>
          <p className="mb-4 text-gray-600">
            Descrizione della community locale e delle sue attività
          </p>
          <div className="flex items-center gap-4">
            {/* Social links and contact info */}
          </div>
        </div>
      </div>
    </main>
  );
}
