import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {FiEdit} from 'react-icons/fi'
import {AiTwotoneDelete} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const Contact = () => {

    const [contacts,setContacts] = useState([])

    const swalWithButtons = Swal.mixin({
        customClass: {
          confirmButton: 'bg-green-500 px-5 py-1 text-white rounded ml-1',
          cancelButton: 'bg-red-500 px-5 py-1  text-white rounded mr-1'
        },
        buttonsStyling: false
      })

    const getContact = async() => {
        const {data} = await axios.get('http://localhost:3000/contacts')
        setContacts(data)
        console.log(data)
    }

    const apiDeleteContact = async(id) => {
        swalWithButtons.fire({
            title: 'Are you sure?',
            text: "This will be Delete!!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
              swalWithButtons.fire(
                'Deleted!',
                'Your contact has been deleted.',
                'success'
              )
              const {data} = await axios.delete(`http://localhost:3000/contacts/${id}`)
              console.log(data)
              getContact()
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
    }

    useEffect( () => {
        getContact()
    },[])

    return (
       <>
        <div className="container mx-auto w-10/12 my-3">
            <Link to={'/create'}>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create New Contact</button>
            </Link>
        </div>
        <div className="relative overflow-x-auto container mx-auto w-10/12 shadow-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                             Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts?.map(contact => 
                            <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.name}
                                </th>
                                <td className="px-6 py-4 text-gray-600">
                                    {contact.phone}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {contact.email}
                                </td>
                                <td className="px-6 py-4">
                                    <div className='flex gap-2'>
                                        <Link to={`/edit/${contact.id}`}>
                                            <FiEdit className='text-2xl transition-all duration-75 text-yellow-500 hover:cursor-pointer active:text-yellow-600'></FiEdit>
                                        </Link>
                                        <AiTwotoneDelete onClick={() => apiDeleteContact(contact.id)} className='text-2xl transition-all duration-75 text-red-500 hover:cursor-pointer active:text-red-600'></AiTwotoneDelete>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

       </>
    )
    
}

export default Contact