import { useState } from "react";
const Footer = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light');
    return (
        <div className="col-12 border-top">
            <footer className={"col-12 bg-gray ms-5 p-3 text-blue " + (theme == 'light' ? 'bg-light' : 'bg-dark text-white')}>
                copyright 2016 <a href="mailto:anara_n7@mail.ru">anara_n7@mail.ru</a>
            </footer>
            </div>
            );
};

            export default Footer;
