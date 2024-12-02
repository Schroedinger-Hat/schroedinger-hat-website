export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}
