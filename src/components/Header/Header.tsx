import "./Header.css";
import { Flex } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import HeaderSearchBar from "./HeaderSearchBar";
import Logo from "@components/Logo";
import { baseConfig } from "@constants/config";

const Header = () => {
  return (
    <div className="header">
      <Flex
        direction="row"
        alignItems="center"
        wrap="nowrap"
        gap="1rem"
        justifyContent="space-between"
      >
        <div className="header-left">
          <div className="header-logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <span>{baseConfig.header}</span>
        </div>

        <div className="header-right">
          {baseConfig.search && <HeaderSearchBar />}

          <HeaderNav />
        </div>
      </Flex>
    </div>
  );
};

export default Header;
