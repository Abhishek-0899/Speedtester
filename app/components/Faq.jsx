import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import faqs from "@/app/data/faq.json";
import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleSwitch = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-red-300 text-2xl mb-4">FAQ's</h1>
      {faqs.map((item, index) => (
        <div
          key={index}
          className="text-white flex flex-col border-b border-gray-400"
        >
          <button
            onClick={() => toggleSwitch(index)}
            className="flex  justify-between items-center gap-2 text-white"
          >
            <h1 className="text-left">{item.question}</h1>
            {openIndex === index ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </button>
          {openIndex === index && (
            <p className="text-gray-300 mt-2">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
