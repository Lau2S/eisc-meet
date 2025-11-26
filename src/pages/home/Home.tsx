import Chat from "./chat/Chat";
import Interaction from "./interaction/Interaction";

const Home: React.FC = () => {
  return (
     <div className="w-full min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="flex gap-4 w-full h-full">
        <div className="flex-1 w-3/4">
          <Interaction />
        </div>
        <div className="w-1/4">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;