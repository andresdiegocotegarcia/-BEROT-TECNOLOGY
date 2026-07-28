import Card from '../components/Card';
import './About.css';

function About() {
  const tecnologias = [
    { icono: '⚛️', nombre: 'React 18', descripcion: 'Biblioteca para interfaces de usuario' },
    { icono: '⚡', nombre: 'Vite 5', descripcion: 'Herramienta de desarrollo rápida' },
    { icono: '🔀', nombre: 'React Router v6', descripcion: 'Navegación SPA' },
    { icono: '🟢', nombre: 'Node.js + Express', descripcion: 'Backend API REST' },
    { icono: '🗃️', nombre: 'Sequelize', descripcion: 'ORM para PostgreSQL' },
    { icono: '🐘', nombre: 'PostgreSQL', descripcion: 'Base de datos relacional' },
    { icono: '🎨', nombre: 'CSS Responsive', descripcion: 'Estilos personalizados adaptables' },
  ];

  const equipo = [
    { nombre: 'Nataly Dayana Medina Becerra', rol: 'Desarrolladora Full Stack' },
    { nombre: 'Diego Andrés Garcia Cote', rol: 'Desarrollador Full Stack' },
    { nombre: 'Kevin Jean Pierre Diaz Llanez', rol: 'Desarrollador Full Stack' },
  ];

  return (
    <div className="page about-page">
      <h1 className="about-title">Acerca de BEROT TECNOLOGY</h1>

      <section className="about-section">
        <Card>
          <h2 className="about-section-title">Sobre el Proyecto</h2>
          <p className="about-description">
            BEROT TECNOLOGY es un sistema web de gestión para un taller de reparación de celulares y computadores.
            Desarrollado como una herramienta interna para administrar el negocio de forma eficiente,
            cubriendo todo el ciclo de vida de las reparaciones.
          </p>
          <p className="about-description">
            El sistema permite a los técnicos gestionar órdenes de reparación, registrar clientes,
            dar seguimiento al estado de cada reparación y documentar el proceso completo desde
            la recepción del equipo hasta su entrega.
          </p>
        </Card>
      </section>

      <section className="about-section">
        <Card>
          <h2 className="about-section-title">Tecnologías Utilizadas</h2>
          <ul className="about-tech-list">
            {tecnologias.map((tech) => (
              <li key={tech.nombre} className="about-tech-item">
                <span className="about-tech-icon">{tech.icono}</span>
                <div className="about-tech-info">
                  <strong className="about-tech-name">{tech.nombre}</strong>
                  <span className="about-tech-desc">{tech.descripcion}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="about-section">
        <Card>
          <h2 className="about-section-title">Equipo de Desarrollo</h2>
          <div className="about-team-grid">
            {equipo.map((miembro, index) => (
              <div key={index} className="about-team-member">
                <div className="about-team-avatar">
                  {miembro.nombre.charAt(0)}
                </div>
                <h3 className="about-team-name">{miembro.nombre}</h3>
                <p className="about-team-role">{miembro.rol}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

export default About;
