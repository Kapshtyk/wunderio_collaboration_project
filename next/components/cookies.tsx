import Link from 'next/link'
import React, { useState } from 'react'

const Cookies = () => {
  const [currentMenu, setCurrentMenu] = useState('consent')
  const body = {
    isFunctionalCookiesAvailable: 1,
    isAnalyticsCookiesAvailable: 0,
    isPerformanceCookiesAvailable: 1,
    isAdvertisingCookiesAvailable: 0,
    consentDate: '2023-11-30 12:00:00'
  }

  const handleAcceptAll = async () => {
    const response = await fetch('/api/cookies', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    console.log(response)
  }

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-white-30/75 backdrop-blur-md z-50">
      <div className='bg-primary-100 rounded-md shadow-md mx-auto max-w-3xl min-h-[400px] my-10 fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out p-4'>
        <nav className='flex justify-between items-center mb-6'>
          <div className={`w-2/6 p-2 bg-mischka  text-center`}
            onClick={e => setCurrentMenu('consent')}
          >
            <span>Consent</span>
          </div>
          <div className={`w-2/6 p-2 bg-mischka text-center`}
            onClick={e => setCurrentMenu('preferences')}
          >
            Preferences
          </div>
          <div className={`w-2/6 p-2 bg-mischka text-center`}
            onClick={e => setCurrentMenu('about')}
          >
            About
          </div>
        </nav >
        <div className={`min-h-[250px] ${currentMenu === 'consent' ? 'block' : 'hidden'}`}>
          <h2>Our website uses cookies</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quas repellat assumenda blanditiis? Esse voluptate inventore aperiam sunt modi, blanditiis nihil ducimus laboriosam rerum nam? Repudiandae ipsa dolore quod cumque?</div>
      </p>
      <div className={`min-h-[250px] ${currentMenu === 'preferences' ? 'block' : 'hidden'}`}>Consequuntur quas repellat assumenda blanditiis? Esse voluptate inventore aperiam sunt modi, blanditiis nihil ducimus laboriosam rerum nam? Repudiandae ipsa dolore quod cumque?</div>
      <div className={`min-h-[250px] ${currentMenu === 'about' ? 'block' : 'hidden'}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quas repellat assumenda blanditiis? Esse voluptate inventore aperiam sunt modi.</div>
      <button className='px-5 py-2 text-gray-300 rounded-md border-gray-900'>Decline</button>
      <button className='bg-gray-900 px-5 py-2 text-white rounded-lg' onClick={e => handleAcceptAll()}>Allow Cookies</button>
    </div >
    </div >
  )
}


export default Cookies
