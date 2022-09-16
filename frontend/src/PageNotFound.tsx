import { Link } from 'react-router-dom';
import { DeleteButton } from './components/DeleteButton';
import { PoweredBy } from './components/PoweredBy';
import { TwitterButton } from './components/TwitterButton';

export const PageNotFound = () => {
    return (
            <div className="w-full flex flex-col items-center h-screen text-center">
                {/* <div className="grid grid-cols-12 gap-4"> */}

                <div className="col-span-12 text-4xl sm:text-6xl mt-auto text-primary">
                    <span className="text-8xl">404</span>
                    <br />Page Not Found
                </div>

                <div className="text-white text-lg col-span-12 mt-2">
                    The page you are looking for does not exist.
                </div>

                <Link to={'/'} className="text-primary brightness-75 text-lg mt-2 hover:font-bold">Go Home</Link>
                
                <div className="col-span-12 lg:col-span-4 p-4 mt-auto flex flex-col items-center grow-0">
                    <h1 className="text-4xl font-bold text-primary">
                        GRANTR
                        <span className="text-lg brightness-75">.app</span>
                    </h1>
                    <div className="text-lg text-primary brightness-75">
                        Its a Grant thing
                    </div>
                </div>
                {/* </div> */}
            </div>
    );
};
