export default function Splash() {
    return (
        <div className="relative pb-16/9 mt-12">
            <iframe
                className="w-full h-96 rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}