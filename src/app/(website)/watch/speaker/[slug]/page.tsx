export default function SpeakerPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/3">
            <div className="mb-4 aspect-square rounded-full bg-gray-200">
              {/* Speaker image will go here */}
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="mb-4 text-4xl font-bold">Nome Speaker</h1>
            <div className="prose max-w-none">
              {/* Speaker bio and information */}
            </div>
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold">Video del Speaker</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Grid of speaker's videos */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
