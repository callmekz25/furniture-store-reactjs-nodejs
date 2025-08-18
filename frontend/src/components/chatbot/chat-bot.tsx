import { useSendMessage } from "@/hooks/use-chatbot";
import IMessage from "@/interfaces/chat/message.interface";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BotMessageSquareIcon, Loader2, SendHorizonalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TypingLoading from "../loading/typing-loading";
import getProductImages from "@/utils/get-images";
import getPrice from "@/utils/get-price";
import formatPriceToVND from "@/utils/format-price";
import IProduct from "@/interfaces/product/product.interface";
import getFinalPrice from "@/utils/get-final-price";
import { RECOMMEND_PROMPT } from "@/constants/recommend-prompt";

const ChatBot = () => {
  const [askChatbot, setAskChatbot] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: send } = useSendMessage();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [historyChat, setHistoryChat] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const chats = sessionStorage.getItem("chat");
    if (chats) {
      setHistoryChat(JSON.parse(chats));
    } else {
      const welcomeMessage: IMessage = {
        role: "model",
        message: {
          text: "Xin chào Anh/Chị! Em là trợ lý AI của Baya. Em rất sẵn lòng hỗ trợ Anh/Chị ",
          products: [],
        },
      };
      setHistoryChat([welcomeMessage]);
      sessionStorage.setItem("chat", JSON.stringify([welcomeMessage]));
    }
  }, []);

  useEffect(() => {
    if (messageEndRef) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [historyChat]);

  const handleSendMessage = async (recommendMessage?: string) => {
    const currentMessage = (recommendMessage ?? message).trim();
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: IMessage = {
      role: "user",
      message: { text: currentMessage },
    };

    setHistoryChat((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setMessage("");

    send(currentMessage, {
      onSuccess: (data: IMessage[]) => {
        const filterUserMessage = data?.filter((m) => m.role !== "user");
        setHistoryChat((prev) => [...prev, ...filterUserMessage]);
        sessionStorage.setItem(
          "chat",
          JSON.stringify([...historyChat, ...data])
        );
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);

        const errorMessage: IMessage = {
          role: "model",
          message: {
            text: "Xin lỗi Anh/Chị, có lỗi xảy ra. Vui lòng thử lại sau.",
            products: [],
          },
        };
        setHistoryChat((prev) => [...prev, errorMessage]);
      },
    });
  };
  const renderProducts = (products: IProduct[] | undefined) => {
    if (!products || products.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        <div className="text-xs text-gray-500 font-medium">Sản phẩm gợi ý:</div>
        {products.map((product, index) => (
          <Link
            onClick={() => setAskChatbot(false)}
            to={`/products/${product.slug}`}
            key={`${product.sku}-${index}`}
            className="flex flex-col gap-1 mt-2"
          >
            <img
              src={getProductImages(product, true) as string}
              alt={product.title}
              className="w-full max-w-full min-w-full object-contain"
            />
            <span className="font-semibold line-clamp-2">{product.title}</span>
            {product.promotion ? (
              <p className="flex items-center gap-2">
                <span className="text-[15px] font-bold">
                  {formatPriceToVND(getFinalPrice(product))}
                </span>
                <span className="text-[13px] font-medium text-gray-400 line-through">
                  {formatPriceToVND(getPrice(product))}
                </span>
              </p>
            ) : (
              <span className="text-[15px] font-bold">
                {formatPriceToVND(getPrice(product))}
              </span>
            )}
            {product.descr && (
              <div
                className="whitespace-pre-wrap line-clamp-4 text-sm"
                dangerouslySetInnerHTML={{ __html: product.descr }}
              />
            )}
          </Link>
        ))}
      </div>
    );
  };
  return (
    <div className="fixed  lg:right-4 right-2 bottom-4 z-50">
      <button
        onClick={() => {
          setAskChatbot(true);
          setTimeout(() => {
            inputRef?.current?.focus();
          }, 200);
        }}
        className={`lg:size-14 size-12 rounded-full flex transition-all duration-500 hover:scale-110 bg-[#c4123f]  items-center mb-20 justify-center ${
          !askChatbot
            ? " translate-y-0 opacity-100"
            : " opacity-0 translate-y-full"
        }`}
      >
        <BotMessageSquareIcon className="text-white lg:size-7 size-6" />
      </button>
      <div
        className={` absolute lg:right-0 md:right-0 -right-2 -bottom-4 lg:bottom-0 md:bottom-0 rounded-md transition-all ease-linear duration-300 overflow-hidden flex flex-col   border shadow-xl border-gray-300 bg-white lg:min-w-[450px] lg:max-w-[450px] md:min-w-[500px] md:max-w-[500px] w-[100vw] max-w-[100vw] lg:h-[90vh] md:h-[90vh] h-[100dvh] ${
          askChatbot
            ? " translate-y-0 opacity-100 pointer-events-auto    "
            : " translate-y-full  opacity-0 pointer-events-none  "
        }`}
      >
        <div className="px-4 border-b bg-[#c4123f] text-white  py-3 flex items-center justify-between flex-shrink-0">
          <span className=" font-bold text-lg">Baya - Trợ lý AI </span>
          <button onClick={() => setAskChatbot(false)}>
            <XMarkIcon className=" size-6" />
          </button>
        </div>
        <div className="pl-4 pr-2  py-6 flex-1   overflow-y-auto relative">
          {historyChat?.length < 2 && (
            <div className="flex flex-col gap-3  items-end absolute right-2 bottom-0 mb-8">
              {RECOMMEND_PROMPT.map((rc) => {
                return (
                  <button
                    key={rc.title}
                    onClick={() => {
                      setMessage(rc.title);
                      handleSendMessage(rc.title);
                    }}
                    className="py-1.5 text-sm w-fit px-3 border  transition-all duration-200 hover:border-[#c4123f] hover:bg-[#c4123f] hover:text-white border-black rounded-2xl"
                  >
                    {rc.title}
                  </button>
                );
              })}
            </div>
          )}
          {historyChat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-1 mb-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "model" && (
                <div className="size-10 bg-[#c4123f] rounded-full flex-shrink-0 flex items-center justify-center">
                  <BotMessageSquareIcon className="text-white size-5" />
                </div>
              )}

              <div
                className={`text-sm px-3 py-3 rounded-lg break-words max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-[#c4123f] text-white"
                    : "bg-[#F3F4F6] text-black"
                }`}
              >
                <p className="font-medium">{msg.message.text}</p>

                {renderProducts(msg.message.products)}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 mb-4 justify-start">
              <div className="size-10 bg-[#c4123f] rounded-full flex-shrink-0 flex items-center justify-center">
                <BotMessageSquareIcon className="text-white size-5" />
              </div>
              <div className="text-sm flex items-center justify-center px-1 py-2 rounded-lg bg-gray-100 text-black">
                <TypingLoading />
              </div>
            </div>
          )}
          <div ref={messageEndRef}></div>
        </div>
        <div className="relative flex items-center flex-shrink-0 px-4 mb-2 ">
          <input
            type="text"
            ref={inputRef}
            placeholder="Nhập tin nhắn..."
            disabled={isLoading}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className=" w-full  outline-none border rounded-lg  border-gray-300 pl-2.5 pr-8 lg:py-1.5 py-2"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading}
            className=" absolute flex rounded-full  items-center justify-center right-6 top-[50%] -translate-y-1/2"
          >
            {isLoading ? (
              <Loader2 className=" animate-spin size-5 text-[#c4123f]" />
            ) : (
              <SendHorizonalIcon className="size-5 text-[#c4123f]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
