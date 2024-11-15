export default function NewsletterPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Gestione Newsletter</h1>
        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Le tue Preferenze</h2>
            <div className="space-y-4">
              {/* Newsletter preferences form */}
              <div className="flex items-center gap-3">
                <input type="checkbox" id="events" className="h-4 w-4" />
                <label htmlFor="events" className="text-lg">
                  Eventi e Meetup
                </label>
              </div>
              {/* More newsletter options */}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Archivio Newsletter</h2>
            <div className="space-y-4">{/* Newsletter archive list */}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
