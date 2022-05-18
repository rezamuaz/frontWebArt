import React from "react";
import TagPopularItem from "./TagPopularItem";

const TagList = [
  { tag: "indra kenz", href: "#" },
  { tag: "motogp mandalika", href: "#" },
  { tag: "asix", href: "#" },
  { tag: "ppkm level 3", href: "#" },
  { tag: "wadas", href: "#" },
  { tag: "life", href: "#" },
];

const TagPopularList = ({ style }) => {
  return (
    <section className={`my-2 h-fit w-full border-b-2 py-2 ${style}`}>
      <ul className="flex h-fit w-full flex-col">
        {TagList.map((item, index) => (
          <TagPopularItem
            key={index}
            index={index}
            href={item.href}
            tag={item.tag}
          />
        ))}
      </ul>
    </section>
  );
};

export default TagPopularList;
