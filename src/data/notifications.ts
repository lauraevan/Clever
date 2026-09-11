import type { PortalNotification } from "./types";

export const notifications: PortalNotification[] = [
  {
    id: "classroom-assignment",
    title: "New assignment in Google Classroom",
    body: "Mrs. Johnson posted “Novel Study: Chapters 9–12” in English Language Arts.",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: "badge-reminder",
    title: "Your Clever Badge is ready",
    body: "Print your badge to log in without typing a password.",
    timestamp: "Yesterday",
    unread: true,
  },
  {
    id: "new-app",
    title: "Desmos was added to your portal",
    body: "Demo Unified School District shared a new application with 7th grade.",
    timestamp: "3 days ago",
    unread: false,
  },
];
