import { useState } from "react";
import axios from "axios";
import SignAvatar from "./SignAvatar";
import { motion } from "framer-motion";

function App() {
  const [text, setText] = useState("");
  const [signSequence, setSignSequence] = useState([]);

  const handleConvert = async () => {
    const res = await axios.post("http://localhost:8000/convert", { text });
    setSignSequence(res.data.sign_sequence);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <motion.h1 className="text-4xl font-bold mb-4" animate={{ scale: 1.1 }}>
        แปลงข้อความเป็นภาษามือ
      </motion.h1>
      <textarea
        className="border p-2 w-1/2 text-black rounded-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="พิมพ์ข้อความที่นี่..."
      />
      <motion.button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-2 rounded-md"
        onClick={handleConvert}
        whileHover={{ scale: 1.1 }}
      >
        แปลง
      </motion.button>
      <SignAvatar sequence={signSequence} />
    </div>
  );
}

export default App;
