import SlotList from "../../components/mentor/SlotList";

export default function SlotListPage() {

    return (
        <div className="container mx-auto min-w-[70vw] p-6 rounded-lg">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-700 font-bold">Slots</h1>
            </div>
            <SlotList />
        </div>
    );
};
