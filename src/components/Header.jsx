const Header = () => {
  return (
    <div>
      <header className="flex justify-between items-center m-4">
        <h1 className="">Aeterna Empires</h1>
        <nav>
          <ul className="flex justify-between">
            <li>
              <a href="">Accueil</a>
            </li>
            <li>
              <a href="">Realisations</a>
            </li>
            <li>
              <a href="">Contactez Nous</a>
            </li>
            <li>
              <a href="">A Propos</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
