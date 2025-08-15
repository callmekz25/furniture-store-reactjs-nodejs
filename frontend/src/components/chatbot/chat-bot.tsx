import { useSendMessage } from "@/hooks/use-chatbot";
import IMessage from "@/interfaces/chat/message.interface";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  BotMessageSquareIcon,
  SendHorizonalIcon,
  UserRoundIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TypingLoading from "../loading/typing-loading";
import getProductImages from "@/utils/get-images";
import getPrice from "@/utils/get-price";
import formatPriceToVND from "@/utils/format-price";
import IProduct from "@/interfaces/product/product.interface";
import getFinalPrice from "@/utils/get-final-price";

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
          text: "Xin chào! Mình có thể giúp gì cho bạn hôm nay?",
          products: [],
        },

        createdAt: new Date().toISOString(),
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

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage: IMessage = {
      role: "user",
      message: { text: message },
      createdAt: new Date().toISOString(),
    };

    setHistoryChat((prev) => [...prev, userMessage]);
    setIsLoading(true);
    const currentMessage = message;
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
      onError: (error) => {
        setIsLoading(false);

        const errorMessage: IMessage = {
          role: "model",
          message: {
            text: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
            products: [],
          },
          createdAt: new Date().toISOString(),
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
    <div className="fixed right-3 bottom-16 lg:bottom-10 z-20">
      <button
        onClick={() => {
          setAskChatbot(true);
          setTimeout(() => {
            inputRef?.current?.focus();
          }, 200);
        }}
        className={`lg:size-14 size-12 rounded-full transition-all duration-300 hover:scale-110 bg-[#c4123f]  items-center justify-center ${
          askChatbot ? "hidden" : "flex"
        }`}
      >
        <BotMessageSquareIcon className="text-white lg:size-7 size-6" />
      </button>
      <div
        className={`rounded-md transition-all ease-linear duration-300 overflow-hidden   border shadow-xl border-gray-200 bg-white lg:min-w-[370px] lg:max-w-[370px] w-[85vw] max-w-[85vw] ${
          askChatbot
            ? "scale-100 opacity-100 pointer-events-auto  visible relative "
            : "scale-0  opacity-0 pointer-events-none absolute invisible"
        }`}
      >
        <div className="px-4 border-b bg-gray-100 border-gray-200 py-3 flex items-center justify-between">
          <span>ChatBot</span>
          <button onClick={() => setAskChatbot(false)}>
            <XMarkIcon className="text-black size-5" />
          </button>
        </div>
        <div className="pl-4  py-6 lg:max-h-[350px] max-h-[50vh] min-h-[50vh] overflow-y-auto">
          {historyChat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 mb-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "model" && (
                <div className="size-10 bg-[#c4123f] rounded-full flex-shrink-0 flex items-center justify-center">
                  <BotMessageSquareIcon className="text-white size-5" />
                </div>
              )}

              <div
                className={`text-sm px-3 py-2 rounded-lg break-words max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <p className="font-medium">{msg.message.text}</p>

                {renderProducts(msg.message.products)}

                <span
                  className={`text-[10px] block text-right mt-1 ${
                    msg.role === "user" ? "text-blue-200" : "text-gray-400"
                  }`}
                >
                  {msg.createdAt &&
                    msg.createdAt !== "" &&
                    new Date(msg.createdAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </div>

              {msg.role === "user" && (
                <div className="size-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <UserRoundIcon className="text-white size-5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 mb-4 justify-start">
              <div className="size-10 bg-[#c4123f] rounded-full flex-shrink-0 flex items-center justify-center">
                <BotMessageSquareIcon className="text-white size-5" />
              </div>
              <div className="text-sm px-3 py-2 rounded-lg bg-gray-100 text-black">
                <TypingLoading />
              </div>
            </div>
          )}
        </div>
        <div className="relative flex items-center px-4 mb-2 ">
          <input
            type="text"
            ref={inputRef}
            placeholder="Gửi câu hỏi..."
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
            <SendHorizonalIcon className="size-5 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
