
import logo_blanc from "../assets/logo/logo_blanc.svg"

const Footer = () => {
  return (
    <footer className="flex justify-around bg-noir text-ivoire">
      <div>
        <img src={logo_blanc} alt="Logo" className="h-10 relative z-10"/>
      </div>
      <div>
        <h2>CONTACT</h2>
      </div>
      <div>
        <h2>NAVIGATION</h2>
      </div>
    </footer>
  )
}

export default Footer
