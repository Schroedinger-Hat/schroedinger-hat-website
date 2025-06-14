import { HeaderWrapper } from "@/components/organisms/header/header-wrapper"
import { Footer } from "@/components/organisms/footer"

export default function WebsiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HeaderWrapper />
      {children}
      <Footer />
    </>
  )
}
