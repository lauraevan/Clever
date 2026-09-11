import type { PortalNotification } from "./types";

export const notifications: PortalNotification[] = [
  {
    id: "classroom-assignment",
    title: "New assignment in Google Classroom",
    body: "Ms. Mangan posted “Ecosystems Vocabulary — due Friday” in 5th Grade.",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: "ixl-goal",
    title: "You met your IXL goal",
    body: "30 skills practiced this week. Ms. Mangan can see your progress.",
    timestamp: "Yesterday",
    unread: true,
  },
  {
    id: "badge-reminder",
    title: "Your Clever Badge is ready",
    body: "Print your badge to log in without typing a password.",
    timestamp: "2 days ago",
    unread: true,
  },
  {
    id: "new-app",
    title: "Mystery Science was added to your portal",
    body: "Lincoln Unified School District shared a new application with 5th grade.",
    timestamp: "4 days ago",
    unread: false,
  },
  {
    id: "library-due",
    title: "Library book due soon",
    body: "“Hatchet” is due back to the Library Media Center on Thursday.",
    timestamp: "Last week",
    unread: false,
  },
];
