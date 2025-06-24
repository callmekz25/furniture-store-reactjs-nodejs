const TypingLoading = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center text-black text-sm px-2.5 py-1.5 rounded-lg font-medium max-w-[60%]">
      <div className="animate-pulse flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  );
};

export default TypingLoading;
