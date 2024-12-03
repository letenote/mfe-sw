export default [
  { title: "Inbox", url: "/folder/inbox", icon: "mail", child: [] },
  {
    title: "Outbox",
    url: "/folder/outbox",
    icon: "paper-plane",
    child: [],
  },
  {
    title: "Favorites",
    url: null,
    icon: "heart",
    child: [{ title: "Email", url: "/folder/email", icon: "warning" }],
  },
  { title: "Archived", url: "/folder/archived", icon: "archive", child: [] },
  { title: "Trash", url: "/folder/trash", icon: "trash", child: [] },
];
