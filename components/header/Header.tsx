import Link from 'next/link'
import React from 'react'
import Modal from 'react-modal';
import { FaBars } from "react-icons/fa";
import Menu from '../Menu';

const customStyles = {
  content: {
    top: '20px',
    right: '20px',
    left: 'auto',
    bottom: 'auto',
  },
};
const activeClass = "text-18 mx-4 hover:cursor-pointer is-active border-white border-dashed"
const deactiveClass = "text-18 mx-4 hover:cursor-pointer hover:border-b-2 border-white border-dashed"

const Header = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [menubtn, setMenuBTN] = React.useState('block');
  function openModal() {
    setIsOpen(true);
    setMenuBTN('none')
  }

  function closeModal() {
    setIsOpen(false);
    setMenuBTN('block')
  }
  return (
    <>
      <div className='absolute top-0 flex justify-between items-center h-[40px] w-full mt-4 px-4'  >
        <div className="navbar-nav w-full h-full flex justify-between items-center text-white md:px-4">
          <div className='md:hidden'>
            <Link href="#">
              <a className="text-lg md:text-28 hover:cursor-pointer" style={{display:menubtn}} onClick={openModal}>
                <FaBars/>
              </a>
            </Link>
          </div>
          <div className='hidden md:block font-normal js-nav'>
            <Link href="/">
              <a className={deactiveClass}>
                Home
              </a>
            </Link>
            <Link href="/service">
              <a className={deactiveClass}>
                Products
              </a>
            </Link>
            <Link href="/contact">
              <a className={deactiveClass}>
                About Us
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >        
        <Menu/>
      </Modal>
    </>
  )
}

export default Header
