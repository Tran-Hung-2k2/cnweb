import React, { useState } from 'react';

const QuizPage = () => {
  // Danh sách câu hỏi
  const questions = [
    { id: 1, text: 'React là gì?', options: ['Ngôn ngữ lập trình', 'Framework JavaScript', 'Cơ sở dữ liệu'] },
    { id: 2, text: 'ReactJS được phát triển bởi công ty nào?', options: ['Google', 'Facebook', 'Microsoft'] },
    // Thêm các câu hỏi khác
  ];

  // Trạng thái lưu kết quả của người dùng
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);

  // Hàm xử lý khi người dùng chọn câu trả lời
  const handleAnswerSelect = (questionId, selectedOption) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Hàm xử lý khi người dùng gửi kết quả
  const handleSubmit = () => {
    // Tính điểm dựa trên câu trả lời đúng
    let score = 0;
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer && userAnswer === question.options.indexOf('Framework JavaScript') + 1) {
        score += 1;
      }
    });

    // Gán kết quả
    setResult(`Bạn đã đạt được ${score} điểm trên ${questions.length}.`);
  };

  return (
    <div>
      <h1>Trang Kiểm Tra ReactJS</h1>
      {questions.map(question => (
        <div key={question.id}>
          <p>{question.text}</p>
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={index + 1}
                    onChange={() => handleAnswerSelect(question.id, index + 1)}
                    checked={userAnswers[question.id] === index + 1}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit}>Gửi Kết Quả</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default QuizPage;
