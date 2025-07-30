import { ITEM } from "@/text/directory";

type Tag = {
  id: number;
  name: string;
};

type TagList = {
  tags: Tag[];
};

const TagList: React.FC<TagList> = ({ tags }) => {
  return (
    <div className="py-6 border-b border-gray-200 sm:py-8">
      <h3 className="mb-4 font-bold sm:mb-5">{ITEM.SERVICES}</h3>
      {/* <p className="text-gray-500">{ITEM.SERVICES_NO}</p> */}
      <div className="flex flex-wrap gap-3">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <h4
              key={tag.id}
              className="px-[10px] py-[5px] border rounded bg-slate-50 hover:border-gray-400 hover:text-gray-600 transition duration-300 hover:cursor-default"
            >
              {tag.name}
            </h4>
          ))
        ) : (
          <p>هیچ خدماتی اضافه نشده است</p>
        )}
      </div>
    </div>
  );
};

export default TagList;
