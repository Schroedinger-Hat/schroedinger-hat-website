import { Card, CardContent, CardHeader } from "../ui/card";
import { Image } from "../atoms/media/Image";
import { Typography } from "../atoms/typography/Typography";
import type { TeamMember } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/lib/image";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="max-w-sm overflow-hidden bg-white">
      <CardHeader className="p-0">
        <div
          className="aspect-square w-full"
          style={{ backgroundColor: member.image!.backgroundColor }}
        >
          <Image
            src={urlFor(member.image).width(300).height(300).url()}
            alt={`${member.name} ${member.surname}`}
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
            {`${member.name} ${member.surname}`}
          </Typography>
          <Typography variant="muted">{member.role}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
