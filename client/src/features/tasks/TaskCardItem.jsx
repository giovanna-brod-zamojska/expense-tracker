import { useState } from 'react';
import { HiTrash } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import Checkbox from '../../ui/Checkbox';
import { useDeleteTask } from './useDeleteTask';
import { useUpdateTask } from './useUpdateTask';

function TaskCardItem({ task }) {
  const { updateThisTask } = useUpdateTask();
  const { deleteThisTask } = useDeleteTask();
  const [isChecked, setIsChecked] = useState(task.isChecked);

  function handleCheckbox() {
    const checked = isChecked;
    setIsChecked(!checked);
    console.log(isChecked);
    updateThisTask({ _id: task._id, isChecked });
  }

  function handleDelete() {
    deleteThisTask(task._id);
  }

  return (
    <>
      <li className="relative flex flex-row justify-between gap-10">
        {task && (
          <div className="flex flex-start items-center">
            <Checkbox checked={isChecked} onChange={handleCheckbox} />
            <p className="text-base font-bold text-navy-700 dark:text-white">
              {task.description}
            </p>
          </div>
        )}
        <div className="inline-flex items-center">
          <ButtonIcon onClick={handleDelete}>
            <HiTrash />
          </ButtonIcon>
        </div>
      </li>
    </>
  );
}
export default TaskCardItem;
