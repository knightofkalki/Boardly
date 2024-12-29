import SlotAdd from "../../components/mentor/SlotAdd";

export default function SlotAddPage() {

    return (
        <div className="container mx-auto min-w-[70vw] p-6 rounded-lg">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-700 font-bold">Add Slots</h1>
            </div>
            <SlotAdd />
        </div>
    );
};
