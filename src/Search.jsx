import searchIcon from './assets/search.png';
function Search() {


    function handleSearch() {
        let toSearch = document.querySelector("#search-input").value.toLowerCase();
        let resultElements = document.querySelectorAll('.note');

        if (!toSearch) {
            console.log(`Empty Search Field`)
            resultElements.forEach((element) => {  
                    element.style.display = "inline-block";
            }
            );
            return;
        }
        console.log(`searching for ${toSearch}`)

        resultElements.forEach((element) => {
            if (!element.textContent.toLowerCase().includes(toSearch)) {
                element.style.display = "none";
            }
        }
        );

    }


    return (
        <>
            <div className="search">
                <input type="text" name="find" id="search-input" placeholder="Search notes..." onChange={handleSearch} />
                {/* <button className='flex-center'>
                    <img className='white-btn-img' src={searchIcon} alt="search" />
                </button> */}
            </div>

        </>
    )
}
export default Search;