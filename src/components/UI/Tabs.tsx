export type TabOption = {
  value: string;
};

type Props<T extends ReadonlyArray<TabOption>> = {
  tabs: T;
  selectedTab: T[number];
  onSelect: (arg: T[number]) => void;
};

const Tabs = <T extends ReadonlyArray<TabOption>>({
  tabs,
  selectedTab,
  onSelect,
}: Props<T>) => {
  return (
    <div>
      <ul className="flex">
        {tabs.map((tab) => (
          <li className="flex-grow" key={tab.value}>
            <button
              className={`w-full p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                tab.value === selectedTab.value
                  ? "border-b-4 border-b-blue-500 font-bold"
                  : ""
              }`}
              onClick={() => onSelect(tab)}
            >
              {tab.value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
