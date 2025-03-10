'use client'
import { Chapter, Course, Unit } from "@prisma/client";
import React from "react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const ConfirmChapters = ({ course }: Props) => {
    const chapterRefs: Record<string,React.RefObject<ChapterCardHandler | null>> = {};
    course.units.forEach(unit => {
        unit.chapters.forEach(chapter =>{
            chapterRefs[chapter.id] = React.useRef(null)
        })
    });
    console.log(chapterRefs);
  return (
    <div className="w-full mt-4">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                  ref={chapterRefs[chapter.id]}
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4">
        <Separator className='flex-[1]'/>
        <div className='flex items-center mx-4'>
            <Link href='/create' className={
                buttonVariants({
                    variant:"secondary"
                })
            }>
                <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4}/>
                Back
            </Link>
            <Button type='button'
            className="ml-4 font-semibold"
            onClick={()=>{
                Object.values(chapterRefs).forEach((ref)=> {
                    ref.current?.triggerLoad();
                })
            }}
            >
                <ChevronRight className="w-4 h-4 ml-2" strokeWidth={4}/>
                Generate
            </Button>

        </div>
        <Separator className="flex-[1]"/>

      </div>
    </div>
  );
};

export default ConfirmChapters;
