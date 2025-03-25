import type { CustomProjectConfig } from "lost-pixel"

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: "/", name: "homepage" },
      { path: "/watch", name: "watch" },
      { path: "/participate/events", name: "participate-events" },
      { path: "/participate/projects", name: "participate-projects" },
      { path: "/participate/local-communities", name: "participate-local-communities" },
      { path: "/contribute/as-individual", name: "contribute--as-individual" },
      { path: "/contribute/as-speaker", name: "contribute--as-speaker" },
      { path: "/contribute/as-partner", name: "contribute--as-partner" },
      { path: "/contribute/as-sponsor", name: "contribute--as-sponsor" },
      { path: "/association/about-us", name: "association--about-us" },
      { path: "/association/join", name: "association--join" },
      { path: "/association/press-kit", name: "association--press-kit" },
      {
        path: "/watch/costa-tsaousis-netdata-open-source-distributed-observability-pipeline-journey-and-challenges",
        name: "watch--netdata-open-source",
      },
      { path: "/speaker/costa-tsaousis", name: "speaker--costa-tsaousis" },

      { path: "/participate/events/open-source-day-2024", name: "participate--events--open-source-day-2024" },
      {
        path: "/participate/events/sh-session-dev-devrel-nel-2024",
        name: "participate--events--sh-session-dev-devrel-nel-2024",
      },
    ],
    // IP should be localhost when running locally & 172.17.0.1 when running in GitHub action
    baseUrl: "http://172.17.0.1:3000",
    breakpoints: [375, 414, 768, 1024, 1280, 1440, 1920, 2560],
  },
  // OSS mode
  generateOnly: false,
  failOnDifference: true,

  lostPixelProjectId: "cm4xebtf70p3a49r7n8buzwah",
  apiKey: process.env.LOST_PIXEL_API_KEY,

  beforeScreenshot: async (page) => {
    await page.waitForSelector("body")
    await page.waitForTimeout(100)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)
  },
}
