import {useNavigate} from 'react-router-dom';

export const WelcomePage: React.FC = () => {
    const navigate = useNavigate();
    return (<div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white border-2 border-violet-400 rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Happy text
            </h1>
            <button onClick={()=>navigate('/form')}
                className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
                Далее
            </button>
        </div>
    </div>)
}