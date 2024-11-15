export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Domande Frequenti</h1>
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Generale</h2>
            <div className="space-y-4">
              {/* FAQ items */}
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Come posso diventare membro?
                </h3>
                <p className="text-gray-600">
                  Puoi diventare membro visitando la sezione &quot;Diventa
                  Socio&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
