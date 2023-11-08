'use client';
import { useContext, useState } from 'react';
import LightTheme from './LightTheme';
import Image from 'next/image';
import { ThemeContext } from '../../context/ThemeContext';
function ChangeTheme() {
  //eslint disable next line
  const {theme,toggleTheme} = useContext(ThemeContext);
  return (
    <div className='flex items-center'>
      <div
        onClick={toggleTheme}
        className={
          theme==='dark' ? 'react-toggle react-toggle--checked' : 'react-toggle'
        }
      >
        <div className='react-toggle-track'>
          <div className='react-toggle-track-check'>
            <Image
              src='/images/site/moon.png'
              width='16'
              height='16'
              alt='moon'
              role='presentation'
              style={{ pointerEvents: 'none' }}
            />
          </div>
          <div className='react-toggle-track-x'>
            <Image
              src='/images/site/sun.png'
              width='16'
              height='16'
              alt='sun'
              role='presentation'
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </div>
        <div className='react-toggle-thumb'></div>
        <input
          className='react-toggle-screenreader-only'
          type='checkbox'
          aria-label='Switch between Dark and Light mode'
        />
      </div>
      {theme!=='dark' && <LightTheme />}
    </div>
  );
}

export default ChangeTheme;
