import { Link } from "react-router-dom";
import BannerImg from "../../../assets/banner.svg";

export default function Banner() {
    return (
        <div className="flex items-center">
            <Link to="/">
                <img src={BannerImg} alt="Boardly" />
            </Link>
        </div>
    );
}
