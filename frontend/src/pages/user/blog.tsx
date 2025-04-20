import useBlogByCategoryAndSlug from "@/hooks/blog/useBlogByCategoryAndSlug";
import Layout from "@/layouts/userLayout";
import { useParams } from "react-router-dom";

import formatDate from "@/utils/formatDate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Node } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import Loading from "@/components/loading/loading";
const Blog = () => {
  const { slug, category } = useParams();
  const { data, isLoading, error } = useBlogByCategoryAndSlug(slug, category);

  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
        <p className="text-[16px] font-normal">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => (
        <h2 className="text-[22px] my-2 font-bold text-red-700">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => (
        <h3 className="text-[20px] my-2 font-bold text-red-700">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: Node, children: React.ReactNode) => (
        <h4 className="text-lg my-2 font-bold text-red-700">{children}</h4>
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const imageId = node.data.target.sys.id;
        const asset = data?.assets?.find((a: object) => a.sys.id === imageId);

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

  if (error) {
    return <p>Lỗi</p>;
  }

  return (
    <main className="break-point py-[30px]">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap ">
          <div className="lg:flex-[0_0_75%] bg-white lg:max-w-[75%] px-4 flex-[0_0_100%] max-w-[100%]">
            <div className=" px-16 py-5 mx-auto">
              <h1 className="mb-[10px] text-2xl text-red-700 font-bold">
                {data.title}
              </h1>
              <h5 className="text-[13px] mb-2.5 font-normal text-gray-500">
                {data.createdAt ? formatDate(data.createdAt) : ""}
              </h5>
              <div className="mb-[30px]">
                <img
                  src={data.thumbnailUrl}
                  alt={data.title}
                  className="max-w-full object-contain"
                />
              </div>
              <p className="text-[15px] font-normal">{data.description}</p>
              {data.content ? (
                <div>
                  {documentToReactComponents(data.content, renderOptions)}
                </div>
              ) : (
                <p>Loading content...</p>
              )}
              <div className="flex items-center gap-1 mt-7">
                {data?.tag && data.tag.length > 0 ? (
                  <>
                    <span className="font-bold">Tags: </span>
                    {data.tag.map((tag: string) => (
                      <span key={tag} className="color-red font-medium">
                        {tag}
                      </span>
                    ))}
                  </>
                ) : (
                  "k"
                )}
              </div>
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
      )}
    </main>
  );
};

export default Blog;
