import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { Heading } from "@/components/atoms/typography/Heading";
import { ThreeScene } from "./component/scene";

export default function Ticket() {
  return (
    <SectionContainer>
      <Heading level={1}>Ticket</Heading>
      <ThreeScene />
    </SectionContainer>
  );
}
