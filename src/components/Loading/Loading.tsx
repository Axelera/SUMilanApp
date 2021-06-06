import logo from '../../assets/images/logo.png';
import './Loading.css';

const Loading: React.FC = () => {
    return <div className="center-container">
        <img className="logo" src={logo} alt="su-logo" />
    </div>
};

export default Loading;