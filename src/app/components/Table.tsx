'use client'; 

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Image
} from "@nextui-org/react";

import { columns, users, statusOptions, teamOptions, colorsOptions } from "../data";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { StaticImageData } from "next/image";

type colorsOptionType = {
  src: string;
  alt: string;
  uid: string
}

type UserType = {
  id: number;
  name: string;
  avatar: string;
  email: string;
  role: string;
  status: string;
  team: string;
  color: colorsOptionType;
};

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableFilter() {
  // Initialize state with all options for filters
  const [statusFilter, setStatusFilter] = React.useState<string[]>(statusOptions.map(option => option.uid));
  const [teamFilter, setTeamFilter] = React.useState<string[]>(teamOptions.map(option => option.uid));
  const [colorFilter, setColorFilter] = React.useState<colorsOptionType[]>(colorsOptions);

  const filteredItems = React.useMemo(() => {
    return users.filter((user) =>
      (statusFilter.length === 0 || statusFilter.includes(user.status)) &&
      (teamFilter.length === 0 || teamFilter.includes(user.team)) &&
      (colorFilter.length === 0 || colorFilter.includes(user.color)) 
      
    );
  }, [statusFilter, teamFilter, colorFilter]);

  const renderCell = (user: UserType, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return <User avatarProps={{ src: user.avatar }} name={user.name} description={user.email} />;
      case "role":
        return <div>{user.role}</div>;
      case "team":
        return <div>{user.team}</div>;
        case "color":
          return (
            <Image 
              src={`/Table_list/Colors/${user.color.alt}`} // Шлях до зображення
              alt='' // Опис зображення
              width={50}  // Ширина
              height={50} // Висота
            />
          );
      case "status":
        return <Chip color={statusColorMap[user.status]}>{user.status}</Chip>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableColumn className="pl-4">Name</TableColumn>
          <TableColumn className="text-center">Role</TableColumn>
          <TableColumn>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex justify-center items-center">
                  <h3 className="m-1 cursor-pointer">Filter Status</h3>
                  <ChevronDownIcon />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={new Set(statusFilter)}
                selectionMode="multiple"
                onSelectionChange={(keys) => setStatusFilter(Array.from(keys) as string[])}
                closeOnSelect={false}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid}>{status.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </TableColumn>
         
          <TableColumn>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex justify-center items-center">
                  <h3 className="m-1 cursor-pointer">Filter Team</h3>
                  <ChevronDownIcon />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={new Set(teamFilter)}
                selectionMode="multiple"
                onSelectionChange={(keys) => setTeamFilter(Array.from(keys) as string[])}
                closeOnSelect={false}
              >
                {teamOptions.map((team) => (
                  <DropdownItem key={team.uid}>{team.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </TableColumn>
          <TableColumn>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex justify-center items-center">
                  <h3 className="m-1 cursor-pointer">Filter Color</h3>
                  <ChevronDownIcon />
                </div>
              </DropdownTrigger>
              <DropdownMenu
  disallowEmptySelection
  selectedKeys={new Set(colorFilter.map(color => color.uid))} // Використовуйте uid для перевірки вибору
  selectionMode="multiple"
  onSelectionChange={(keys) => {
    // Приведемо keys до масиву рядків
    const selectedKeys = Array.from(keys) as string[]; // Приводимо до масиву рядків
    const selectedColors = colorsOptions.filter(color => selectedKeys.includes(color.uid)); // Зберігаємо обрані кольори
    setColorFilter(selectedColors); // Зберігаємо обрані кольори
  }}
  closeOnSelect={false}
>
  {colorsOptions.map((color) => (
    <DropdownItem key={color.uid}>{color.alt}</DropdownItem> // Відображення alt
  ))}
</DropdownMenu>



            </Dropdown>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {filteredItems.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{renderCell(user, "name")}</TableCell>
              <TableCell className="text-center">{renderCell(user, "role")}</TableCell>
              <TableCell className="text-center">{renderCell(user, "status")}</TableCell>
              <TableCell className="text-center">{renderCell(user, "team")}</TableCell>
              <TableCell className="text-center">{renderCell(user, "color")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </div>
  );
}
