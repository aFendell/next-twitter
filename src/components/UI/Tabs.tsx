export type TabOption = {
  value: string;
};

type Props<T extends TabOption> = {
  tabs: ReadonlyArray<T>;
  selectedTab: T;
  onSelect: (arg: T) => void;
};

const Tabs = <T extends TabOption>({
  tabs,
  selectedTab,
  onSelect,
}: Props<T>) => {
  return (
    <div>
      <ul className="flex">
        {tabs.map((tab) => (
          <li className="flex flex-grow justify-center" key={tab.value}>
            <button
              className={`p-2 hover:bg-gray-200 focus-visible:bg-white ${
                tab.value === selectedTab.value
                  ? "border-b-4 border-b-blue-500 bg-white font-bold"
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
