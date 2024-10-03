'use client'

import { ChevronDownIcon } from "./ChevronDownIcon";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, DropdownSection } from "@nextui-org/react";
import { DataRow } from '@/types/types';

interface MultipleSelectionProps {
  list: DataRow[];
  setCounter: (value: number) => void; // setCounter тепер просто функція, що приймає значення
}


export default function MultipleSelection({ list, setCounter }: MultipleSelectionProps) {
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());

  const selectedValue = React.useMemo(() => {
    return selectedKeys.size > 0
      ? Array.from(selectedKeys).join(", ").replaceAll("_", " ")
      : "";
  }, [selectedKeys]);

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
    setCounter(keys.size)
  };

  const handleClearSelection = () => {
    setSelectedKeys(new Set());
  };

  return (
    <Dropdown className="pl-4">
      <DropdownTrigger>
        <div className="flex justify-center items-center hover:cursor-pointer max-w-40">
          <span className="mr-1 whitespace-normal">{selectedValue || "Select"}</span>
          <ChevronDownIcon />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        className="max-h-96 overflow-y-auto"
      >
        <DropdownSection title="Actions" showDivider>
          <DropdownItem key="clear_all" onClick={handleClearSelection} className="text-red-500">
            Clear All
          </DropdownItem>
          <DropdownItem key="select_all" onClick={() => handleSelectionChange(new Set(list.map(item => item.id.toString())))}>
            Select All
          </DropdownItem>
        </DropdownSection>
        
        <DropdownSection title="Items">
          {list.map((item) => {

            let src
            if (item.FN){
                src = item.FN.replace('\\', '/');
            }

            return (
              <DropdownItem className={`${item.activated ? 'bg-blue-100 font-bold' : ''} mb-2`} key={item.id.toString()} textValue={item.name?.toString()} >
                <div className={`flex items-center justify-between gap-4`}>
                  <span className={`mr-2 ${item.activated ? 'font-bold' : ''}`}>{item.name}</span>
                  {src && 
                    <Image 
                        src={`/Table_list/${src}`} 
                        alt={src} 
                        className="object-contain w-16 rounded-none"
                    />
                  }
                  
                </div>
              </DropdownItem>
            );
          })}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
