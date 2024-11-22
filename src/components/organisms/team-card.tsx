import { Card, CardContent, CardHeader } from "../ui/card";
import { Image } from "../atoms/media/Image";
import { Typography } from "../atoms/typography/Typography";
import { type TeamMember } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface TeamCardProps {
  name: string;
  surname: string;
  role: string;
  image: {
    src: string;
    alt?: string;
    backgroundColor?: string;
  };
}

export function TeamCard({ name, surname, role, image }: TeamCardProps) {
  return (
    <Card className="max-w-sm overflow-hidden bg-white">
      <CardHeader className="p-0">
        <div
          className="aspect-square w-full"
          style={{ backgroundColor: image.backgroundColor }}
        >
          <Image
            src={image.src}
            alt={image.alt ?? `${name} ${surname}`}
            width={300}
            height={300}
            className="h-full w-full object-cover"
            withContainer={false}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Typography variant="h3" weight="semibold">
            {`${name} ${surname}`}
          </Typography>
          <Typography variant="muted">{role}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
  if (!member.image?.asset || !member.name || !member.surname || !member.role) {
    return null;
  }

  return (
    <TeamCard
      name={member.name}
      surname={member.surname}
      role={member.role}
      image={{
        src: urlFor(member.image).width(300).height(300).url(),
        backgroundColor: member.image.backgroundColor,
      }}
    />
  );
}
