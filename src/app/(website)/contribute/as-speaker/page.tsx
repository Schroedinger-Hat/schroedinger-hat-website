import { Heading } from "@/components/atoms/typography/Heading";
import { Typography } from "@/components/atoms/typography/Typography";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import FeaturesList from "@/components/organisms/features-list";
import { ImageHero } from "@/components/organisms/image-hero";
import {
  AirplaneSeatIcon,
  Mortarboard02Icon,
  Pizza01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { TeamCard } from "@/components/organisms/team-card";
import { StatBlocks } from "@/components/organisms/stat-block";
import { List } from "@/components/atoms/lists/List";
import { ListItem } from "@/components/atoms/lists/ListItem";
import { Button } from "@/components/ui/button";
import { BlackCTA } from "@/components/organisms/black-cta";
import { Link } from "@/components/atoms/links/Link";

// Images
import asSpeaker from "@/images/contribute/as_speaker.jpg";
import famouseCollina from "@/images/contribute/speaker/famous_collina.jpg";
import famouseHevery from "@/images/contribute/speaker/famous_hevery.jpg";
import famouseCorti from "@/images/contribute/speaker/famous_corti.jpg";
import famouseTerzi from "@/images/contribute/speaker/famous_terzi.jpg";

const famousSpeakers = [
  {
    name: "Matteo",
    surname: "Collina",
    role: " Node.js TSC member",
    image: {
      src: famouseCollina.src,
    },
  },
  {
    name: "Misko",
    surname: "Hevery",
    role: "Creator of Angular.js",
    image: {
      src: famouseHevery.src,
    },
  },
  {
    name: "Francesco",
    surname: "Corti",
    role: "Principal Product Manager @Docker",
    image: {
      src: famouseCorti.src,
    },
  },
  {
    name: "Federico",
    surname: "Terzi",
    role: "Software Architect @anima",
    image: {
      src: famouseTerzi.src,
    },
  },
];

export default function BecomeSpeakerPage() {
  return (
    <main className="py-24">
      <BlurredBackground
        points={3}
        colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
        blur={100}
        opacity={0.7}
        size={300}
        positioning="center"
      />

      <ImageHero
        title={
          <>
            Contribute <br /> as <br /> Speaker
          </>
        }
        imageSrc={asSpeaker.src}
        imageAlt="Speaker"
      />

      <div className="container mx-auto max-w-5xl py-16">
        <Typography variant="p" as="p">
          We are always excited to welcome passionate and knowledgeable speakers
          to our events. If you have a story to tell, insights to share, or
          skills to teach, this is your opportunity to connect with a vibrant
          and curious community of learners and professionals.
        </Typography>
        <Typography variant="p" as="p">
          We believe that great ideas are worth sharing, and your unique
          perspective can help spark meaningful discussions, new discoveries,
          and collaborative growth. Whether you’re a seasoned speaker or
          stepping onto the stage for the first time, we’re here to support you
          in creating a memorable and impactful experience.
        </Typography>
        <Typography variant="p" as="p" className="mb-0">
          To make your contributions as effective and engaging as possible, we
          offer two distinct formats for sharing your knowledge: Talks and
          Workshops. Each format is designed to cater to different styles,
          audiences, and levels of interaction, ensuring you can find the
          perfect way to connect with our community.
        </Typography>
      </div>

      <div className="container mx-auto max-w-5xl py-16 pt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-6 rounded-2xl bg-[#74B9FF] p-6 text-white">
            <Heading level={2} className="text-center text-white">
              Session
            </Heading>

            <Heading level={4} className="text-white">
              What is it?
            </Heading>
            <Typography variant="p" className="text-white opacity-90">
              A Talk is a traditional conference-style presentation, lasting 30
              to 60 minutes. It focuses on a single topic, idea, or story,
              delivered with accompanying slides to inspire the audience.
            </Typography>

            <Heading level={4} className="text-white">
              Features / Is this for you?
            </Heading>
            <List variant="bullet">
              <ListItem className="text-white">
                Ideal for sharing insights, stories, or lessons learned from
                your experiences.
              </ListItem>
              <ListItem className="text-white">
                Perfect for a wide range of topics, from personal journeys to
                deep dives into specific areas.
              </ListItem>
              <ListItem className="text-white">
                Suitable for all skill levels in the audience.
              </ListItem>
            </List>
            <Heading level={4} className="text-white">
              Why choose this?
            </Heading>
            <Typography variant="p" className="text-white opacity-90">
              Choosing a Talk allows you to share your expertise and passion in
              a structured and impactful way. It’s perfect for reaching a broad
              audience, delivering clear insights, and sparking curiosity about
              your topic.
            </Typography>
          </div>
          <div className="space-y-6 rounded-2xl bg-[#00B894] p-6 text-white">
            <Heading level={2} className="text-center text-white">
              Workshop
            </Heading>

            <Heading level={4} className="text-white">
              What is it?
            </Heading>
            <Typography variant="p" className="text-white opacity-90">
              A Workshop is an interactive session lasting 2 to 8 hours,
              designed to delve deeply into a specific topic, technology, or
              framework. Workshops emphasize hands-on learning, often guiding
              participants through a project or task, such as building an app
              together.
            </Typography>
            <Heading level={4} className="text-white">
              Features / Is this for you?
            </Heading>
            <List variant="bullet">
              <ListItem className="text-white">
                Ideal for teaching practical skills or hands-on techniques.
              </ListItem>
              <ListItem className="text-white">
                Great for in-depth exploration of a specific technology or
                methodology.
              </ListItem>
              <ListItem className="text-white">
                Best suited for a smaller, focused group of attendees.
              </ListItem>
            </List>
            <Heading level={4} className="text-white">
              Why choose this?
            </Heading>
            <Typography variant="p" className="text-white opacity-90">
              Opting for a Workshop enables you to dive deep into a subject and
              provide tangible value to attendees. With a focus on hands-on
              learning and collaboration, this format is ideal for fostering
              practical skills and creating meaningful connections with
              participants.
            </Typography>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl py-16">
        <FeaturesList
          title="What we offer"
          features={[
            {
              name: "Travel & Accommodation",
              description:
                "We will help you with travel and accommodation. We also have great restaurant suggestions.",
              icon: <AirplaneSeatIcon className="h-10 w-10" />,
            },
            {
              name: "Matching",
              description:
                "Want to share the stage? We will research other speakers and combine your talks to create a session.",
              icon: <UserMultiple02Icon className="h-10 w-10" />,
            },
            {
              name: "Coaching",
              description:
                "First talk? We will help you prepare and practice. Some of use are speakers too",
              icon: <Mortarboard02Icon className="h-10 w-10" />,
            },
            {
              name: "Bonus: Tour Guide",
              description:
                "If your talk is in Italy we will show you around, we can be excellent city guides other than conference organiser",
              icon: <Pizza01Icon className="h-10 w-10" />,
            },
          ]}
        />
      </div>

      <div className="container mx-auto max-w-7xl py-16">
        <BlackCTA
          leftContent={
            <Heading
              level={1}
              className="mb-0 font-lexend text-[80px] tracking-tight text-white"
            >
              Apply?
            </Heading>
          }
          rightContent={
            <Link
              href="mailto:event@schroedinger-hat.org"
              className="h-full max-w-48"
            >
              <Button size="lg" variant="secondary" className="h-full max-w-48">
                Propose your talk
              </Button>
            </Link>
          }
        />
      </div>

      <div className="container mx-auto max-w-7xl py-16">
        <Heading level={2}>Spoke with us</Heading>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {famousSpeakers.map((speaker, index) => (
            <TeamCard key={index} {...speaker} />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-4xl py-16">
        <Heading level={2}>Some numbers</Heading>
        <StatBlocks
          className="mx-auto py-16"
          centered={false}
          blocks={[
            {
              number: "28",
              title: "Events",
              description: "Talks and eventswe have organised",
            },
            {
              number: "100",
              title: "Speakers",
              description:
                "Industry leaders that gave a talk from one of our events stage",
            },
            {
              number: "49",
              title: "Hours of content",
              description: "Videos, podcasts, and livestreams from our events",
            },
          ]}
        />
      </div>
    </main>
  );
}
