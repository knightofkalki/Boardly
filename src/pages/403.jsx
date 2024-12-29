import { Link } from 'react-router-dom';

export default function NoAccessPage() {
    return (
        <div className="container mx-auto min-w-[70vw] p-6 rounded-lg bg-white">
            <div className="mb-4">
                <h1 className="text-3xl text-orange-600 font-bold">403 - No Access</h1>
            </div>
            <p className="text-gray-600">Sorry, you do not have permission to access this page.</p>
            <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Go to Home
            </Link>
            <p className="mt-4 text-gray-600">If the above button does not work, click <a href="/landing">here</a></p>
            <p className="mt-4 text-gray-600">If you think this is a mistake, please contact the administrator.</p>
        </div>
    );
};
