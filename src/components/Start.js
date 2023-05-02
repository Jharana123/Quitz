import React from 'react';
import { Button } from 'antd';
const Start = ({ onQuizStart }) => {
  return(
    <div className="div">
      <div className="card-content">
        <div className="content">
          <Button type="primary" className='btn'  onClick={onQuizStart}>Start Quiz</Button>
        </div>
      </div>
    </div>
  );
}

export default Start;