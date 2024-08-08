import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TypingArea from './components/TypingArea';
import Statistics from './components/Statistics';

function App() {
  return (
    <Provider store={store}>
      <div>
        <TypingArea />
        <Statistics />
      </div>
    </Provider>
  );
}

export default App;
