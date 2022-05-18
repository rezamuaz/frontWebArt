import { RiSearchLine } from "src/Assets/RemixIcon";

const Search = ({ handleShow, handleText, onSubmit, handleClick, text }) => {
    return (
        <div className="absolute right-12 h-fit w-fit justify-center md:relative md:inline-flex">
            <button className="md:hidden" onClick={(e) => handleShow(e)}>
                <RiSearchLine title="search" titleId="search" />
            </button>
            <form onSubmit={onSubmit} className="hidden md:block">
                <input
                    type="text"
                    className="h-fit rounded-2xl border-2 py-2 pr-8 pl-5 focus:shadow focus:outline-none md:w-60"
                    placeholder="Cari Berita..."
                    value={text}
                    onChange={(e) => handleText(e.target.value)}
                />
                <button
                    className="dark-text absolute right-2 h-full align-middle"
                    type="submit"
                    onClick={(e) => handleClick(e)}
                >
                    <RiSearchLine title="search" titleId="search" />
                </button>
            </form>
        </div>
    );
};

export default Search;
