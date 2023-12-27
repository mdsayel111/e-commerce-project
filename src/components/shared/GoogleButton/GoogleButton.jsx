import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";

const GoogleButton = () => {
  const { socialLogin } = useAuth();
  const navigate = useRouter();

  const handleSocialLogin = async () => {
    try {
      await socialLogin();
      navigate.replace("/");
    } catch (err) {
      toast.err(err);
    }
  };

  return (
    <div className="">
      <div
        onClick={handleSocialLogin}
        className="flex justify-evenly border-primary border-2 p-2 rounded-md cursor-pointer"
      >
        <span className="text-text text-base font-bold">
          SignUp With Google
        </span>{" "}
        <FcGoogle className="text-2xl cursor-pointer"></FcGoogle>
      </div>
    </div>
  );
};

export default GoogleButton;
