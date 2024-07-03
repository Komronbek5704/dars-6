import { useEffect, useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";

function App() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const fetchItems = async () => {
                try {
                    const response = await fetch("http://localhost:3000/items");

                    if (!response.ok) {
                        setError(`${response.status} ${response.statusText}`);
                        throw Error("Network request failed");
                    }

                    const data = await response.json();
                    setItems(data);
                } catch (error) {

                } finally {
                    setIsLoading(false);
                }
            };
            fetchItems();
        }, 250);
    }, []);

    return (
        <div className="App">
            <Header title="Grocery List" />
            <AddItem />
            <SearchItem />
            <main>

                {isLoading ? (
                    <p className="loading">Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <Content items={items} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default App;
