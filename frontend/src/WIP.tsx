import { PoweredBy } from "./components/PoweredBy";

export const WIP = () => {

    return (
        <div className="lcontainer">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-4 p-2 flex flex-col items-center grow-0">
                    <h1 className="text-4xl font-bold text-primary">
                        GRANTR
                        <span className="text-lg brightness-75">.app</span>
                    </h1>
                    <div className="text-lg text-primary brightness-75">
                        Its a Grant thing
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8 flex justify-end">
                    {/* <Profile /> */}

                </div>
            
                <div className="text-white col-span-12">
                    We are currently under construction. We will be back soon!
                </div>
            </div>
        </div>
    );
};