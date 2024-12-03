export default interface MenuSidebarInterface {
  title: string;
  url: string | null;
  icon: string;
  child: Array<{
    title: string;
    url: string | null;
    icon: string;
  }>;
}
