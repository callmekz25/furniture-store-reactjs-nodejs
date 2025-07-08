import { ChevronDown, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { memo, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [toggleFooter, setToggleFooter] = useState({
    address: false,
    about: false,
    support: false,
    policy: false,
  });
  return (
    <footer className="bg-white  ">
      <div className="py-5 border-y border-gray-200 break-point">
        <div className="px-[15px]">
          <div className="flex justify-between py-[10px]">
            <div className="flex items-center flex-wrap lg:flex-nowrap ">
              <div className="pb-2.5 lg:w-auto w-full">
                <h3 className="lg:pr-5 text-[20px] font-bold lg:text-start text-center">
                  Đăng ký nhận tin
                </h3>
              </div>
              <div className="flex items-center flex-wrap">
                <input
                  type="text"
                  placeholder="Nhập email của bạn"
                  className="border-2 border-gray-200 mb-2 lg:mb-0 lg:min-w-[290px] lg:w-auto w-full rounded-full outline-none pl-5 pr-10 text-[13px] py-[9px] h-10"
                />
                <div className="lg:w-auto w-full">
                  <button className="px-[35px] w-full py-[9px] lg:ml-5 ml-0 whitespace-nowrap rounded-full font-bold bg-red-700 text-white text-sm uppercase h-10">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-7.5">
        <div className="break-point px-[15px] mx-auto w-full">
          <div className="mx-[-15px] flex flex-wrap">
            <div className="lg:flex-[0_0_25%] lg:max-w-[25%] overflow-hidden flex-[0_0_100%] max-w-[100%] px-[15px] w-full">
              <div className="flex items-center justify-between pb-3 py-[15px] lg:border-none border-b border-gray  border-dashed">
                <h4 className="font-bold text-lg">Địa chỉ</h4>
                <button
                  className="lg:hidden block"
                  onClick={() => {
                    setToggleFooter((prev) => {
                      return {
                        ...prev,
                        address: !toggleFooter.address,
                      };
                    });
                  }}
                >
                  <ChevronDown
                    className={`size-6 text-black transition-all duration-300 ${
                      toggleFooter.address ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
              <div
                className={`transition-all pt-2.5 pb-5 duration-500 ease-in-out overflow-hidden ${
                  toggleFooter.address
                    ? "max-h-[500px] opacity-100 lg:max-h-max"
                    : "max-h-0 opacity-0 lg:opacity-100  lg:max-h-max"
                }`}
              >
                <div className=" text-sm w-full flex-[0_0_100%] max-w-[100%] ">
                  <p className="mb-2">
                    VNest - Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Commodi suscipit earum nisi, harum quod cumque
                    excepturi quas maiores obcaecati laudantium numquam unde
                    nihil.
                  </p>
                  <ul>
                    <li className="text-sm leading-relaxed mb-2">
                      <span className="inline-flex items-start align-top">
                        <MapPinIcon className="size-7  pr-2.5 shrink-0" />
                      </span>
                      <span>
                        VNest Nha Trang: Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Eligendi minus exercitationem debitis
                        pariatur tempore cum. Molestiae, maxime. Thời gian hoạt
                        động: 9h00 - 21h00
                      </span>
                    </li>

                    <li className="mb-2 flex items-center">
                      <PhoneIcon className="size-7 pr-2.5 shrink-0" />
                      1900 22 63 78
                    </li>
                    <li className="mb-2 flex items-center">
                      <MailIcon className=" size-7 pr-2.5 shrink-0 " />
                      nguyenhongkhanhvinh2511@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:flex-[0_0_25%] overflow-hidden lg:max-w-[25%] flex-[0_0_100%] max-w-[100%] px-[15px] w-full">
              <div className="flex items-center justify-between pb-3 py-[15px] lg:border-none border-b border-gray  border-dashed">
                <h4 className="font-bold text-lg ">Về VNest</h4>
                <button
                  className="lg:hidden block"
                  onClick={() => {
                    setToggleFooter((prev) => {
                      return {
                        ...prev,
                        about: !toggleFooter.about,
                      };
                    });
                  }}
                >
                  <ChevronDown
                    className={`size-6 text-black transition-all duration-300 ${
                      toggleFooter.about ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>

              <div
                className={`transition-all pt-2.5 pb-5 duration-500 ease-in-out overflow-hidden ${
                  toggleFooter.about
                    ? "max-h-[500px] opacity-100 lg:max-h-max"
                    : "max-h-0 opacity-0 lg:opacity-100  lg:max-h-max"
                }`}
              >
                <ul className="text-sm list-disc list-inside">
                  <li className=" mb-2">
                    <Link to={""}>Giới thiệu</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Liên hệ</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Blog</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Hệ thống cửa hàng</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:flex-[0_0_25%] lg:max-w-[25%] flex-[0_0_100%] max-w-[100%] px-[15px] w-full">
              <div className="flex items-center justify-between pb-3 py-[15px] lg:border-none border-b border-gray  border-dashed">
                <h4 className="font-bold text-lg ">Hỗ trợ khách hàng</h4>
                <button
                  className="lg:hidden block"
                  onClick={() => {
                    setToggleFooter((prev) => {
                      return {
                        ...prev,
                        support: !toggleFooter.support,
                      };
                    });
                  }}
                >
                  <ChevronDown
                    className={`size-6 text-black transition-all duration-300 ${
                      toggleFooter.support ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
              <div
                className={`transition-all pt-2.5 pb-5 duration-500 ease-in-out overflow-hidden ${
                  toggleFooter.support
                    ? "max-h-[500px] opacity-100 lg:max-h-max"
                    : "max-h-0 opacity-0 lg:opacity-100  lg:max-h-max"
                }`}
              >
                <ul className="text-sm list-disc list-inside">
                  <li className=" mb-2">
                    <Link to={""}>Câu hỏi thường gặp</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Hướng dẫn đặt hàng</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Mua hàng trả góp</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Hướng dẫn thanh toán MOMO</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:flex-[0_0_25%] lg:max-w-[25%] flex-[0_0_100%] max-w-[100%] px-[15px] w-full">
              <div className="flex items-center justify-between pb-3 lg:border-none py-[15px] border-b border-gray  border-dashed">
                <h4 className="font-bold text-lg ">Chính sách</h4>
                <button
                  className="lg:hidden block"
                  onClick={() => {
                    setToggleFooter((prev) => {
                      return {
                        ...prev,
                        policy: !toggleFooter.policy,
                      };
                    });
                  }}
                >
                  <ChevronDown
                    className={`size-6 text-black transition-all duration-300 ${
                      toggleFooter.policy ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
              <div
                className={`transition-all pt-2.5 pb-5 duration-500 ease-in-out overflow-hidden ${
                  toggleFooter.policy
                    ? "max-h-[500px] opacity-100 lg:max-h-max"
                    : "max-h-0 opacity-0 lg:opacity-100  lg:max-h-max"
                }`}
              >
                <ul className="text-sm list-disc list-inside">
                  <li className=" mb-2">
                    <Link to={""}>Chính sách bảo hành</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Chi phí vận chuyển</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Chính sách đổi trả và hoàn tiền</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Chính sách vận chuyển và giao nhận</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Các hình thức thanh toán</Link>
                  </li>
                  <li className=" mb-2">
                    <Link to={""}>Chính sách bảo mật thông tin</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[15px] border-y border-gray-200 text-sm text-gray-500 bg-[#f2f8fd] text-center">
        &copy; Nguyễn Hồng Khánh Vinh<sup>®</sup>. All rights reserved.
      </div>
    </footer>
  );
};
export default memo(Footer);
