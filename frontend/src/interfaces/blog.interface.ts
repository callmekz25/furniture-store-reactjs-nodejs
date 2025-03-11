interface IBlog {
  title: string;
  thumbnail: string;
  publish: boolean;
  content: string;
  category: string;
  tags?: string[];
  slug: string;
  createdAt: Date;
}
export default IBlog;
