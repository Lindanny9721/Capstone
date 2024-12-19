import MapComponent from "../components/MapComponent";
import Navbar from "../components/Nav";

export default function MapPage() {
    return (
        <div className="map">
            <Navbar/>
            <MapComponent/>
        </div>
    );
}