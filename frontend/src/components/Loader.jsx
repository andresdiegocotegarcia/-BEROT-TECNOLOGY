import './Loader.css';

function Loader({ message = 'Cargando...' }) {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader-spinner" aria-hidden="true"></div>
      <p className="loader-message">{message}</p>
    </div>
  );
}

export default Loader;
