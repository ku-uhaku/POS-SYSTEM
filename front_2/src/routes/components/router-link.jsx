import { Link } from "react-router-dom";

export function RouterLink({ href, ref, ...other }) {
  return <Link ref={ref} to={href} {...other} />;
}
