import { AppRoutes } from './AppRoutes';
import { CookiesAlert } from './useCases/home/CookiesAlert';

function App() {
  return (
    <>
  <CookiesAlert />
    <AppRoutes />
    </>
  )
}
export default App;
