import Card from './Card';

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="!flex-row  flex-grow items-center rounded-[20px] dark:bg-slate-700">
      <div className="mx-2 flex h-[80px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className=" flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 mr-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-200">
          {title}
        </p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;