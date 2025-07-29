import { Link } from 'react-router';

const NotFound = () => {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-base-200 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-primary opacity-10"></div>
                <div className="absolute top-0 left-0 h-64 w-64 bg-secondary rounded-full opacity-20 -translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 bg-accent rounded-full opacity-10 translate-x-1/4 translate-y-1/4"></div>
            </div>

            <div className="relative z-10 text-center p-8">
                <h1 className="text-9xl font-black text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
                    404
                </h1>
                <p className="mt-4 text-2xl md:text-4xl font-bold text-base-content">
                    Page Not Found
                </p>
                <p className="mt-4 text-lg text-base-content/80 max-w-md mx-auto">
                    Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
                </p>
                <Link
                    to="/"
                    className="btn btn-primary mt-10 shadow-lg transform transition-transform hover:scale-105"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Go Back Home
                </Link>
            </div>
        </main>
    );
};

export default NotFound;