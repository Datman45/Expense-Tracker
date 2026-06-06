import { AccountContext } from "@/contex/AccountContex";
import NavLinks from "next/link";
import { useContext } from "react";

export default function Header() {
  const { accountInfo, setAccountInfo } = useContext(AccountContext);

  return (
    <header>
      <nav>
        <div className="project-name">
          <p>Expense Tracker</p>
        </div>
        <div className="nav-links">
          <NavLinks className="nav-link" href="/">
            Home
          </NavLinks>
          {accountInfo?.token && (
            <NavLinks className="nav-link" href="/expenses">
              Expenses
            </NavLinks>
          )}

          {!accountInfo?.token && (
            <NavLinks className="nav-link" href="/login">
              Login
            </NavLinks>
          )}

          {!accountInfo?.token && (
            <NavLinks className="nav-link" href="/register">
              Register
            </NavLinks>
          )}

          {accountInfo?.token && (
            <NavLinks
              className="nav-link"
              href="#"
              onClick={() => {
                setAccountInfo!({});
              }}
            >
              Logout
            </NavLinks>
          )}
        </div>
      </nav>
    </header>
  );
}
