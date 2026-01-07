import './App.css';
import { Routes, Route } from 'react-router-dom';

import { HomepageLayout } from './components/HomepageLayout';
import { AppLayout } from './components/AppLayout';

import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Config } from './components/Config';
import { Register } from './components/Register';
import { RegisterConfirm } from './components/RegisterConfirm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomepageLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signup-confirmation" element={<RegisterConfirm />} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route path="config" element={<Config />} />
          <Route index element={<Dashboard />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
