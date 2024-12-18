import "./FormWeather.css";

export function FormWeather({ city, newCity, ApiCall }) {
    const ClickForm = (e) => {
        e.preventDefault();
        ApiCall();
    };

    return (
        <form>
            <input
                className="input"
                type="text"
                placeholder="Buscar ciudad"
                onChange={(e) => newCity(e.target.value)}
                value={city}
            />
            <input type="submit" value="Buscar" className="button" onClick={ClickForm} />
        </form>
    );
}
