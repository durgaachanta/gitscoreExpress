import React from 'react';
const GitPrevSearch = (props) => {
  return (
    <div>
      <h1>Previous Search Results</h1>
      {props.prevData.map((item, index) => {
        return (
          <div>
            <label>Name: {item.name}</label>
            <label>Score: {item.score}</label>
          </div>
        )
      })}
    </div>

  );
}
export default GitPrevSearch;