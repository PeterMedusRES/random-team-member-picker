import { Button } from "~/components/ui/button";

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
        <Button variant="success" className="w-32" onClick={onAccept}>
          Yes
        </Button>
        <Button variant="destructive" className="w-32" onClick={onCancel}>
          No
        </Button>
      </div>
    </div>
  );
};

export default PickerConfirmation;
