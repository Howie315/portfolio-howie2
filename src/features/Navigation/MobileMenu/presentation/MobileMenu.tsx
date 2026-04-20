import "./MobileMenu.scss";

type MobileMenuProps = {
  closeMenu: () => void;
};

const MobileMenu = ({ closeMenu }: MobileMenuProps): React.JSX.Element => {
  const handleClick = (): void => {
    closeMenu();
  };

  return (
    <div className="mobile-menu">
      <ul>
        <li>
          <a href="#about" onClick={handleClick}>
            About
          </a>
        </li>
        <li>
          <a href="#experience" onClick={handleClick}>
            Experience
          </a>
        </li>
        <li>
          <a href="#projects" onClick={handleClick}>
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" onClick={handleClick}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
