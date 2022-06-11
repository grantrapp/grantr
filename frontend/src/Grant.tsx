export const Grant = () => {
    return (
        <div>
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-2xl text-white">{'FTX Future Fund'}</h1>
                <h2 className="text-lg text-gray-400">{'FTX'}</h2>
                <div className="grant-description my-8">
                    <h1>Mission</h1>
                    <p>
                        To provide grants to projects, ideas, and events that
                        benefit Aave and its ecosystem.
                    </p>
                    <h1>Program details</h1>
                    <p>
                        Aave Grants DAO is a community-led grants program to
                        fund ideas submitted by the Aave protocol’s community,
                        with a focus on empowering a wider network of community
                        developers. The community has allocated $1 million per
                        quarter for two quarters for funding grants. The program
                        will run from May 10 to November 10. The grants program
                        was created after a community discussion, which can be
                        found on Aave's governance forum here.
                    </p>
                    <h1>What's eligible for grant funding?</h1>
                    <ul>
                        <li>Protocol development</li>
                        <li>Applications and integrations</li>
                        <li>Developer tooling</li>
                        <li>Code audits</li>
                        <li>
                            Committees, sub-committees, and DAOs that serve the
                            Aave ecosystem
                        </li>
                        <li>Community (marketing and educational)</li>
                        <li>Events & hackathons</li>
                    </ul>
                </div>
                <div className="flex">
                    <a
                        target="_blank"
                        href="#"
                        className="flex flex-row items-center justify-center w-full py-2 rounded-full shadow-lg bg-primary font-bold"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                        APPLY
                    </a>
                </div>
            </div>
        </div>
    );
};
