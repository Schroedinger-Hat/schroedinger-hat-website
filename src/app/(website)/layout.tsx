import { Header } from "@/components/organisms/header/header"
import { Footer } from "@/components/organisms/footer"

export default function WebsiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
