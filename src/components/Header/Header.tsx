import React from 'react';
import s from "./Header.module.css";
import { NavLink } from 'react-router-dom';

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
    logout: () => void
}

const Header: React.FC<HeaderPropsType> = ({login, logout, isAuth}) => {
    console.log(isAuth);
    return <header className={s.header}>
        <img className={s.header__image} src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
    
        <div className={s.loginBlock}>
        { isAuth ? 
            <div>{login} - <button onClick={logout}>Log out</button></div> : 
            <NavLink className={s.loginBlock} to={'/login'}>Login</NavLink>
        }
            
        </div>
    </header>
}

export default Header;