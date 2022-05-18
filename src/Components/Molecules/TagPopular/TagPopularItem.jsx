const TagPopularItem = ({ index, href, tag }) => {
  return (
    <li className="my-1 h-fit w-full" key={index}>
      <a className="flex flex-row" href={href}>
        <span className="text h-fit w-12 px-2 pb-1 text-center align-top text-lg italic text-slate-400">
          {"#" + (index + 1)}
        </span>
        <div className="flex h-fit w-[calc(100%-3rem)] flex-col pl-1">
          <span className="h-fit w-full text-ellipsis whitespace-pre-wrap text-base font-semibold line-clamp-3">
            {tag}
          </span>
        </div>
      </a>
    </li>
  );
};

export default TagPopularItem;
