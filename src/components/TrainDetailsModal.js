import React, { useRef, useEffect } from 'react';
import { FaTrain, FaMapMarkerAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, train }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`fixed inset-0 bg-black-900 bg-opacity-80 z-100 overflow-y-auto h-full w-full flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            id="my-modal"
        >
            <div
                ref={modalRef}
                className={`relative p-6 border w-full max-w-md shadow-xl rounded-lg bg-white transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
            >
                <div className="mt-3">
                    <div className="flex items-center justify-center mb-4">
                        <FaTrain className="text-3xl text-blue-500 mr-2" />
                        <h3 className="text-xl leading-6 font-bold text-gray-900">{train?.TrainId.trainName}</h3>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-green-500 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Current Direction:</span>
                            </div>
                            <span className="text-sm text-gray-600">{train?.TrainId.currentDirection}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <FaInfoCircle className="text-blue-500 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Express:</span>
                            </div>
                            <span className="text-sm text-gray-600">{train?.TrainId.isExpress ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <FaClock className="text-yellow-500 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Last Arrived:</span>
                            </div>
                            <span className="text-sm text-gray-600">
                                {train?.LastArrivedStation} at {train && new Date(train.DateTime).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            className="w-full px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;