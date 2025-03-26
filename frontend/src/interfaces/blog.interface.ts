interface IBlog {
  title: string;
  thumbnailUrl: string;
  publish: boolean;
  categorySlug: string;
  content: object;
  category: string;
  tag?: string[];
  slug: string;
  createdAt: Date;
  assets: object[];
  description: string;
}
export default IBlog;
