
import React from 'react';
import FAQItem from './FAQItem';

const FAQ = () => {
    const faqData = [
        { question: 'Câu hỏi 1', answer: 'Câu trả lời cho câu hỏi 1.' },
        { question: 'Câu hỏi 2', answer: 'Câu trả lời cho câu hỏi 2.' },
        // Thêm các câu hỏi và câu trả lời khác tại đây
    ];

    return (
        <div>
            <h1>Câu hỏi thường gặp</h1>
            {faqData.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};

export default FAQ;
