import Header from '../Components/Header/Header';
import Home from '../Components/Home/Home';
import Footer from '../Components/Footer/Footer';

import './App.css';

function App() {

    return (
        <div className="wrap">
            <div className='head'>
                <Header />
            </div>
            <div className="content">
                <Home />
                <Footer />
            </div>
        </div>
    );
}

export default App;
