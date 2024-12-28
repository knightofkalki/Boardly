const MentorDashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
                {/* Add code to display upcoming sessions */}
                <div className="bg-white p-4 rounded shadow">
                    <p>No upcoming sessions</p>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Messages</h2>
                {/* Add code to display messages */}
                <div className="bg-white p-4 rounded shadow">
                    <p>No new messages</p>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                {/* Add code to display mentor profile */}
                <div className="bg-white p-4 rounded shadow">
                    <p>Profile information goes here</p>
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;