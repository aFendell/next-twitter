export type Tab = {
  id: number;
  label: string;
};

type Props = {
  tabs: Tab[];
  selectedTab: Tab["id"];
  onChange: (id: number) => void;
};

const Tabs = ({ tabs, selectedTab, onChange }: Props) => {
  return (
    <div>
      <ul className="flex">
        {tabs.map((tab) => (
          <li className="flex-grow" key={tab.id}>
            <button
              className={`w-full p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                tab.id === selectedTab
                  ? "border-b-4 border-b-blue-500 font-bold"
                  : ""
              }`}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
