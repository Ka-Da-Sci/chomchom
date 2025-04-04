import { Link, useLocation } from "react-router-dom";


type NavBarLinkProps = {
    pathName: string;
    lintText: string;
    toProp: string;
}

const NavBarLink = ({ pathName, lintText, toProp }: NavBarLinkProps) => {
    const { pathname } = useLocation();


    return (
        <Link
        className={`w-full block p-2 font-poppins font-normal text-inherit antialiased ${pathname === `${pathName}` ? "text-primary-500" : ""}`}
        to={`${toProp}`}
      >
        {lintText}
      </Link>
    )
}

export default NavBarLink;
