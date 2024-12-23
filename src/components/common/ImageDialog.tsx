import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

type AppDialogProps = {
    trigger: React.ReactNode;
    title: string;
    open: boolean;
    images: string[];
    zIndex?: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const ImageDialog = ({ trigger, images, title, setOpen, open, zIndex = 85 }: AppDialogProps) => {
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent style={{ zIndex: zIndex }} className=" fixed top-0 left-0 translate-x-0 translate-y-0 max-w-screen w-screen h-screen flex flex-col  ">
                    <DialogHeader className=" border-b h-[60px] ">
                        <DialogTitle className=" font-[500] text-[20px]  leading-[20px] px-3 md:px-10 text-[#0A0A0A] ">
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className=" flex-grow   ">
                        <div className="px-3 md:px-20 max-w-4xl mx-auto space-y-5 mt-5">
                            {images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    width={1000}
                                    height={1000}
                                    alt=""
                                    className=" w-full block"
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ImageDialog;
