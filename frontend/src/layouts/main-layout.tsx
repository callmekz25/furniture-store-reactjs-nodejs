import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import ChatBot from "@/components/chatbot/chat-bot";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7] min-h-screen">
        <Outlet />
        {/* <ChatBot /> */}
      </main>
      <Toaster />
      <Footer />
    </>
  );
};
export default MainLayout;
