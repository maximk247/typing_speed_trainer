import React from 'react';
import { Provider } from 'react-redux';
import Statistics from './components/Statistics';
import TypingArea from './components/TypingArea';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Statistics />
        <TypingArea />
      </div>
    </Provider>
  );
}

export default App;
