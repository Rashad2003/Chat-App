import { useChatStore } from "../store/useChatStore";

import { Sidebar } from "../components/UI/Sidebar";
import NoChatSelected from "../components/UI/NoChatSelected";
import ChatContainer from "../components/UI/ChatCountainer";

export const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-full bg-base-200">
      <div className="flex items-center justify-center py-7.5 px-4 ">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
