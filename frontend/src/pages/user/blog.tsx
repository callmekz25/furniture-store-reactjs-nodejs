import useBlog from "@/hooks/useBlogs";
import Layout from "@/layouts/userLayout";
import { useParams } from "react-router-dom";
import "../../styles/blog.modules.css";
import formatDate from "@/utils/formatDate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
const Blog = () => {
  const { slug, category } = useParams();
  const { data, isLoading, error } = useBlog();
  console.log(data);
  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="">{children}</p>,
      [BLOCKS.HEADING_3]: (node, children) => (
        <h2 className="text-2xl my-2 font-bold text-red-700">{children}</h2>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl font-bold">{children}</h2>
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const imageId = node.data.target.sys.id;
        const asset = data[0]?.assets?.find((a) => a.sys.id === imageId);
        console.log(data?.assets);

        if (!asset) return <p>Hình ảnh không tồn tại</p>;

        const imageUrl = asset.fields.file.url;
        return (
          <div className="flex items-center justify-center">
            <img
              src={imageUrl}
              alt={asset.fields.title}
              className="my-4 w-full max-w-[600px] object-cover"
            />
          </div>
        );
      },
    },
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout>
      <main className="break-point py-[30px]">
        <div className="flex flex-wrap ">
          <div className="lg:flex-[0_0_75%] lg:max-w-[75%] px-4 flex-[0_0_100%] max-w-[100%]">
            <div className="bg-white px-4 py-5">
              <h1 className="mb-[10px]">{data[0]?.title}</h1>
              <h5 className="text-[13px] mb-2.5 font-normal text-gray-500">
                {data[0]?.createdAt ? formatDate(data[0]?.createdAt) : ""}
              </h5>
              <div className="mb-[30px]">
                <img
                  src={data[0]?.thumbnailUrl}
                  alt={data[0]?.title}
                  className="max-w-full object-contain"
                />
              </div>
              {/* <div
                id="content"
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              /> */}
              {data[0]?.content ? (
                <div>
                  {documentToReactComponents(data[0].content, renderOptions)}
                </div>
              ) : (
                <p>Loading content...</p>
              )}
            </div>
          </div>
          <div className="lg:flex-[0_0_25%] lg:max-w-[25%] px-4 flex-[0_0_100%] mt-4 lg:mt-0 max-w-[100%]">
            <div className="bg-white px-4 py-5 lg:sticky lg:top-[20px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
              dicta ullam possimus corrupti laudantium necessitatibus, ex, animi
              minima eligendi dolore ipsam modi tempora rem voluptatum suscipit
              perferendis quas, impedit iste? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur error culpa dolores
              distinctio laborum eaque voluptatibus ad maiores. Alias impedit
              assumenda facere cumque adipisci dolorem labore optio deleniti
              vitae pariatur. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Nemo consectetur iusto nostrum in qui veniam
              placeat eveniet sint eos blanditiis, autem odit mollitia tempore
              consequatur temporibus fuga voluptatem? Praesentium, nulla!
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
