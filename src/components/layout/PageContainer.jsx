import Sidebar from "./Sidebar";
import Header from "./Header";

function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <div className="ml-64 min-h-screen">

        <Header />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default PageContainer;