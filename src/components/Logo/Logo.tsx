const Logo = () => {
  return (
    <>
      <img
        src={(process.env.REACT_APP_PUBLIC_URL || "") + "/logo.png"}
        alt="logo"
        width="30"
        height="28"
      />
    </>
  );
};

export default Logo;
