import useBlog from "@/hooks/useBlogByCategoryAndSlug";
import Layout from "@/layouts/userLayout";
import { useParams } from "react-router-dom";
import "../../styles/blog.modules.css";
import formatDate from "@/utils/formatDate";
const Blog = () => {
  const { slug, category } = useParams();
  const { data, isLoading, error } = useBlog(slug, category);
  console.log(data);

  return (
    <Layout>
      <main className="break-point py-[30px]">
        <div className="flex flex-wrap ">
          <div className="lg:flex-[0_0_75%] lg:max-w-[75%] px-4 flex-[0_0_100%] max-w-[100%]">
            <div className="bg-white px-4 py-5">
              <h1 className="mb-[10px]">{data?.title}</h1>
              <h5 className="text-[13px] mb-2.5 font-normal text-gray-500">
                {data?.createdAt ? formatDate(data.createdAt) : ""}
              </h5>
              <div className="mb-[30px]">
                <img
                  src={data?.thumbnail}
                  alt={data?.title}
                  className="max-w-full object-contain"
                />
              </div>
              <div
                id="content"
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              />
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
