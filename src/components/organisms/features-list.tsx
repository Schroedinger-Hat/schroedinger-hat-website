import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Heading } from "../atoms/typography/Heading";

interface AppCardProps {
  name: string;
  description: string;
  type: string;
  typeColor: string;
  iconUrl: string;
}

export function AppCard({
  name,
  description,
  type,
  typeColor,
  iconUrl,
}: AppCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg p-4">
      <Image
        src={iconUrl}
        alt={name}
        width={48}
        height={48}
        className="rounded-md"
      />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Badge className={`mt-2 ${typeColor}`}>{type}</Badge>
      </div>
    </div>
  );
}
export default function FeaturesList() {
  const apps = [
    {
      name: "Zeplin",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui the officia mollit aliquip ex ea comm.",
      type: "Plugin",
      typeColor: "bg-blue-100 text-blue-800",
      iconUrl: "https://placehold.co/96x96",
    },
    {
      name: "Figma",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui the officia mollit aliquip ex ea comm.",
      type: "Integration",
      typeColor: "bg-green-100 text-green-800",
      iconUrl: "https://placehold.co/96x96",
    },
    {
      name: "Vue",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui the officia mollit aliquip ex ea comm.",
      type: "Framework",
      typeColor: "bg-orange-100 text-orange-800",
      iconUrl: "https://placehold.co/96x96",
    },
    {
      name: "Meta",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui the officia mollit aliquip ex ea comm.",
      type: "Plugin",
      typeColor: "bg-blue-100 text-blue-800",
      iconUrl: "https://placehold.co/96x96",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <Heading level={2} className="text-center">
        Connect with your favorite apps
      </Heading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.name} {...app} />
        ))}
      </div>
    </div>
  );
}
