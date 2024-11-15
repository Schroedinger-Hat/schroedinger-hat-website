type Props = {
  params: {
    id: string;
  };
};

export default function SingleVideoPage({ params }: Props) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 aspect-video bg-gray-200">
          {/* Video player component will go here */}
        </div>
        <h1 className="mb-4 text-4xl font-bold">Titolo del Video</h1>
        <div className="prose max-w-none">
          {/* Video description and metadata */}
        </div>
      </div>
    </main>
  );
}
