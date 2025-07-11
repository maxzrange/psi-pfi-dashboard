import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span>
        © MaxzRange {new Date().getFullYear()}, Made by {""}
        <a href="https://github.com/maxrange" target="_blank" rel="noreferrer">
          maxrange
        </a>
      </span>
    </div>
  );
};

export default Footer;
