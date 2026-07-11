import Header from './components/layout/Header.jsx';
import SplitScreen from './components/layout/SplitScreen.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />
      
      <main className="flex-1 p-6 max-w-[1400px] mx-auto w-full h-[calc(100vh-73px)]">
         <SplitScreen />
      </main>
    </div>
  );
}