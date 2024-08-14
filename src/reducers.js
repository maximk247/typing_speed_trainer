import { generateRandomWords } from './generateRandomWords';

const initialState = {
    text: '',
    words: generateRandomWords(100),
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
        case 'RESET_WORDS': 
      return { 
        ...state, 
        text: '',  
        words: generateRandomWords(100),  
        stats: {
          correct: 0,
          incorrect: 0,
          wpm: 0
        }
      };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  