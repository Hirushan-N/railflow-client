import { useState, useEffect } from 'react';
import trainService from '../services/trainService';
import Select from 'react-select';  // Import react-select for searchable dropdown
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the static JSON data
import stationOptions from '../data/stationOptions.json';
import daysOptions from '../data/daysOptions.json';
import routeOptions from '../data/routeOptions.json'; // Import railway routes

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [formTrain, setFormTrain] = useState({
    trainNumber: '',
    trainName: '',
    startStation: '',
    endStation: '',
    routeName: '',
    days: [],
    stationsFromStart: [],
    stationsFromEnd: [],
    currentDirection: '',
    isActive: false,
    isExpress: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTrainId, setSelectedTrainId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [trainsPerPage] = useState(5);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state for deletion confirmation
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [trainIdToDelete, setTrainIdToDelete] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const trainList = await trainService.getAllTrains();
        setTrains(trainList);
      } catch (error) {
        toast.error('Error fetching trains');
      }
    };
    fetchTrains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        await trainService.updateTrain(selectedTrainId, formTrain);
        resetForm();
        const trainList = await trainService.getAllTrains();
        setTrains(trainList);
        toast.success('Train updated successfully');
      } catch (error) {
        toast.error('Error updating train');
      }
    } else {
      try {
        await trainService.createTrain(formTrain);
        resetForm();
        const trainList = await trainService.getAllTrains();
        setTrains(trainList);
        toast.success('Train added successfully');
      } catch (error) {
        toast.error('Error adding train');
      }
    }
  };

  const resetForm = () => {
    setFormTrain({
      trainNumber: '',
      trainName: '',
      startStation: '',
      endStation: '',
      routeName: '',
      days: [],
      stationsFromStart: [],
      stationsFromEnd: [],
      currentDirection: '',
      isActive: false,
      isExpress: false,
    });
    setIsEditMode(false);
    setSelectedTrainId(null);
  };

  const handleStationsFromStartChange = (selectedStations) => {
    const stationsFromStart = selectedStations.map(option => option.value);
    const stationsFromEnd = [...stationsFromStart].reverse();  // Automatically generate Stations From End
    const currentDirection = stationsFromStart.length > 1
      ? `${stationsFromStart[0]} to ${stationsFromStart[stationsFromStart.length - 1]}`
      : '';  // Generate Current Direction

    setFormTrain({
      ...formTrain,
      stationsFromStart,
      stationsFromEnd,
      currentDirection,
      startStation: stationsFromStart[0],
      endStation: stationsFromStart[stationsFromStart.length - 1],
    });
  };

  const handleDaysChange = (selectedDays) => {
    const days = selectedDays.map(option => option.value);  // Get array of selected days
    setFormTrain({ ...formTrain, days });
  };

  const handleEditTrain = (train) => {
    setFormTrain({
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      startStation: train.startStation,
      endStation: train.endStation,
      routeName: train.routeName,
      days: train.days,  // Pre-populate days for editing
      stationsFromStart: train.stationsFromStart,
      stationsFromEnd: train.stationsFromEnd,
      currentDirection: train.currentDirection,
      isActive: train.isActive,
      isExpress: train.isExpress,
    });
    setIsEditMode(true);
    setSelectedTrainId(train._id);
  };

  const openConfirmModal = (trainId) => {
    setTrainIdToDelete(trainId);
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    setTrainIdToDelete(null);
  };

  const confirmDeleteTrain = async () => {
    try {
      await trainService.deleteTrain(trainIdToDelete);
      const trainList = await trainService.getAllTrains();
      setTrains(trainList);
      closeConfirmModal();
      toast.success('Train deleted successfully');
    } catch (error) {
      toast.error('Error deleting train');
    }
  };

// Filter trains based on search term
const filteredTrains = trains.filter(
  (train) =>
    (train.trainName && train.trainName.toLowerCase().includes(searchTerm.toLowerCase())) || // Check if trainName exists
    (train.routeName && train.routeName.toLowerCase().includes(searchTerm.toLowerCase()))    // Check if routeName exists
);

  // Pagination logic
  const indexOfLastTrain = currentPage * trainsPerPage;
  const indexOfFirstTrain = indexOfLastTrain - trainsPerPage;
  const currentTrains = filteredTrains.slice(indexOfFirstTrain, indexOfLastTrain);
  const totalPages = Math.ceil(filteredTrains.length / trainsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Train Management</h1>

      {/* Form for Adding/Editing Train */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Train' : 'Add New Train'}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="trainNumber" className="block text-sm font-medium text-gray-700">Train Number</label>
            <input
              type="text"
              id="trainNumber"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formTrain.trainNumber}
              onChange={(e) => setFormTrain({ ...formTrain, trainNumber: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="trainName" className="block text-sm font-medium text-gray-700">Train Name</label>
            <input
              type="text"
              id="trainName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formTrain.trainName}
              onChange={(e) => setFormTrain({ ...formTrain, trainName: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Route Name (Dropdown) */}
        <div className="mb-4">
          <label htmlFor="routeName" className="block text-sm font-medium text-gray-700">Route Name</label>
          <Select
            id="routeName"
            options={routeOptions}
            value={{ value: formTrain.routeName, label: formTrain.routeName }}
            onChange={(selectedOption) => setFormTrain({ ...formTrain, routeName: selectedOption.value })}
            placeholder="Select route..."
          />
        </div>

        {/* Days of Operation (Multi-select Dropdown) */}
        <div className="mb-4">
          <label htmlFor="days" className="block text-sm font-medium text-gray-700">Days of Operation</label>
          <Select
            id="days"
            isMulti
            options={daysOptions}
            value={formTrain.days.map(day => ({ value: day, label: day }))}
            onChange={handleDaysChange}
            placeholder="Select days..."
          />
        </div>

        {/* Stations From Start (Searchable Dropdown) */}
        <div className="mb-4">
          <label htmlFor="stationsFromStart" className="block text-sm font-medium text-gray-700">Stations From Start</label>
          <Select
            id="stationsFromStart"
            isMulti
            options={stationOptions}
            value={formTrain.stationsFromStart.map(station => ({ value: station, label: station }))}
            onChange={handleStationsFromStartChange}
            placeholder="Select stations..."
          />
        </div>

        {/* Stations From End (Auto-generated, disabled) */}
        <div className="mb-4">
          <label htmlFor="stationsFromEnd" className="block text-sm font-medium text-gray-700">Stations From End</label>
          <input
            type="text"
            id="stationsFromEnd"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formTrain.stationsFromEnd.join(', ')}
            disabled
          />
        </div>

        {/* Current Direction (Auto-generated) */}
        <div className="mb-4">
          <label htmlFor="currentDirection" className="block text-sm font-medium text-gray-700">Current Direction</label>
          <input
            type="text"
            id="currentDirection"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formTrain.currentDirection}
            disabled
          />
        </div>

        {/* Is Active and Is Express */}
        <div className="flex items-center mb-4">
          <label htmlFor="isActive" className="mr-2 text-sm font-medium text-gray-700">Is Active?</label>
          <input
            type="checkbox"
            id="isActive"
            checked={formTrain.isActive}
            onChange={(e) => setFormTrain({ ...formTrain, isActive: e.target.checked })}
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="isExpress" className="mr-2 text-sm font-medium text-gray-700">Is Express?</label>
          <input
            type="checkbox"
            id="isExpress"
            checked={formTrain.isExpress}
            onChange={(e) => setFormTrain({ ...formTrain, isExpress: e.target.checked })}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isEditMode ? 'Update Train' : 'Add Train'}
        </button>

        {isEditMode && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded ml-4 hover:bg-gray-600"
            onClick={() => {
              setIsEditMode(false);
              resetForm();  // This resets the form to its default state
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by train name or route..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Train Table */}
      <div className="min-h-[300px]">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Train Number</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Train Name</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Route</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTrains.length > 0 ? (
              currentTrains.map((train) => (
                <tr key={train._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-sm text-gray-800">{train.trainNumber}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-800">{train.trainName}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-800">{train.routeName}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-800">
                    <button
                      onClick={() => handleEditTrain(train)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openConfirmModal(train._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-sm text-gray-500">No trains found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-2"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-2"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this train?</p>
              <div className="mt-4 flex justify-end">
                <button onClick={confirmDeleteTrain} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                  Confirm
                </button>
                <button onClick={closeConfirmModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Trains;
