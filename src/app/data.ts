import { StaticImageData } from 'next/image'

import Color1 from '../../public/Table_list/Colors/E01.jpg'
import Color2 from '../../public/Table_list/Colors/E02.jpg'
import Color3 from '../../public/Table_list/Colors/E03.jpg'
import Color4 from '../../public/Table_list/Colors/E04.jpg'
import Color16 from '../../public/Table_list/Colors/E016.jpg'
import Color17 from '../../public/Table_list/Colors/E017.jpg'
import Color18 from '../../public/Table_list/Colors/E018.jpg'
import Color20 from '../../public/Table_list/Colors/E020.jpg'
import Color21 from '../../public/Table_list/Colors/E021.jpg'
import Color22 from '../../public/Table_list/Colors/E022.jpg'

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: true},
    {name: "AGE", uid: "age", sortable: true},
    {name: "ROLE", uid: "role", sortable: true},
    {name: "TEAM", uid: "team"},
    {name: "EMAIL", uid: "email"},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ACTIONS", uid: "actions"},
  ];
  
  type StatusOption = {
    name: string;
    uid: string;
  };
  
  const statusOptions: StatusOption[] = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];

  const teamOptions = [
    {name: "Management", uid: "management"},
    {name: "Development", uid: "development"},
    {name: "Marketing", uid: "marketing"},
  ];

  const folderPath = '../../../public/Table_list'

  type colorsOptionType = {
    src: string;
    alt: string;
    uid: string;
  }

  const colorsOptions : colorsOptionType[] = [
    { src: Color1.src, alt: "E01.JPG", uid: "E01.JPG" },
    { src: Color2.src, alt: "E02.JPG", uid: "E02JPG" },
    { src: Color3.src, alt: "E03.JPG", uid: "E03.JPG" },
    { src: Color4.src, alt: "E04.JPG", uid: "E04.JPG" },
    { src: Color16.src, alt: "E016.JPG", uid: "E016.JPG" },
    { src: Color17.src, alt: "E017.JPG", uid: "E017.JPG" },
    { src: Color18.src, alt: "E018.JPG", uid: "E018.JPG" },
    { src: Color20.src, alt: "E020.JPG", uid: "E020.JPG" },
    { src: Color21.src, alt: "E021.JPG", uid: "E021.JPG" },
    { src: Color22.src, alt: "E022.JPG", uid: "E022.JPG" },
  ];
  
  
  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
      color: colorsOptions[0]
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Tech Lead",
      team: "development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
      color: colorsOptions[1]
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Sr. Dev",
      team: "development",
      status: "active",
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com",
      color: colorsOptions[2]
    },
    {
      id: 4,
      name: "William Howard",
      role: "C.M.",
      team: "marketing",
      status: "vacation",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com",
      color: colorsOptions[0]
    },
    // {
    //   id: 5,
    //   name: "Kristen Copper",
    //   role: "S. Manager",
    //   team: "marketing",
    //   status: "active",
    //   age: "24",
    //   avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    //   email: "kristen.cooper@example.com",
    // },
    // {
    //   id: 6,
    //   name: "Brian Kim",
    //   role: "P. Manager",
    //   team: "management",
    //   age: "29",
    //   avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    //   email: "brian.kim@example.com",
    //   status: "active",
    // },
    // {
    //   id: 7,
    //   name: "Michael Hunt",
    //   role: "Designer",
    //   team: "marketing",
    //   status: "paused",
    //   age: "27",
    //   avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    //   email: "michael.hunt@example.com",
    // },
    // {
    //   id: 8,
    //   name: "Samantha Brooks",
    //   role: "HR Manager",
    //   team: "development",
    //   status: "active",
    //   age: "31",
    //   avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    //   email: "samantha.brooks@example.com",
    // },
    // {
    //   id: 9,
    //   name: "Frank Harrison",
    //   role: "F. Manager",
    //   team: "development",
    //   status: "vacation",
    //   age: "33",
    //   avatar: "https://i.pravatar.cc/150?img=4",
    //   email: "frank.harrison@example.com",
    // },
    // {
    //   id: 10,
    //   name: "Emma Adams",
    //   role: "Ops Manager",
    //   team: "development",
    //   status: "active",
    //   age: "35",
    //   avatar: "https://i.pravatar.cc/150?img=5",
    //   email: "emma.adams@example.com",
    // },
    // {
    //   id: 11,
    //   name: "Brandon Stevens",
    //   role: "Jr. Dev",
    //   team: "development",
    //   status: "active",
    //   age: "22",
    //   avatar: "https://i.pravatar.cc/150?img=8",
    //   email: "brandon.stevens@example.com",
    // },
    // {
    //   id: 12,
    //   name: "Megan Richards",
    //   role: "P. Manager",
    //   team: "management",
    //   status: "paused",
    //   age: "28",
    //   avatar: "https://i.pravatar.cc/150?img=10",
    //   email: "megan.richards@example.com",
    // },
    // {
    //   id: 13,
    //   name: "Oliver Scott",
    //   role: "S. Manager",
    //   team: "management",
    //   status: "active",
    //   age: "37",
    //   avatar: "https://i.pravatar.cc/150?img=12",
    //   email: "oliver.scott@example.com",
    // },
    // {
    //   id: 14,
    //   name: "Grace Allen",
    //   role: "M. Specialist",
    //   team: "marketing",
    //   status: "active",
    //   age: "30",
    //   avatar: "https://i.pravatar.cc/150?img=16",
    //   email: "grace.allen@example.com",
    // },
    // {
    //   id: 15,
    //   name: "Noah Carter",
    //   role: "IT Specialist",
    //   team: "management",
    //   status: "paused",
    //   age: "31",
    //   avatar: "https://i.pravatar.cc/150?img=15",
    //   email: "noah.carter@example.com",
    // },
    // {
    //   id: 16,
    //   name: "Ava Perez",
    //   role: "Manager",
    //   team: "management",
    //   status: "active",
    //   age: "29",
    //   avatar: "https://i.pravatar.cc/150?img=20",
    //   email: "ava.perez@example.com",
    // },
    // {
    //   id: 17,
    //   name: "Liam Johnson",
    //   role: "Data Analyst",
    //   team: "management",
    //   status: "active",
    //   age: "28",
    //   avatar: "https://i.pravatar.cc/150?img=33",
    //   email: "liam.johnson@example.com",
    // },
    // {
    //   id: 18,
    //   name: "Sophia Taylor",
    //   role: "QA Analyst",
    //   team: "management",
    //   status: "active",
    //   age: "27",
    //   avatar: "https://i.pravatar.cc/150?img=29",
    //   email: "sophia.taylor@example.com",
    // },
    // {
    //   id: 19,
    //   name: "Lucas Harris",
    //   role: "Administrator",
    //   team: "management",
    //   status: "paused",
    //   age: "32",
    //   avatar: "https://i.pravatar.cc/150?img=50",
    //   email: "lucas.harris@example.com",
    // },
    // {
    //   id: 20,
    //   name: "Mia Robinson",
    //   role: "Coordinator",
    //   team: "management",
    //   status: "active",
    //   age: "26",
    //   avatar: "https://i.pravatar.cc/150?img=45",
    //   email: "mia.robinson@example.com",
    // },
  ];
  
  export {columns, users, statusOptions, teamOptions, colorsOptions};