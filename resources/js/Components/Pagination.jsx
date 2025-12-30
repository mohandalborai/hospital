import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    function getLabel(label) {
        if (label.includes('Previous')) return '&laquo; Previous';
        if (label.includes('Next')) return 'Next &raquo;';
        return label;
    }

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, key) => (
                link.url === null ? (
                    <div
                        key={key}
                        className="mb-1 mr-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                        dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                    />
                ) : (
                    <Link
                        key={key}
                        className={`mb-1 mr-1 px-4 py-3 text-sm leading-4 border rounded focus:border-indigo-500 focus:text-indigo-500 hover:bg-white ${
                            link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                    />
                )
            ))}
        </div>
    );
}
