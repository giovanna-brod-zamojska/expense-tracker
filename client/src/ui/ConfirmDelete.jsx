import Button from './Button';

function ConfirmDelete({ resource, onConfirm, disabled, onCloseModal }) {
  function handleConfirmClick() {
    onConfirm();
  }

  return (
    <div className="w-96 flex flex-col space-y-3 p-6">
      <h1>Delete {resource}</h1>
      <p className="text-gray-500">
        Are you suro you want to delete this {resource} permanently?
      </p>

      <div className="flex justify-end space-x-3">
        <Button variation="secondary" span="secondary" onClick={onCloseModal}>
          Go back
        </Button>
        <Button
          variation="danger"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
