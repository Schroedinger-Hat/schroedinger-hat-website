export default function AdministrativeDataPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Dati Amministrativi</h1>
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Informazioni Legali</h2>
            {/* Legal information */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Bilanci</h2>
            {/* Financial statements */}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Organi Direttivi</h2>
            {/* Board members and roles */}
          </div>
        </div>
      </div>
    </main>
  );
}
