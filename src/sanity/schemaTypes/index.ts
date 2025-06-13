import { eventType } from "./eventType"
import { partnerType } from "./partnerType"
import { pageType } from "./pageType"
import { videoType } from "./videoType"
import { authorType } from "./authorType"
import { teamMemberType } from "./teamMemberType"
import { faqType } from "./faqType"
import { projectType } from "./projectType"
import { jobPostType } from "./jobPostType"
import { eventSeriesType } from "./eventSeriesType"
import { blogPostType } from "./blogPostType"
import { eventCodeType } from "./eventCodeType"

export const schema = {
  types: [
    authorType,
    blogPostType,
    eventCodeType,
    eventSeriesType,
    eventType,
    faqType,
    jobPostType,
    pageType,
    partnerType,
    projectType,
    teamMemberType,
    videoType,
  ],
}
