"use client";

import { BillboardColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to the clipboard.", {
      style: {
        border: '3px solid white',
        padding: '26px',
        color: 'white',
        backgroundColor: 'rgb(236, 17, 232)'
      },
      iconTheme: {
        primary: 'white',
        secondary: 'rgb(236, 17, 232)',
      },

    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='ghost' className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className="
            w-36
            shadow-2xl
            rounded-md
            p-4
           bg-white
           border-double border-4 border-sky-500
        "
      >
        <DropdownMenuLabel className="">Actions</DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className="flex m-2 cursor-pointer hover:opacity-75"
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => ''}
          className="flex m-2 hover:opacity-7"
        >
          <Edit className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => ''}
          className="flex m-2 hover:opacity-7"
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

