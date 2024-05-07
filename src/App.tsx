import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import TaskForm from './components/TaskForm';
import PerformerList from './components/PerformerList';


const App: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<string>('TaskForm');

  const handleExecutorsClick = () => {
     setCurrentComponent('TaskForm');
  };

  const handleCalendarClick = () => {
    setCurrentComponent('PerformerList');
 };

  return (
    <div className="App">
      <Header />
      <div className="Content">
        <Menu  onExecutorsClick={handleExecutorsClick} onCalendarClick={handleCalendarClick}/>
        {currentComponent === 'TaskForm' ? <TaskForm /> : <PerformerList />}
      </div>
      <Footer />
    </div>
  );
}

export default App;