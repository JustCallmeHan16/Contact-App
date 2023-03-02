import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Edit = () => {

    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')

    const {id} = useParams()

    const navigate = useNavigate()

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    
    const getCurrentConatct = async() => {
        const {data} = await axios.get(`http://localhost:3000/contacts/${id}`)
        setName(data.name)
        setPhone(data.phone)
        setEmail(data.email)
        console.log(data)
    }

    const updateContact = async(contact) => {
        const {data} = await axios.patch(`http://localhost:3000/contacts/${id}`,contact)
        console.log(data)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const contact = {name,phone,email}
        updateContact(contact)
        Toast.fire({
            icon: 'success',
            title: 'Updated'
          })
        navigate('/')
    }

    useEffect( () => {
        getCurrentConatct()
    },[])

    return (
        <>
            <div className='min-w-[100%] min-h-[100vh] flex justify-center items-center'>
                <form onSubmit={onSubmitHandler} className='container w-7/12 mx-auto'>
                    <h1 className='text-2xl font-medium text-center py-2'>Create New Contact</h1>
                        <div className="mb-6">
                            <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input onChange={(e) => setName(e.target.value)} defaultValue={name} type="text" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="han" required/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input onChange={(e) => setPhone(e.target.value)} defaultValue={phone} type="" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='09XXXXXXXXX' required/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} defaultValue={email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="han@gamil.com" required/>
                        </div>
                        <div className='flex gap-2'>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                            <Link to={'/'}>
                                <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
                            </Link>
                        </div>
                </form>
            </div>
        </>
    )
    
}

export default Edit