import "../Styles/Footer.css"
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5 } from "react-icons/fa"

export const Footer = () => {
  return (
    <div className="footer">
      <p>
        Designed & Built by <span>Wilfredo Diaz</span>
      </p>
      <div className="footer--icons">
        <FaReact />
        <FaNodeJs />
        <FaCss3Alt />
        <FaHtml5 />
      </div>
    </div>
  )
}
