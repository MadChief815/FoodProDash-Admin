import React from 'react';

const PageName = () => {
    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">PageName</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Add New
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="px-4 py-2">Item Name</td>
                            <td className="px-4 py-2">Active</td>
                            <td className="px-4 py-2">
                                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PageName;