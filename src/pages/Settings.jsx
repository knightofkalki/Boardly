import Settings from "../components/Settings";

export default function SettingsPage() {

    return (
        <div className="container mx-auto min-w-[70vw] p-6 rounded-lg">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-700 font-bold">Settings</h1>
            </div>

            <Settings />
        </div>
    );
};
