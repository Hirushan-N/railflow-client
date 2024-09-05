import React, { useState } from 'react';
import Modal from '../components/TrainDetailsModal'; // Make sure to create this file in the same directory

const Timeline = ({ trains, showMessage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 10;


    const indexOfLastTrain = currentPage * itemsPerPage;
    const indexOfFirstTrain = indexOfLastTrain - itemsPerPage;
    const currentTrains = trains.slice(indexOfFirstTrain, indexOfLastTrain);

    const totalPages = Math.ceil(trains.length / itemsPerPage);
    const maxPagesToShow = 5;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowClick = (train) => {
        setSelectedTrain(train);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderPagination = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            pages.push(
                <button key={1} onClick={() => handlePageChange(1)} className="mx-1 px-3 py-1 rounded bg-gray-200">1</button>
            );
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis" className="mx-1">...</span>);
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {page}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className="mx-1">...</span>);
            }
            pages.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="mx-1 px-3 py-1 rounded bg-gray-200">{totalPages}</button>
            );
        }

        return pages;
    };


    return (
        <div className="p-4">
            {showMessage ? (
                <div className="text-center p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded">
                    No trains match your search criteria.
                </div>
            ) : (
                <>
                    {/* Mobile view */}
                    <div className="md:hidden">
                        {currentTrains.map((location, index) => (
                            <div key={index} className="mb-4 bg-white shadow rounded-lg p-4" onClick={() => handleRowClick(location)}>
                                <h3 className="font-bold text-lg mb-2">{location.TrainId.trainName}</h3>
                                <p><span className="font-semibold">Current Direction:</span> {location.TrainId.currentDirection}</p>
                                <p><span className="font-semibold">From:</span> {location.TrainId.startStation}</p>
                                <p><span className="font-semibold">To:</span> {location.TrainId.endStation}</p>
                                <p><span className="font-semibold">Express:</span> {location.TrainId.isExpress ? 'Yes' : 'No'}</p>
                                <p><span className="font-semibold">Last Arrived:</span> {location.LastArrivedStation} at {new Date(location.DateTime).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    {/* Tablet and desktop view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left">Train Name</th>
                                    <th className="p-3 text-left">Current Direction</th>
                                    {/* <th className="p-3 text-left">Start Location</th>
                                    <th className="p-3 text-left">End Location</th> */}
                                    <th className="p-3 text-left">Express</th>
                                    <th className="p-3 text-left">Last Arrived Station (Time)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTrains.map((location, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(location)}>
                                        <td className="p-3">{location.TrainId.trainName}</td>
                                        <td className="p-3">{location.TrainId.currentDirection}</td>
                                        {/* <td className="p-3">{location.TrainId.startStation}</td>
                                        <td className="p-3">{location.TrainId.endStation}</td> */}
                                        <td className="p-3">{location.TrainId.isExpress ? 'Yes' : 'No'}</td>
                                        <td className="p-3">{`${location.LastArrivedStation} (${new Date(location.DateTime).toLocaleString()})`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                        <div className="mt-4 flex justify-center">
                            {renderPagination()}
                        </div>
                    {/* Modal */}
                    <Modal isOpen={isModalOpen} onClose={closeModal} train={selectedTrain} />
                </>
            )}
        </div>
    );
};

export default Timeline;