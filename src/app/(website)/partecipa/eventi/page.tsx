import { sanityClient } from "@/sanity/lib/client";

export default async function EventsPage() {
  const events = await sanityClient.fetch(
    `*[_type == "event"] | order(startDate desc)`,
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Eventi</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event._id} className="rounded-lg border p-6">
            <h2 className="mb-2 text-2xl font-semibold">{event.title}</h2>
            <p className="text-muted-foreground mb-4">{event.abstract}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-medium">Dove:</span> {event.location}
              </div>
              <div>
                <span className="font-medium">Quando:</span>{" "}
                {new Date(event.startDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
