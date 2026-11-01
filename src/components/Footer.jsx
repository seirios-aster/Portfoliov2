import { Link } from "react-router-dom";

import { socialLinks } from "../constants";
import { name } from "../constants";

const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className='footer font-poppins'>
      <hr className='border-slate-200' />

      <div className='footer-container'>
        <p>
          © {currentYear} <strong>{name.first} {name.last}</strong>. All rights reserved.
        </p>

        <div className='flex gap-3 justify-center items-center'>
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target='_blank'>
              <img
                src={link.iconUrl}
                alt={link.name}
                className='w-6 h-6 object-contain hover:scale-150'
                title={link.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
