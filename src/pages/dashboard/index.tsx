import Header from './header';
import Main from './main';
import Nav from './nav';
import NavSidebar from './navSidebar';

export default function DashBoardLayout() {
  return (
    <div>
      <Header />
      <Main />
      <Nav />
      <NavSidebar />
    </div>
  );
}
