import { profile } from "../constants";
import { scrollToId } from "../lib/scroll";
import { ArrowUp } from "./Icons";

const Footer = () => (
  <footer className='relative z-10 border-t border-white/10'>
    <div className='container-page flex flex-col items-center justify-between gap-4 py-10 text-sm text-white/50 sm:flex-row'>
      <p>
        © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Built with React, three.js and Framer Motion.
      </p>
      <button type='button' onClick={() => scrollToId("top")} className='btn-ghost !py-2 text-sm'>
        Back to top <ArrowUp width={16} height={16} />
      </button>
    </div>
  </footer>
);

export default Footer;
