import Test from "@/components/Test/Test";
import Navbar from "@/components/shared/Navbar/Navbar";

const userLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default userLayout;
