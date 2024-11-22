import { Heading } from "../atoms/typography/Heading";
import { Typography } from "../atoms/typography/Typography";

interface FeatureCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureCard({
  name,
  description,
  icon: icon,
}: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg p-4">
      <div>{icon}</div>
      <div>
        <Heading level={4} className="mb-0">
          {name}
        </Heading>
        <Typography variant="medium">{description}</Typography>
      </div>
    </div>
  );
}

interface FeaturesListProps {
  title: string;
  features: FeatureCardProps[];
}

export default function FeaturesList({ title, features }: FeaturesListProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Heading level={2} className="text-center">
        {title}
      </Heading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <FeatureCard key={feature.name} {...feature} />
        ))}
      </div>
    </div>
  );
}
