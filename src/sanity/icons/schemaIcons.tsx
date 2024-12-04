import {
  Video01Icon,
  Calendar03Icon,
  UserIcon,
  UserMultipleIcon,
  Briefcase01Icon,
  Building02Icon,
  Notebook02Icon,
  CodeIcon,
  QuestionIcon,
  Layers02Icon,
} from "hugeicons-react";

// Create a mapping of schema type to icon component
export const schemaIcons = {
  video: Video01Icon,
  event: Calendar03Icon,
  author: UserIcon,
  teamMember: UserMultipleIcon,
  faq: QuestionIcon,
  jobPost: Briefcase01Icon,
  page: Notebook02Icon,
  partner: Building02Icon,
  project: CodeIcon,
  eventSeries: Layers02Icon,
} as const;
