import { Typography } from "@mui/material";
import Image from "next/legacy/image";

const Logo = () => {
  return (
    <div id="logo" className="flex items-center py-2">
      <div
        style={{
          position: "relative",
          width: "50px",
          height: "50px",
        }}
      >
        <Image
          src={"/image/logo.jpeg"}
          alt={"logo"}
          width={100}
          height={100}
          layout="responsive"
          className="rounded-full"
        />
      </div>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          ml: 2,
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Digital Dokan
      </Typography>
    </div>
  );
};

export default Logo;
