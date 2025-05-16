import ChatComponent from "./components/ChatComponent";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="w-full flex">
      <div className="w-1/4 h-screen border-r-2 border-gray-300">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <ChatComponent />
      </div>
    </div>
  );
}
