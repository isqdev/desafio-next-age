'use client'

import { Button } from "@heroui/button"
import { ArrowRightCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { p } from "framer-motion/client";
import {Checkbox} from "@heroui/checkbox";



export default function Home() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({});

  const [tasks, setTasks] = useState(['Teste']);

  const onSubmit = (data) => {
    setTasks(prev => [...prev, data.task]);
    reset(); 
    onOpenChange();
  };
  
  return (
    <div className="w-full bg-dark-blue h-screen p-4">
      <div className="flex justify-center">
      <Button onPress={onOpen} className="bg-red text-white absolute bottom-5">
        <PlusIcon className="size-5"/>
        Nova tarefa
      </Button>
      </div>
      {
        tasks &&
          tasks.map((task, index) => (
          <div className="flex bg-blue items-center p-2 mb-2 rounded-md">
            <Checkbox color="success" />
            <p key={index} className="text-white w-full">{task}</p>
            <ArrowRightCircleIcon className="size-7 text-white"/>
            </div>
        ))
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-blue">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">Nova tarefa</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <input type="text" placeholder="Digite aqui sua tarefa" className="placeholder:text-gray-300 text-white outline-0" required {...register("task")}></input>
              </ModalBody>
              <ModalFooter>
                <Button className="text-white" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-red text-white">
                  Adicionar
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

function ModalNewTask() 