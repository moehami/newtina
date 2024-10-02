import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { tinaField } from 'tinacms/dist/react';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQData = {
  headline: string;
  text: string;
  questions: FAQItem[];
};

const FAQ = ({ data }: { data: FAQData }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-white p-8 lg:px-40 xl:px-80 mx-auto">
      <h2
        className="text-3xl font-helvetica mb-6 flex justify-center"
        data-tina-field={tinaField(data, 'headline')}
      >
        {data.headline}
      </h2>
      <p className="mb-8" data-tina-field={tinaField(data, 'text')}>{data.text}</p>
      <hr className="border-white" />
      <div className="mb-40" data-tina-field={tinaField(data, 'questions')}>
        {data.questions.map((item: FAQItem, index: number) => (
          <div key={index} data-tina-field={tinaField(item)}>
            <button
              className="w-full text-left py-4 px-4 focus:outline-none flex justify-between items-center"
              onClick={() => toggleQuestion(index)}
            >
              <h3 className="text-xl font-medium" data-tina-field={tinaField(item, 'question')}>
                {item.question}
              </h3>
              <FaPlus className="ml-auto" />
            </button>
            <div
              className={`overflow-hidden ${
                activeIndex === index
                  ? 'max-h-[500px] opacity-100 transition-all duration-500 ease-in-out'
                  : 'max-h-0 opacity-0'
              }`}
              style={{
                transition: activeIndex === index ? 'max-height 500ms ease-in-out, opacity 500ms' : 'none',
              }}
            >
              <div className="px-4 pb-4">
                <p data-tina-field={tinaField(item, 'answer')}>{item.answer}</p>
              </div>
            </div>
            <hr className="border-white" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
