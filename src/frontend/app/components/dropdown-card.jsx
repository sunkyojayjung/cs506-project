'use client';

import React, { useState, useEffect } from 'react';
import TableFacilities from './table-facilities';

const DropdownCard = ({ props, airplaneData, componentData, onDelete }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [confirmEdit, setConfirmEdit] = useState(false);

  const [fullInventory, setFullInventory] = useState([]);

  const host = process.env.WEBSERVER_HOST || 'localhost';
  const port = process.env.WEBSERVER_PORT || 5000;
  const url = `http://${host}:${port}`;

  useEffect(() => {
    if (airplaneData && componentData) {
      setFullInventory([...airplaneData, ...componentData])
    }
  }, [airplaneData, componentData]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  }

  const handleSort = (columnName) => {
    if(sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
    setFullInventory(fullInventory.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if(typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return sortOrder === 'asc' ? 
        String(valueA).localeCompare(String(valueB)) : String(valueB).localeCompare(String(valueA));
      }      
    })
    );
  }

  const handleEdit = (confirmDelete) => {
    if (confirmDelete) {
      onDelete(props.id);
    }
    setConfirmEdit(false);
  };

  return (
    //dropdown expandable component for each facility
    <div className='rounded-b-lg shadow mb-4'>
      
      {/* Make this a clickable component */}
      <div
        className= 'bg-white justify-between items-center rounded-lg'
      >
        {/* City, State is main identifier for a facility */}
        <div className='border-b-2 px-4 py-4 flex justify-between'>
          <h2 className='text-lg font-semibold'>{props.city}, {props.state}</h2>
          {confirmEdit ? (
              <div className="font-medium flex flex-col items-end">
                <div>
                  <button className="mr-2 bg-red-400 p-1 rounded" onClick={() => handleEdit(true)}>Delete</button>
                  <button className="mr-2 bg-slate-200 p-1 rounded" onClick={() => handleEdit(false)}>Cancel</button>
                </div>
              </div>
          ) : (
              <button className="bg-slate-200 rounded p-1" onClick={() => setConfirmEdit(true)}>Edit</button>
          )}
        </div>



        {/* Order data headers in one row, and data in the second row */}
        <div className='flex flex-col sm:flex-row px-4 py-2 mb-4 cursor-pointer' onClick={toggleExpansion}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 w-9/12">
            <div className="flex flex-col">
              <span className="text-md text-gray-400">Airplanes</span>
              <span className="font-medium">{props.airplanes + props.airplanesInProgress}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-md text-gray-400">Components</span>
              <span className="font-medium">{props.components + props.componentsInProgress}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-md text-gray-400">Employees</span>
              <span className="font-medium">{props.employees}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-md text-gray-400">Manager</span>
              <span className="font-medium">{props.manager}</span>
            </div>
          </div>

          {/* SVG of arrow to indicate component is expandable */}
          <div className='flex ml-auto'>
            <svg
              className={`h-6 w-6 transition-transform transform ${isExpanded ? 'rotate-360' : ''
                }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isExpanded ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className='p-4'>
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('name')}>
                  Product {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('type')}>
                  Type {sortBy === 'type' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('cost')}>
                  Cost {sortBy === 'cost' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('production_stage')}>
                  Production Stage {sortBy === 'production_stage' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('ID')}>
                  ID {sortBy === 'ID' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {
            fullInventory.map(data => {
                  if(data.city == props.city && data.state == props.state){ // if the datas are in facility
                    return <TableFacilities key={data.ID}
                    cost={data.cost}
                    product={data.name}
                    type={data.type}
                    stage={data.production_stage}
                    id={data.ID}
                    city={data.city}
                    state={data.state} />
                  }
                })
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DropdownCard;
