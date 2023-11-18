"use client";

import { BillboardColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";
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
import axios from "axios";
import { useState } from "react";
import AlertModal from "@/components/modal/alert-modal";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {

  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      toast.success('Bilboard deleted!', {
        style: {
          border: '3px solid white',
          padding: '26px',
          color: 'white',
          backgroundColor: '#262502'
        },
        iconTheme: {
          primary: 'white',
          secondary: '#262502',
        },
      });
      router.refresh();
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first.', {
        style: {
          border: '3px solid white',
          padding: '26px',
          color: 'white',
          backgroundColor: '#b51037'
        },
        iconTheme: {
          primary: 'white',
          secondary: '#b51037',
        },
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

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
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </div>
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
            onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
            className="flex m-2 hover:opacity-75 cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="flex m-2 hover:opacity-75 cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

