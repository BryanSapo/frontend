import React, { useState } from 'react';
import './Nav.css'

const Nav=()=>{
    const [navId,setNavId]=useState(localStorage.getItem('navId'))
    const [bookId,setBookId]=useState(localStorage.getItem('bookId'))
    const [isOpen, setIsOpen] = useState(false);
    const setJob=()=>{
        setNavId(localStorage.getItem('navId'));
        setBookId(localStorage.getItem('bookId'));
        localStorage.setItem('navId', navId);
        localStorage.setItem('bookId', bookId);
        // console.log(localStorage.getItem('navId'));

    }
    const openDialog = () => {
      setIsOpen(true);
    };
  
    const closeDialog = () => {
      setIsOpen(false);
    };
    return(
        <div className="Nav">
            <div className="container">
                <img className="img_logo" src="https://www1.mcu.edu.tw/Apps/SB/data/10/%E6%A0%A1%E5%BE%BD.gif"/>
                <button className="NavBtn"><a className="NavA" href="/">首頁</a></button>
                <button className="NavBtn"><a className="NavA" href="/Management">控制面板</a></button>
                <button className="NavBtn"><a className="NavA" href="/fileupload">上傳書單找書</a></button>
                <button className="NavBtn"><a className="NavA" href="/qrcode">QRCode</a></button>
                <button className="NavBtn" onClick={openDialog}>工作設定</button>
            </div>
            <div>
        {isOpen && (
          <div className="dialog">
            <div className="dialog-content">
              <button onClick={closeDialog} className="NavBtn">&times;</button>
              <h2>負責導覽的Temi</h2>
              <input onChange={(e)=>{setNavId(e.target.value)}} placeholder='填入負責導覽的Temi ID' defaultValue={navId}/>
              <h2>負責帶位取書的Temi</h2>
              <input onChange={(e)=>{setBookId(e.target.value)}} placeholder='填入負責帶位取書的Temi ID' defaultValue={bookId}/>
              <button className='NavBtn' onClick={setJob}>送出</button>
            </div>
          </div>
        )}
      </div>
        </div>
    )
}
export default Nav;