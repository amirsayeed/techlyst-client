import React from 'react';
import { FaExclamationTriangle, FaClipboardCheck } from 'react-icons/fa';

const ModeratorDashboard = () => {
    return (
        <div>
            <title>TechLyst | Dashboard</title>
            <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Moderator Dashboard</h2>
            <p className="text-base mb-6">
                From here, you can manage the product review process and handle reported contents to keep the platform clean.
            </p>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-4xl">
                <div className="bg-base-200 rounded-xl shadow-md p-5 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-3">
                        <FaClipboardCheck className="text-2xl" />
                        <h3 className="text-lg font-semibold">Product Review Queue</h3>
                    </div>
                    <p className="text-sm font-normal text-justify">
                        Review submitted products, accept or reject them, and mark top picks as featured.
                    </p>
                </div>

                <div className="bg-base-200 rounded-xl shadow-md p-5 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-3">
                        <FaExclamationTriangle className="text-2xl" />
                        <h3 className="text-lg font-semibold">Reported Contents</h3>
                    </div>
                    <p className="text-sm font-normal text-justify">
                        Monitor reported products and take necessary actions like reviewing or deleting inappropriate content.
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ModeratorDashboard;
