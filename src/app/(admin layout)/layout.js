import AdminNavbar from "@/components/Dashboard/AdminNavbar";

const layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto">
      <AdminNavbar />
      {children}
    </div>
  );
};

export default layout;
