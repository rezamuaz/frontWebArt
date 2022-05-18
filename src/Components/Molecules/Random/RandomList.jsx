import RandomItem from "./RandomItem";

const RandomList = ({ props }) => {
    const getShuffledArr = (arr) => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    };

    const List = getShuffledArr(props);
    return (
        <section className="flex- mx-auto my-8 hidden h-44 max-w-[800px] lg:block">
            <ul className="flex h-min w-full flex-row justify-between overflow-x-scroll">
                {List.map((e, i) => {
                    if (i >= 0 && i <= 5) {
                        return (
                            <RandomItem
                                key={i}
                                i={i}
                                slug={e.slug}
                                imageAlt={e.image.title}
                                imageUrl={e.image.url}
                                title={e.title}
                                time={e.releaseAt}
                            />
                        );
                    }
                })}
            </ul>
        </section>
    );
};

export default RandomList;
