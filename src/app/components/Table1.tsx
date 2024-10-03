'use client'; 

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image
} from "@nextui-org/react";
import { ChevronDownIcon } from "./ChevronDownIcon";
import MultipleSelection from "./selection";
import { DataRow } from '@/types/types';

interface TableFilter1Props {
  data: Row[];
  colorDict: {
    [key: string]: DataRow[]
  } 
  legsDict: {
    [key: string]: DataRow[]
  }
  sizesDict: {
    [key: string]: DataRow[]
  }
  edgesDict: {
    [key: string]: DataRow[]
  }
  materialsDict: {
    [key: string]: DataRow[]
  }
}

type Row = {
  Model: string;
  ModelFN: string;
  Qty: number;
};

interface Counters {
  color: number;
  size: number;
  edge: number;
  leg: number;
  material: number
}

export default function TableFilter1({ data, colorDict, legsDict, sizesDict, edgesDict, materialsDict }: TableFilter1Props) {
  
  // Лічильники для кожної моделі зберігаються окремо
  const [counters, setCounters] = useState<{ [key: number]: Counters }>({});

  // Функція для оновлення лічильника для конкретної моделі
  const updateCounter = (index: number, key: keyof Counters, value: number) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [index]: {
        ...prevCounters[index],
        [key]: value,
      }
    }));
  };

  return (
    <div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        >
        <TableHeader>
          <TableColumn className="font-bold text-center text-lg w-24">Model</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Size</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Edge</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Leg</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Color</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Mechanism</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Surface</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Material</TableColumn>
          <TableColumn className="font-bold text-center text-lg w-24">Qty</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => {
            const src = row.ModelFN.replace('\\', '/');
            const legs = legsDict[row.Model]
            const sizes = sizesDict[row.Model]
            const edges = edgesDict[row.Model]
            const colors = colorDict[row.Model]
            const materials = materialsDict[row.Model]

            return (
              <TableRow 
                key={rowIndex} 
                className="bg-white border-b hover:bg-gray-100 transition-colors duration-200"
                aria-labelledby={`row-${rowIndex}`}
              >
                
                <TableCell>
                  <div className="text-gray-800 flex flex-col justify-center">
                    <Image 
                      src={`/Table_list/${src}`} 
                      alt={`Image for ${row.Model}`}
                      className="rounded-none"
                    />
                    <span className="text-center">{row.Model}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800">
                  <div className="flex justify-center items-center">
                    <MultipleSelection 
                      list={sizes} 
                      setCounter={(value: number) => updateCounter(rowIndex, 'size', value)} 
                      aria-label="Select Size" 
                    />
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800">
                  <div className="flex justify-center items-center">
                    <MultipleSelection 
                      list={edges} 
                      setCounter={(value: number) => updateCounter(rowIndex, 'edge', value)} 
                      aria-label="Select Edge" 
                    />
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800">
                  <div className="flex justify-center items-center">
                    <MultipleSelection 
                      list={legs} 
                      setCounter={(value: number) => updateCounter(rowIndex, 'leg', value)} 
                      aria-label="Select Leg" 
                    />
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800">
                  <MultipleSelection 
                    list={colors} 
                    setCounter={(value: number) => updateCounter(rowIndex, 'color', value)} 
                    aria-label="Select Color" 
                  />
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800">
                  <div className="flex justify-center items-center" aria-label="Select Mechanism">
                    <span className="mr-1">---</span>
                    {/* <ChevronDownIcon aria-label="Open mechanism dropdown" /> */}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800">
                  <div className="flex justify-center items-center" aria-label="Select Surface">
                    <span className="mr-1">---</span>
                    {/* <ChevronDownIcon aria-label="Open surface dropdown" /> */}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800">
                  <div className="flex justify-center items-center" aria-label="Select Surface">
                    {/* <span className="mr-1">Select</span>
                    <ChevronDownIcon aria-label="Open surface dropdown" /> */}
                    <MultipleSelection 
                      list={materials} 
                      setCounter={(value: number) => updateCounter(rowIndex, 'material', value)} 
                      aria-label="Select Color" 
                    />
                  </div>
                </TableCell>
                <TableCell className="p-4 text-center text-gray-800 font-bold">
                {
                  counters[rowIndex]?.color && 
                  counters[rowIndex]?.size && 
                  counters[rowIndex]?.edge && 
                  counters[rowIndex]?.leg &&
                  counters[rowIndex]?.material 
                  ? counters[rowIndex].color * counters[rowIndex].size * counters[rowIndex].edge * counters[rowIndex].leg * counters[rowIndex].material
                  : 0
                }
              </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>      
    </div>
  );
}
