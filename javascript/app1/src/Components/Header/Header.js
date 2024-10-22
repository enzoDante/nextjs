// components/Header.js
import Link from 'next/link';
// import styles from './Header.module.css'; // Para estilos, se necessário
import '@/Styles/header.css'

const Header = () => {
  return (
    <header className={'header'}>
      <nav>
        <ul className={'navList'}>
          <li>
            <Link href="/">
              <p className={'navLink'}>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/EditorImagem">
              <p className={'navLink'}>Editor de imagem</p>
            </Link>
          </li>
          <li>
            <Link href="/servicos">
              <p className={'navLink'}>Serviços</p>
            </Link>
          </li>
          <li>
            <Link href="/contato">
              <p className={'navLink'}>Contato</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;