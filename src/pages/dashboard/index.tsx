import Header from './header';
import Main from './main';
import Nav from './nav';
import NavHorizontal from './navHorizontal';

export default function DashBoardLayout() {
  return (
    <div>
      <Header />
      <Main />
      <Nav />
      <NavHorizontal />
    </div>
  );
}
