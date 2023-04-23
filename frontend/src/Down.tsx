import { TwitterButton } from './components/TwitterButton';
import { GLOBALS } from './index';

export const Down = () => {
    // Every 30 seconds, pull the API and see if it's back up
    setInterval(() => {
        fetch(GLOBALS.API_URL).then((res) => {
            if (res.status == 200) {
                location.reload();
            }
        });
    }, 30000);

    return (
        <div className="lcontainer">
            <div className="w-full flex flex-col items-center">
                {/* <div className="grid grid-cols-12 gap-4"> */}
                <div className="col-span-12 lg:col-span-4 p-2 flex flex-col items-center grow-0">
                    <h1 className="text-4xl font-bold text-primary">
                        GRANTR
                        <span className="text-lg brightness-75">.app</span>
                    </h1>
                    <div className="text-lg text-primary brightness-75">
                        Its a Grant thing
                    </div>
                </div>

                <div className="text-white col-span-12">
                    Our server is not responding properly, but we are alerted
                    and working on it. This page will automatically refresh when
                    the problem is resolved.
                </div>

                <div className="text-white col-span-12 flex gap-4">
                    <TwitterButton />
                </div>
            </div>
        </div>
    );
};
