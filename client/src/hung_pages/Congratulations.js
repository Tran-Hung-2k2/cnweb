import React from 'react';

const CongratulationPage = ({ score, totalQuestions }) => {
  // Hàm tính phần trăm đạt được
  const calculatePercentage = () => {
    return ((score / totalQuestions) * 100).toFixed(2);
  };

  // Hàm xác định thông điệp chúc mừng dựa trên kết quả
  const getCongratulationMessage = () => {
    const percentage = calculatePercentage();

    if (percentage >= 80) {
      return 'Chúc mừng! Bạn đã hoàn thành rất tốt!';
    } else if (percentage >= 60) {
      return 'Chúc mừng! Bạn đã hoàn thành khá tốt!';
    } else {
      return 'Hãy cố gắng hơn! Bạn có thể làm tốt hơn!';
    }
  };

  return (
    <div>
      <h1>Chúc Mừng!</h1>
      <p>{getCongratulationMessage()}</p>
      <p>Bạn đã đạt được {score} điểm trên {totalQuestions}. Điểm của bạn là {calculatePercentage()}%.</p>
    </div>
  );
};

export default CongratulationPage;
