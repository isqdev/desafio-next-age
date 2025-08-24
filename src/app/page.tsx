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
import { Checkbox } from "@heroui/checkbox";

interface ModalTaskDetailsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  taskName: string;
}

function ModalTaskDetails({ isOpen, onOpenChange, taskName }: ModalTaskDetailsProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-blue">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">
                {taskName}
            </ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
              <Button 
                className="text-white" 
                variant="light" 
                onPress={onClose}
                type="button"
              >
                Fechar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

interface ModalNewTaskProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (data: any) => void;
}

function ModalNewTask({ isOpen, onOpenChange, onSubmit }: ModalNewTaskProps) {
  const { register, handleSubmit, reset } = useForm({});

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset(); 
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-blue">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">
              Nova tarefa
            </ModalHeader>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <ModalBody>
                <input 
                  type="text" 
                  placeholder="Digite aqui sua tarefa" 
                  className="w-full p-2 rounded bg-transparent placeholder:text-gray-300 text-white outline-0" 
                  required 
                  {...register("task")}
                />
              </ModalBody>
              <ModalFooter>
                <Button 
                  className="text-white" 
                  variant="light" 
                  onPress={onClose}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red text-white"
                >
                  Adicionar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onOpenChange: onDetailsOpenChange } = useDisclosure();
  const [tasks, setTasks] = useState<string[]>(['Teste']);
  const [selectedTask, setSelectedTask] = useState<string>('');

  const handleAddTask = (data: any) => {
    setTasks(prev => [...prev, data.task]);
    onOpenChange(); 
  };

  const handleTaskClick = (task: string) => {
    setSelectedTask(task);
    onDetailsOpen();
  };
  
  return (
    <div className="w-full bg-dark-blue h-screen p-4 relative">
      <div className="mb-20">
        {tasks && tasks.map((task, index) => (
          <div 
            key={index} 
            className="flex bg-blue items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-opacity-80 transition-all"
            onClick={() => handleTaskClick(task)}
          >
            <Checkbox color="success" />
            <p className="text-white w-full ml-3">{task}</p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2">
        <Button onPress={onOpen} className="bg-danger text-white">
          <PlusIcon className="size-5"/>
          Nova tarefa
        </Button>
      </div>

      <ModalNewTask 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        onSubmit={handleAddTask}
      />
      
      <ModalTaskDetails 
        isOpen={isDetailsOpen}
        onOpenChange={onDetailsOpenChange}
        taskName={selectedTask}
      />
    </div>
  );
}