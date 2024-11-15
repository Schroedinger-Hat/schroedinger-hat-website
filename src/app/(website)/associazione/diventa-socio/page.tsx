export default function BecomeMemberPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Diventa Socio</h1>
        <div className="prose mb-8 max-w-none">
          <p className="text-lg">
            Unisciti all'associazione e diventa parte attiva della nostra
            community
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Benefici</h2>
            <ul className="space-y-3">{/* List of member benefits */}</ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Quote Associative</h2>
            {/* Membership fees and options */}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Processo di Iscrizione</h2>
          {/* Membership application form or process */}
        </div>
      </div>
    </main>
  );
}
