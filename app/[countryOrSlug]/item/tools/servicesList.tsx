import { ITEM } from "@/app/text/directory";

type Service = {
  id: number;
  name: string;
};

const services: Service[] = [
  { id: 1, name: "آرایشگاه زنانه" },
  { id: 2, name: "فر و مش" },
  { id: 3, name: "پاکسازی پوست" },
  { id: 4, name: "ناخن" },
  { id: 5, name: "کاشت مژه" },
  { id: 6, name: "رنگ مو" },
  { id: 7, name: "رنگ مو" },
  { id: 8, name: "رنگ مو" },
  { id: 9, name: "رنگ مو" },
  { id: 10, name: "رنگ مو" },
  { id: 11, name: "رنگ مو" },
];

const ServicesList: React.FC = () => {
  return (
    <div className="py-6 border-b border-gray-200 sm:py-8">
      <h3 className="mb-4 font-bold sm:mb-5">{ITEM.SERVICES}</h3>
      {/* <p className="text-gray-500">{ITEM.SERVICES_NO}</p> */}
      <div className="flex flex-wrap gap-3">
        {services.map((service) => (
          <h4
            key={service.id}
            className="px-[10px] py-[5px] border rounded bg-slate-50 hover:border-gray-400 hover:text-gray-600 transition duration-300 hover:cursor-default"
          >
            {service.name}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
