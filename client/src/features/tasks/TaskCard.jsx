import toast from 'react-hot-toast';
import { HiPlus } from 'react-icons/hi2';
import { MdCheckCircle } from 'react-icons/md';
import ButtonIcon from '../../ui/ButtonIcon';
import Card from '../../ui/Card';

import Modal from '../../ui/Modal';
import Spinner from '../../ui/Spinner';
import FormTask from './FormTask';

import TaskCardItem from './TaskCardItem';
import { useTasks } from './useTasks';
const TaskCard = () => {
  const { data: tasks, isLoading, error } = useTasks();
  if (error) {
    toast.error('There was an error');
  }

  return (
    <Card extra="pb-7 p-[20px] dark:bg-gray-700">
      {isLoading && <Spinner />}

      <div className="relative flex flex-row justify-between items-center  pr-2">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Tasks
          </h4>
        </div>
        <div>
          <Modal>
            <Modal.Open opens="add-task">
              <ButtonIcon>
                <HiPlus className="fill-cyan-500 h-6 w-6" />
              </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="add-task">
              <FormTask />
            </Modal.Window>{' '}
          </Modal>
        </div>
      </div>

      {/* task content */}

      <div className="h-full w-full">
        <div className="mt-5 p-2">
          <ul>
            {tasks &&
              tasks.map((task) => <TaskCardItem task={task} key={task._id} />)}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
