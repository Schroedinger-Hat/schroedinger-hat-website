import { Dribbble, Instagram, Facebook } from "lucide-react";
import { Link } from "../atoms/links/Link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Image } from "../atoms/media/Image";
import { type SanityImageType } from "@/types/sanity";

interface TeamCardProps {
  name: string;
  surname: string;
  role: string;
  image: SanityImageType;
  socialLinks?: {
    dribbble?: string;
    instagram?: string;
    facebook?: string;
  };
}

export function TeamCard({
  name,
  surname,
  role,
  image,
  socialLinks,
}: TeamCardProps) {
  return (
    <Card className="max-w-sm overflow-hidden bg-white">
      <CardHeader className="p-0">
        <Image
          src={image.url}
          alt={`${name} ${surname}`}
          width={400}
          height={400}
          className="w-full object-cover"
        />
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{`${name} ${surname}`}</h2>
          <p className="text-lg text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
