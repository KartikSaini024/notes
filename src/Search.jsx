import searchIcon from './assets/search.png';
function Search() {

    // should take notes from object array

    let existingNotes = document.querySelectorAll('.note');


    function handleSearch() {
        let toSearch = document.querySelector("#search-input").value.toLowerCase();
        let resultElements = existingNotes;

        if (!toSearch) {
            console.log(`Empty Search Field`)
            resultElements.forEach((element) => {
                element.style.display = "inline-block";
            }
            );
            return;
        }
        console.log(`searching for ${toSearch}`)

        // first make all elements visible
        resultElements.forEach((element) => {
            element.style.display = "inline-block";
        });

        // Then hide unmatched elements
        resultElements.forEach((element) => {
            // if element doesnt include toSearch
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