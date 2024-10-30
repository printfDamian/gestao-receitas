async function getData() {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    try {
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error("Error: " + error.message);
    }
}

getData();