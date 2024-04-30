import React from 'react'

const ComponentModal = (props) => {
    if (!props.showComponentModal) return null;

    return (
        <div className='fixed inset-0 flex backdrop-blur-sm justify-center items-center'>
            <div className='bg-indigo-100 p-4 w-full max-w-md max-h-full shadow-2xl rounded-lg'>
                <div className="flex items-center justify-between pb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Add Component
                    </h3>
                    <button type="button" onClick={props.onClose} className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <form >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input type="text" id="name" placeholder="Name" name="name" className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description:</label>
                        <input type="text" id="description" placeholder="Description" name="description" className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700">City:</label>
                        <input type="text" id="city" placeholder="City" name="city" className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="state" className="block text-gray-700">State:</label>
                        <input type="text" id="city" placeholder="State" name="state" className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="component type" className="block text-gray-700">Component Type:</label>
                        <input type="text" id="component type" placeholder="Component Type" name="component type" className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cost" className="block text-gray-700">Cost:</label>
                        <input type="number" id="cost" name="cost" min='0'className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="suplier id" className="block text-gray-700">Suplier ID:</label>
                        <input type="number" id="suplier id" placeholder="Suplier ID" min='0' name="suplier id" className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="production stage" className="block text-gray-700">Production Stage:</label>
                        <input type="text" id="production stage" placeholder="Production Stage" name="production stage" className="form-input mt-1 pl-2 block w-full rounded" />
                    </div>
                    <button type="submit" className="float-right text-white inline-flex items-center bg-green-700 hover:bg-green-800 font-semibold rounded-lg text-sm px-3 py-1.5 text-center">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add New Component
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ComponentModal;