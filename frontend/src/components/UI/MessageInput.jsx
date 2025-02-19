import { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { Image, SendHorizontal, X, Paperclip } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (e.g., 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Display file preview
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     if (file.type.startsWith("image/")) {
    //       setImagePreview(reader.result);
    //     } else {
    //       setFilePreview({
    //         name: file.name,
    //         type: file.type,
    //         url: reader.result,
    //       });
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // };

    setFilePreview({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    });
  };

  const removeFile = () => {
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !filePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        file: filePreview?.url,
        fileName: filePreview?.name,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      setFilePreview(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          )}
          {filePreview && (
            <div className="relative">
              <div className="w-20 h-20 flex items-center justify-center bg-base-300 rounded-lg border border-zinc-700">
                <Paperclip className="size-8 text-zinc-500" />
                <span className="text-xs text-zinc-500 truncate">
                  {filePreview.name}
                </span>
              </div>
              <button
                onClick={removeFile}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageInputRef}
            onChange={handleImageChange}
          />

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => imageInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              filePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview && !filePreview}
        >
          <SendHorizontal size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
