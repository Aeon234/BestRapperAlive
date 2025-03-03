import { useState } from "react";

interface WowheadItemProps {
  id: number;
  name: string;
  ilvl: number;
  boss: string;
  bonus: string;
  slot: string;
  isSelected: boolean;
  onSelect: (item: WowheadItemData, isSelected: boolean) => void;
}

interface WowheadItemData {
  id: number;
  name: string;
  ilvl: number;
  boss: string;
  bonus: string;
  slot: string;
}

const WowheadItem: React.FC<WowheadItemProps> = ({
  id,
  name,
  ilvl,
  boss,
  bonus,
  slot,
  isSelected,
  onSelect,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent link click from selecting/unselecting the item
    if ((e.target as HTMLElement).tagName === "A") {
      return;
    }
    onSelect({ id, name, ilvl, boss, bonus, slot }, !isSelected);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-3 border ${
        isSelected
          ? "border-green-500 bg-green-950"
          : "border-gray-700 bg-gray-900"
      } rounded-md hover:bg-gray-800 transition shadow-md cursor-pointer`}
    >
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.wowhead.com/item=${id}`}
        data-wowhead={`item=${id}&ilvl=${ilvl}&bonus=${bonus}`}
        className="flex items-center"
      ></a>
      <div className="ml-4">
        <div className="font-bold text-lg text-[#a335ee]">{name}</div>
        <div className="text-gray-400 text-sm">
          {ilvl} • {boss}
        </div>
      </div>
    </div>
  );
};

interface WowheadItemSelectionProps {
  items: WowheadItemData[];
  onItemSelect: (item: WowheadItemData, isSelected: boolean) => void;
}

const WowheadItemSelection: React.FC<WowheadItemSelectionProps> = ({
  items,
  onItemSelect,
}) => {
  const [selectedItems, setSelectedItems] = useState<{
    [slot: string]: number[];
  }>({});

  const handleSelect = (item: WowheadItemData, isSelected: boolean) => {
    setSelectedItems((prev) => {
      const currentSelection = prev[item.slot] || [];
      let updatedSelection;

      if (isSelected) {
        if (item.slot === "Trinket" && currentSelection.length >= 2) {
          return prev;
        } else if (item.slot === "Very Rare" && currentSelection.length >= 1) {
          return prev;
        } else if (item.slot === "Weapon" && currentSelection.length >= 1) {
          return prev;
        }
        updatedSelection = [...currentSelection, item.id];
      } else {
        updatedSelection = currentSelection.filter((id) => id !== item.id);
      }

      return { ...prev, [item.slot]: updatedSelection };
    });

    // Call onItemSelect AFTER updating the state to avoid rendering issues
    setTimeout(() => onItemSelect(item, isSelected), 0);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {items.map((item) => (
        <WowheadItem
          key={item.id}
          {...item}
          isSelected={(selectedItems[item.slot] || []).includes(item.id)}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default WowheadItemSelection;
