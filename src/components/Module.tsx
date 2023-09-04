import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from "../Zustand-store";

interface ModuleProps{
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ title, amountOfLessons, moduleIndex }: ModuleProps){
    const {currentLessonIndex,  currentModuleIndex, play, lessons } = useStore(store =>{
      return{
      lessons: store.course?.modules[moduleIndex].lessons,
      currentLessonIndex: store.currentLessonIndex,  
      currentModuleIndex: store.currentModuleIndex, 
      play: store.play
    }
  })
  return(
    
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0} >
    <div>
      <Collapsible.Trigger className='flex w-full items-center gap-5
       bg-zinc-800 p-4' >
        <div className='flex w-10 h-10 rounded-full 
        items-center justify-center bg-zinc-950 text-xs' >
          {moduleIndex + 1}
        </div>
        <div className='flex flex-col gap-1 text-left'>
          <strong>{title}</strong>
          <span className='text-xs text-zinc-400' >{amountOfLessons} aulas</span>
        </div>
        <ChevronDown className='w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform' />
      </Collapsible.Trigger>
    </div>
    <Collapsible.Content> 
    <nav className='realative flex flex-col gap-4 p-6'>
    
    {lessons && lessons.map((lesson, lessonIndex) =>{
      const isCurrent = currentModuleIndex === moduleIndex && 
      currentLessonIndex === lessonIndex
      
      return(
        <Lesson 
        key={lesson.id} 
        title={lesson.title} 
        duration={lesson.duration} 
        onPlay = {()=> play([moduleIndex, lessonIndex])}
        isCurrent = {isCurrent}
        />
      )
   })}

    </nav> 
    </Collapsible.Content>
  </Collapsible.Root>
 

  )
}