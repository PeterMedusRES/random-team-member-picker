const PickerConfirmation = ({
  chosenTeamMember,
  onAccept,
  onCancel,
}: {
  chosenTeamMember: string;
  onAccept?: () => void;
  onCancel?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <em className="text-2xl">
        <strong>{chosenTeamMember}</strong> was chosen!
      </em>
      <p className="text-2xl">Do you accept this choice?</p>
      <div className="flex gap-4 pt-3">
        <button
          className="w-32 rounded-lg bg-green-500 px-4 py-2 text-xl font-medium text-white hover:bg-green-400"
          onClick={onAccept}
        >
          Yes
        </button>
        <button
          className="w-32 rounded-lg bg-red-500 px-4 py-2 text-xl font-medium text-white hover:bg-red-400"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default PickerConfirmation;
