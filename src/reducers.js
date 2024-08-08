// reducers.js
const initialState = {
    text: '',
    words: ['example', 'words', 'for', 'typing', 'test'],
    stats: {
      correct: 0,
      incorrect: 0,
      wpm: 0
    }
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_TEXT':
        return { ...state, text: action.payload };
      case 'CALCULATE_STATS':
        return { ...state, stats: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  