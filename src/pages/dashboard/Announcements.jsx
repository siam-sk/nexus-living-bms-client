import { useEffect, useState } from 'react';

const AnnouncementCard = ({ announcement }) => {
    const { title, content, date, type } = announcement;

    const typeStyles = {
        maintenance: {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-warning"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.471-2.471a.563.563 0 01.801 0l3.733 3.733a.563.563 0 010 .801l-2.471 2.471M11.42 15.17L5.877 21m5.543-5.83l-2.471 2.471a.563.563 0 01-.801 0l-3.733-3.733a.563.563 0 010-.801l2.471-2.471m5.543 5.83l-5.543-5.543m5.543 5.543l5.543-5.543" /></svg>,
            borderColor: 'border-l-warning',
        },
        event: {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-success"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-.063 1.14-.094 1.72-.094s1.15.031 1.72.094m-3.44 0a6.672 6.672 0 01-3.44 0m6.88 0c.57.063 1.14.094 1.72.094s1.15.031 1.72.094m-3.44 0a6.672 6.672 0 01-3.44 0" /></svg>,
            borderColor: 'border-l-success',
        },
        info: {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-info"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            borderColor: 'border-l-info',
        },
    };

    return (
        <div className={`card bg-base-100 shadow-md border-l-4 ${typeStyles[type]?.borderColor || 'border-l-gray-400'}`}>
            <div className="card-body flex-row items-start gap-4">
                <div className="pt-1">{typeStyles[type]?.icon}</div>
                <div>
                    <h2 className="card-title">{title}</h2>
                    <p className="text-base-content/80">{content}</p>
                    <p className="text-xs text-base-content/60 mt-2">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
        </div>
    );
};


const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/announcements')
            .then(res => res.json())
            .then(data => {
                setAnnouncements(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch announcements:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Announcements</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <div className="space-y-6">
                    {announcements.length > 0 ? (
                        announcements.map(announcement => (
                            <AnnouncementCard key={announcement._id} announcement={announcement} />
                        ))
                    ) : (
                        <p>No announcements at this time.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Announcements;