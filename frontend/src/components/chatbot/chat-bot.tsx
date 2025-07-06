import { useSendMessage } from "@/hooks/use-chatbot";
import IMessage from "@/interfaces/chat/message.interface";
import formatPriceToVND from "@/utils/format-price";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  BotMessageSquareIcon,
  SendHorizonalIcon,
  UserRoundIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TypingLoading from "../loading/typing-loading";

const ChatBot = () => {
  const [askChatbot, setAskChatbot] = useState(false);
  const { mutate: send } = useSendMessage();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [historyChat, setHistoryChat] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const chats = sessionStorage.getItem("chat");
    if (chats) {
      setHistoryChat(JSON.parse(chats));
    } else {
      const welcomeMessage: IMessage = {
        role: "model",
        message: { text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
        createdAt: new Date().toISOString(),
      };
      setHistoryChat([welcomeMessage]);
      sessionStorage.setItem("chat", JSON.stringify([welcomeMessage]));
    }
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historyChat]);
  const handleSendMessage = async () => {
    const mess: IMessage = {
      role: "user",
      message: { text: message },
      createdAt: new Date().toISOString(),
      temp: true,
    };
    const loadingMessage: IMessage = {
      role: "model",
      message: { text: "loading" },
      createdAt: "",
      temp: true,
    };
    setHistoryChat((prev) => [...prev, mess, loadingMessage]);
    let res: IMessage[] = [];
    send(message, {
      onSuccess: (data: IMessage[]) => {
        res = data;
        const filtered = historyChat.filter(
          (m) =>
            !(
              m.temp &&
              (m.message.text === message || m.message.text === "loading")
            )
        );
        const merged = [...filtered, ...res];
        sessionStorage.setItem("chat", JSON.stringify(merged));
        setHistoryChat(merged);
      },
    });
    setMessage("");
  };
  return (
    <div className="fixed right-3 bottom-20 z-20">
      <button
        onClick={() => setAskChatbot(true)}
        className={`lg:size-14 size-12 rounded-full transition-all duration-300 hover:scale-110 bg-[#c4123f]  items-center justify-center ${
          askChatbot ? "hidden" : "flex"
        }`}
      >
        <BotMessageSquareIcon className="text-white lg:size-7 size-6" />
      </button>
      <div
        className={`rounded-md transition-all duration-300 overflow-hidden   border shadow-xl border-gray-200 bg-white min-w-[370px] max-w-[370px] ${
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
        <div className="pl-4  py-6 max-h-[400px] overflow-y-auto">
          {historyChat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 mb-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "model" && (
                <div className="size-10 bg-[#c4123f] rounded-full flex-shrink-0 flex items-center justify-center">
                  <BotMessageSquareIcon className="text-white" />
                </div>
              )}
              <p
                className={`text-sm px-2.5 py-2 rounded-lg break-words font-medium max-w-[60%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {msg.temp && msg.role === "model" ? (
                  <TypingLoading />
                ) : (
                  msg.message.text
                )}
                {Array.isArray(msg.message.products) &&
                  msg.message.products.map((p, index: number) => (
                    <Link
                      onClick={() => setAskChatbot(false)}
                      to={`/products/${p.slug}`}
                      key={`${p.sku}-${index}`}
                      className="flex flex-col gap-1 mt-2"
                    >
                      <img
                        src={
                          p.variants?.length > 0
                            ? p.variants[0].images[0]
                            : p.images[0]
                        }
                        alt={p.title}
                        className="w-full max-w-full min-w-full object-contain"
                      />
                      <span className="font-semibold line-clamp-2">
                        {p.title}
                      </span>
                      <span className="text-[15px] font-bold">
                        {p.variants?.length > 0
                          ? formatPriceToVND(p.variants[0].price)
                          : formatPriceToVND(p.price)}
                      </span>
                      {p.descr && (
                        <div
                          className="whitespace-pre-wrap line-clamp-3 text-sm"
                          dangerouslySetInnerHTML={{ __html: p.descr }}
                        />
                      )}
                    </Link>
                  ))}

                <span
                  className={`text-xs  block  text-right ${
                    msg.role === "user" ? "text-white" : "text-gray-400"
                  }`}
                >
                  {msg.createdAt != null &&
                    msg.createdAt !== "" &&
                    new Date(msg.createdAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </p>
              {msg.role === "user" && (
                <div className="size-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <UserRoundIcon className="text-white size-5" />
                </div>
              )}
              <div ref={messageEndRef}></div>
            </div>
          ))}
        </div>
        <div className="relative flex items-center px-4 mb-2 ">
          <input
            type="text"
            placeholder="Gửi câu hỏi..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className=" w-full  outline-none border rounded-lg  border-gray-300 pl-2.5 pr-8 py-1.5"
          />

          <button
            onClick={() => handleSendMessage()}
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
