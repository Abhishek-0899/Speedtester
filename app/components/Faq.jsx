import { BiPlus } from "react-icons/bi";
import faqs from "@/app/data/faq.json";
import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleSwitch = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-red-300 text-4xl mt-3 mb-4 text-center font-semibold">
        FAQ&apos;s
      </h1>
      {faqs.map((item, index) => (
        <div
          key={index}
          className="text-white flex flex-col border-b pb-2 border-amber-200 mt-3 text-2xl mb-6"
        >
          <button
            onClick={() => toggleSwitch(index)}
            className="flex  justify-between items-center gap-2 text-white"
          >
            <h1 className="text-left">
              {index + 1}. <span className="text-2xl">{item.question}</span>
            </h1>
            <BiPlus
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {openIndex === index && (
            <p className="text-gray-400 mt-4 mb-4">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
