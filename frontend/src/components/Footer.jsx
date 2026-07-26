import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          BEROT TECNOLOGY &copy; {currentYear} - Sistema de Gestión de Reparaciones
        </p>
        <p className="footer-credits">
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
