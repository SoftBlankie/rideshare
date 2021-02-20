import './App.css';
import { isMobile } from 'react-device-detect';
import MobileLayout from './MobileLayout';

function App() {
  return (
    <div className='App'>
      <header className='RideShare'>{isMobile && <MobileLayout />}</header>
    </div>
  );
}

export default App;
