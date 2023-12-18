import React from "react";
import "../Footer/Footer.css";
import { FaUserDoctor} from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";





const Footer = () => {
  return (
    <footer className="footer">
      <p> <FaUserDoctor/>Doctor: Safal Vishwakarma (MBBS)</p>
      <p>
        <strong><RiDoubleQuotesL/>Health is Wealth<RiDoubleQuotesR/></strong>
      </p>
      <p>
        <MdLocalHospital />Wellness Clinic
      </p>
    </footer>
  );
};

export default Footer;
