export default function SitemapPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Sitemap</h1>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Mappa del Sito</h2>
            <ul className="space-y-2">
              {/* Sitemap structure */}
              <li>
                <span className="font-semibold">Home</span>
                <ul className="ml-4 mt-2">{/* Nested sitemap items */}</ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
