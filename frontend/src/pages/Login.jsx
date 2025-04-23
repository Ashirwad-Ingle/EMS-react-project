import React from 'react';
 const Login = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-sevillana text-3xl  text-white">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
          <label htmlFor='email' className='block text-gray-700'> Email:</label>
            <input type="email" className="w-full px-3 py-3 border "  placeholder='Enter Email'/>
            </div>
        </form>
      </div>
    </div>
  );
};
 export default Login;
