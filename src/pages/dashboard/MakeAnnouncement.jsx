import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

// Function to post a new announcement
const postAnnouncement = async (data) => {
    const res = await fetch('http://localhost:5000/announcements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('Failed to post announcement');
    }
    return res.json();
};

const MakeAnnouncement = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const mutation = useMutation({
        mutationFn: postAnnouncement,
        onSuccess: () => {
            reset();
            Swal.fire({
                title: 'Success!',
                text: 'Your announcement has been posted.',
                icon: 'success',
                confirmButtonText: 'Great!'
            });
        },
        onError: (err) => {
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Could not post announcement.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    });

    const onSubmit = (data) => {
        const announcementData = {
            title: data.title,
            content: data.description,
        };
        mutation.mutate(announcementData);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Make an Announcement</h1>
            <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter the announcement title"
                                className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                                {...register('title', { required: 'Title is required' })}
                            />
                            {errors.title && <span className="text-error text-sm mt-2">{errors.title.message}</span>}
                        </div>

                        {/* Description Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea
                                placeholder="Enter the announcement description"
                                className={`textarea textarea-bordered w-full h-32 ${errors.description ? 'textarea-error' : ''}`}
                                {...register('description', { required: 'Description is required' })}
                            ></textarea>
                            {errors.description && <span className="text-error text-sm mt-2">{errors.description.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Posting...
                                    </>
                                ) : (
                                    'Post Announcement'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;