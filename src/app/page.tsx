'use client'

import { Button } from "@heroui/button";
import { Checkbox, Input } from "@heroui/react";
import { div, p } from "framer-motion/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';

export default function Home() {
  const [tasks, setTasks] = useState<{task: string, description: string}[]>([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm(); 

  const onSubmit = (data: any) => {
    setTasks(prev => [...prev, { task: data.task, description: data.description }]);
    reset(); 
  };

  return (
    <div className="">
      <p>Tarefas:</p>
      {tasks.map((task, index) => <p key={index}>{task.task}</p>)}
      <div className="bg-amber-50 absolute bottom-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button color="primary" type="submit">Enviar</Button>
          <input type="text" className="w-full font-bold" {...register("task")} />
          <textarea className="w-full" {...register("description")} />
        </form>
      </div>
    </div>
  );
}
