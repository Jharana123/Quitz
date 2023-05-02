import React, { useEffect, useState } from 'react';

import { Button } from 'antd';

const End = ({ results, data, onReset }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if(result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
 
  }, []);

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {data.length}</p>
          <Button type='primary' onClick={onReset}>Try again</Button>
        </div>
      </div>
    </div>
  );
}

export default End;